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
						"neck_base_circumference": 			  {"value":12.26, "unit":unit},
						"shoulder_breadth" 		  {"value":16.04, "unit":unit},
						"armscye_circumference_scye_circ_over_acromion":         {"value":15.37, "unit":unit},
						"chest_girth_at_scye_chest_circumference_at_scye":       {"value":35.03, "unit":unit},
						"shoulder_to_wrist":      {"value":21.87, "unit":unit},
						"chest_circumference":    {"value":37.27, "unit":unit},
						"waist_circumference_pref":  {"value":31.47, "unit":unit},
						"waist_front_length":     {"value":14.37, "unit":unit},
						"waist_height_preferred":    {"value":38.65, "unit":unit},
						"total_crotch_length_crotch_length": {}
						"hip_circumference_maximum": {"value":38.65, "unit":unit},
						"hip_circ_max_height": {"value":38.65, "unit":unit},
						"total_crotch_length_crotch_length": {"value":38.65, "unit":unit},
						"hip_circ_max_height": {"value":38.65, "unit":unit},
						"hip_circumference_maximum": {"value":40.49, "unit":unit},
						"custom_bicep_right": {"value":12.60, "unit":unit},
						"spine_to_shoulder": {"value":7.33, "unit":unit},
						"arm_length_shoulder_to_wrist": {"value":21.87, "unit":unit},
						"crotch_height": {"value":29.39, "unit":unit},
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