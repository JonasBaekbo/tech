var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 18;
// var x = canvas.width / 2;
var x = Math.floor(Math.random() * canvas.width);
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var paddleHeight = 10;
var paddleWidth = 97;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 8;
var brickColumnCount = '<%= arrangement.pladser %>' / 6;
var brickWidth = 95;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var liv = 5;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}



function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);
}
drawBricks();
drawScore();