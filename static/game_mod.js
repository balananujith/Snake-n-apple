window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
	document.addEventListener("keydown",restart);
	// Initial level set to advanced
    level = "advanced";
    // Set game speed based on the level
    setSpeed();
    interval = setInterval(game, gameSpeed);
}

px=py=10;
gs=16;
tc=25;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
gameSpeed = 1000/15; // Default game speed for beginner
var gameOver = false; // Variable to track if the game is over
var boundaryTouched = false; // Variable to track if the boundary has been touched
function game() {
    console.log("running..!!");
    px += xv;
    py += yv;
// Check if the snake hits the boundary
if (!boundaryTouched && (px < 0 || px >= tc  || py < 0 || py >= tc)) {
	// If the boundary is touched for the first time, set boundaryTouched to true
	boundaryTouched = true;
}
if (boundaryTouched && !gameOver && (px <= 0 || px >= tc - 1 || py <= 0 || py >= tc - 1)) {
        // Handle game over logic
        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }
        ctx.fillStyle = "red";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        }
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        document.removeEventListener("keydown", keyPush);
        ctx.fillText("Game over..!!:(", 70, 100);
        ctx.font = "15px Arial";
        ctx.fillText("Press OK to restart..!!", 40, 200);
        clearInterval(interval);
        gameOver = true; // Set game over flag
    } else if (!gameOver) {
        // Game is still ongoing
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);

        // Draw boundaries
        ctx.fillStyle = "green";
        for (var j = 0; j < tc; j++) {
            ctx.fillRect((j * gs), 0, gs - 2, gs - 2); // Top boundary
            ctx.fillRect((j * gs), (tc - 1) * gs, gs - 2, gs - 2); // Bottom boundary
            ctx.fillRect(0, (j * gs), gs - 2, gs - 2); // Left boundary
            ctx.fillRect((tc - 1) * gs, (j * gs), gs - 2, gs - 2); // Right boundary
        }

        // Draw snake
        ctx.fillStyle = "red";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
            if (trail[i].x == px && trail[i].y == py) {
                tail = 5;
            }
        }
        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }

        // Draw apple
        if (ax == px && ay == py) {
            tail++;
            ax = Math.floor(Math.random() * (tc - 2) + 1);
            ay = Math.floor(Math.random() * (tc - 2) + 1);
            console.log(ax, ay);
        }
        ctx.fillStyle = "blue";
        ctx.fillRect(ax * gs, ay * gs, gs, gs);

        // Draw score
        ctx.fillStyle = "white";
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + (tail - 5), 300, 50);
    }

    // Trigger game over if the game is over
    if (gameOver) {
        window.alert("Game over! Your score: " + (tail - 5));
        location.reload(true); // Reload the page to restart the game
    }
}

function keyPush(evt) {
    console.log("arrow keys")
    switch(evt.keyCode) {
        case 37: // Left arrow key
            if (xv !== 1) { // Check if the current direction is not right
                xv=-1;yv=0;
            }
            break;
        case 38: // Up arrow key
            if (yv !== 1) { // Check if the current direction is not down
                xv=0;yv=-1;
            }
            break;
        case 39: // Right arrow key
            if (xv !== -1) { // Check if the current direction is not left
                xv=1;yv=0;
            }
            break;
        case 40: // Down arrow key
            if (yv !== -1) { // Check if the current direction is not up
                xv=0;yv=1;
            }
            break;
    }
}

function restart(evt){
	console.log("i am here")
	if (evt.keyCode == 27){
		console.log("escape pressed..")
		location.reload(true);
	}
}

function setSpeed() {
    switch(level) {
        case "beginner":
            gameSpeed = 1000/10; // Slow speed for beginners
            break;
        case "intermediate":
            gameSpeed = 1000/14; // Medium speed for intermediate players
            break;
        case "advanced":
            gameSpeed = 1000/25; // Fast speed for advanced players
            break;
        default:
            gameSpeed = 1000/10; // Default speed
            break;
    }
}

function setLevel(selectedLevel) {
    level = selectedLevel;
    setSpeed();
    clearInterval(interval);
    interval = setInterval(game, gameSpeed);
}
