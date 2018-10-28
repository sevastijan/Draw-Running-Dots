export default function (canvas, x = 0, y = 0, color, size = 10) {
    canvas.beginPath()
    canvas.arc(x, y, size, 0, 2 * Math.PI, false);
    canvas.fillStyle = '#c63f3f';
    canvas.fill();
    canvas.lineWidth = 1;
    canvas.strokeStyle =  '#c63f3f';
    canvas.stroke()
}