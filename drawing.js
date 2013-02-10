$(document).ready(function() {
	var drawingCanvas = $('#myDrawing')[0];
	// Check the element is in the DOM and the browser supports canvas
	var width = 400;
	var height = 800;
	var data = getData();

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
		var pos = generateParts(data,startX,startY);

		context.beginPath();
		context.moveTo(startX,startY);
		for(var i =0; i<10; i++) { //draw the right side
			context.lineTo(pos[0][i],pos[1][i]);
		}
		context.moveTo(startX,startY);
		for(var i = 0; i<10; i++) { //draw the left side
			context.lineTo(startX - (pos[0][i]-startX),pos[1][i]);
		}
		//drawTrunk(startX,startY,0);
		context.stroke();
		context.closePath();
		
	}
	else {
            // Browser doesn't support CANVAS
        }


    function generateParts(data,startX,startY){
    	//this function is going to return all the points that will be drawn. :)
		var spine_to_shoulder = getDim("spine_to_shoulder",data);
		var shoulder_breadth = getDim("shoulder_breadth",data);
		var chest_circumference = getDim("chest_circumference",data);
		var chest_width = ramanujanRadius (chest_circumference, 7/10);
		var neckLength = Math.sqrt(Math.pow(spine_to_shoulder,2)-Math.pow(chest_width,2));
		var armAngle = Math.asin(chest_width/spine_to_shoulder);
    	var shoulderX = startX + (chest_width+shoulder_breadth)/2;
    	var armpitX = startX + chest_width;
    	var shoulderY = startY + neckLength;
    	var waistHeight = shoulderY + getDim("waist_front_length",data);
    	var hipHeight = waistHeight + getDim("hip_circ_max_height",data);
    	var posX = new Array();
    	var posY = new Array();
    	var pos = new Array();
    	for (var i = 1; i < 9; i++){
    		posX[i] = Math.floor(partPosX(i, data, startX, shoulderX, armAngle));
    		posY[i] = Math.floor(partPosY(i, data, startY, shoulderY, armAngle, waistHeight, hipHeight));
    	}
    	posX[9] = Math.floor(startX);
    	posY[9] = Math.floor(posY[8]-10);

    	pos[0] = posX;
    	pos[1] = posY;
    	return pos;
    }

    function partPosX(partNum, data, startX, shoulderX, armAngle){

    	switch(partNum)
    	{
    		case 1:
    			return startX;
    			break;
			case 2:
				return shoulderX;
				break;
			case 3:
				return shoulderX + (getDim("shoulder_to_wrist",data)*Math.sin(armAngle/2));
				break;
			case 4:
				return shoulderX-10;
				break;
			case 5:
				return startX + getDim("waist_circumference_pref",data)/(2*Math.sqrt(3));
				break;
			case 6:
				return startX + getDim("hip_circumference_maximum",data)/(2*Math.sqrt(3));
				break;
			case 7:
				return startX + getDim("hip_circumference_maximum",data)/(4*Math.sqrt(3));
				break;
			case 8:
				return startX + 10;

    	}
    }

    function partPosY(partNum, data, startY, shoulderY, armAngle, waistHeight, hipHeight){
    	switch(partNum)
    	{
    		case 1:
    			return startY;
    			break;
			case 2:
				return shoulderY;
				break;
			case 3:
				return shoulderY + getDim("shoulder_to_wrist",data)*Math.sin((Math.PI - armAngle)/2);
				break;
			case 4:
				return shoulderY + getDim("armscye_circumference_scye_circ_over_acromion",data)/Math.PI;
				break;
			case 5:
				return waistHeight;
				break;
			case 6:
				return waistHeight + getDim("total_crotch_length_crotch_length",data)/(2*(Math.sqrt(3)));
				break;
			case 7:
				return hipHeight;
				break;
			case 8:
				return hipHeight - getDim("crotch_height",data);
				break;

    	}
    }

    function drawTrunk(startX, startY, measureX){
    	context.lineTo(startX+measureX/2,startY);
    }

    function getDim(key,data){
    	var value = data["measurements"][key]["value"];
    	var scale = 10;
    	return Math.floor(value*scale);

    }

    function getData(){
    	var unit = "in";
		var meta = {
			"measurements": {
				"neck_base_circumference": 			  {"value":12.26, "unit":unit},
				"shoulder_breadth": 		  		  {"value":12.04, "unit":unit},
				"armscye_circumference_scye_circ_over_acromion":         {"value":15.37, "unit":unit},
				"chest_girth_at_scye_chest_circumference_at_scye":       {"value":35.03, "unit":unit},
				"shoulder_to_wrist":      {"value":21.87, "unit":unit},
				"chest_circumference":    {"value":33, "unit":unit},
				"waist_circumference_pref":  {"value":35, "unit":unit},
				"waist_front_length":     {"value":14.37, "unit":unit},
				"waist_height_preferred":    {"value":38.65, "unit":unit},
				"total_crotch_length_crotch_length": {"value":26.52, "unit":unit},
				"hip_circ_max_height": {"value":38.65, "unit":unit},
				"hip_circumference_maximum": {"value":30, "unit":unit},
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
		return meta;
    }

    function ramanujanRadius (circ, ratio){
    	var h = Math.pow((1-ratio),2)/Math.pow((1+ratio),2);
    	var a = (1/(1+ratio))*(circ/Math.PI)/(1+(3*h)/(10+Math.pow(4-3*h,1/2)));
    	return a;
    }
});