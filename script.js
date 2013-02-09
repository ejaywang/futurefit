var drawingCanvas = document.getElementById('myDrawing');
// Check the element is in the DOM and the browser supports canvas
if(drawingCanvas.getContext) {
	// Initaliase a 2-dimensional drawing context
	var context = drawingCanvas.getContext('2d');
	//Canvas commands go here
	// Create the yellow face
context.strokeStyle = "#000000";
context.fillStyle = "#FFFF00";
context.beginPath();
context.arc(100,100,50,0,Math.PI*2,true);
context.closePath();
context.stroke();
context.fill();

Read more: How to Draw with HTML 5 Canvas - Treehouse Blog http://blog.teamtreehouse.com/how-to-draw-with-html-5-canvas#ixzz2KQgAz77b
Read more:

}

