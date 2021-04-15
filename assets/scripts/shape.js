function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function newPoint(canvas) {
    var x = getRandomInt(canvas.width);
    var y = getRandomInt(canvas.height);
    return {x: x, y: y}
}
  
function drawRandomShape(ctx, vertCount, color) {
    var p = newPoint(canvas);
    ctx.moveTo(p.x, p.y);

    ctx.lineWidth = 5;  
    ctx.beginPath();
    for (i = 0; i < vertCount; i++) {
        var p1 = newPoint(canvas);
        var p2 = newPoint(canvas);
        var p3 = newPoint(canvas);

        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }

    ctx.moveTo(p.x, p.y);
    var color = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
  
function drawShape(canvas, shapesNumber, vertextNumber, color) {
    if (canvas.getContext == null) {
        return;
    }
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (j = 0; j < shapesNumber; j++) {
        drawRandomShape(ctx, vertextNumber, color);
    }
}