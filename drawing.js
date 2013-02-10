$(document).ready(function() {
	var drawingCanvas = $('#myDrawing')[0];
	// Check the element is in the DOM and the browser supports canvas
	var width = 400;
	var height = 800;

	if(drawingCanvas.getContext) {
	// Initaliase a 2-dimensional drawing context
		//drawingCanvas.width(width).height(height);
		var centerX = width/2;
		var centerY = height/2;
		var context = drawingCanvas.getContext('2d');

		//Canvas commands go here
		// Create the yellow face
		context.strokeStyle = "#264233";
		context.fillStyle = "#EEEEEE";
		context.lineWidth = 3;
		
		var startX = centerX;//center of the body is going to be in the middle of the canvas
		var startY = 50; //base of the neck (yay headless!!)
		var unit = "in";

		var meta = {
					"measurements": {
						"custom_neck": 			  {"value":},
						"shoulder_breadth" 		  {"value":16.04, "unit":unit},
						"shoulder_to_wrist":      {"value":21.87, "unit":unit},
						"armscye_circumference_scye_circ_over_acromion":         {"value":15.37, "unit":unit},
						"chest_girth_at_scye_chest_circumference_at_scye":       {"value":35.03, "unit":unit},
						"waist_front_length":     {"value":0.420426, "unit":"m"},
						"waist_height_preferred": {"value":1.007133, "unit":"m"},
						"age":                    {"value":1036997258.787752, "unit":"s", "factor":0.000000},
						"waist_hip_ratio":        {"value":0.799591, "factor":0},
					},
					"stature_guess": {"value":1.701519, "unit":"m"},
					"time": {
						"segmentation":0.722000,
						"match":4.500163
							}
					}





		context.beginPath();
		context.moveTo(startX,startY[0]);
		for(var i =0; i<startY.length; i++) {
			context.lineTo(startX+measureX[i]/2,startY[i]);
		}
		//drawTrunk(startX,startY,0);
		context.stroke();
		context.closePath();
		
	}
	else {
            // Browser doesn't support CANVAS
        }


    function drawTrunk(startX, startY, measureX){
    	context.lineTo(startX+measureX/2,startY);
    }
});