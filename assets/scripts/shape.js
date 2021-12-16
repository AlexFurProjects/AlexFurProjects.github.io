function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function newPoint(canvas) {
    var x = getRandomInt(canvas.width);
    var y = getRandomInt(canvas.height);
    return {x: x, y: y}
}

var drawFunctions = [bezier, quad, arc, line];
  
function drawRandomShape(ctx, vertCount, color) {
    var p = newPoint(canvas);
    ctx.moveTo(p.x, p.y);

    ctx.lineWidth = 5;  
    ctx.beginPath();
    for (i = 0; i < vertCount; i++) {
        var p1 = newPoint(canvas);
        var p2 = newPoint(canvas);
        var p3 = newPoint(canvas);

        drawFunctions[getRandomInt(drawFunctions.length)](ctx, p1, p2, p3);
    }

    ctx.moveTo(p.x, p.y);
    var color = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function bezier(ctx, p1, p2, p3) {
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

function quad(ctx, p1, p2, p3) {
    var point1 = choosePoint(p1, p2, p3);
    var point2 = choosePoint(p1, p2, p3);
    ctx.quadraticCurveTo(point1.x, point1.y, point2.x, point2.y);
}

function arc(ctx, p1, p2, p3) {
    ctx.arcTo(p1.x, p1.y, p2.x, p2.y, p3.x / p3.y);
}

function line(ctx, p1, p2, p3) {
    var point = choosePoint(p1, p2, p3);
    ctx.lineTo(point.x, point.y);
}

function choosePoint(p1, p2, p3) {
    var points = [p1, p2, p3];
    return points[getRandomInt(points.length)];
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