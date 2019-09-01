"use strict";

var rocket1 = null;
var rocket2 = null;
var tennis = null;
var ball = null;

var ROCKET_SPEED = 5;

var BALL_SPEED = 5;
var BALL_HEIGTH = 50;
var BALL_RADIUS = BALL_HEIGTH / 2;

function run() {
    tennis = document.getElementById('tennis');

    ball = document.getElementById('ball');
    ball.speedV = (Math.random()<0.5)? -1 : 1; // вектор скорости по вертикали (1 и -1)
    ball.speedG = (Math.random()<0.5)? -1 : 1; // вектор скорости по горизонтали (1 и -1)
    
    rocket1 = document.getElementById('rocket1');
    rocket1.style.backgroundColor = '#09A85A';
    rocket1.speed = 0;

    rocket2 = document.getElementById('rocket2');
    rocket2.style.left = 780 + 'px'; 
    rocket2.style.backgroundColor = '#171392';
    rocket2.speed = 0;

    document.addEventListener('keydown', function (event) {
          //                                  if (event.defaultPrevented) {
            //                                return; // Do nothing if the event was already processed
              //                              }
        switch (event.code) {
        case "ArrowDown":
            if (rocket2.offsetTop>=(tennis.offsetHeight - rocket2.offsetHeight - ROCKET_SPEED)) {
                rocket2.speed = -ROCKET_SPEED;
            }
            else { rocket2.speed = ROCKET_SPEED; }
            break;
        case "ArrowUp":
            if (rocket2.offsetTop<=ROCKET_SPEED) {
                rocket2.speed = ROCKET_SPEED;
            }
            else {
                rocket2.speed = -ROCKET_SPEED;
            }
            break;
        case "ShiftLeft":
            if (rocket1.offsetTop<=ROCKET_SPEED) {
                rocket1.speed = ROCKET_SPEED;
            }
            else {
                rocket1.speed = -ROCKET_SPEED;
            }
            break;
        case "ControlLeft":
            if (rocket1.offsetTop>=(tennis.offsetHeight - rocket1.offsetHeight)) {
                rocket1.speed = -ROCKET_SPEED;
            }
            else {
                rocket1.speed = ROCKET_SPEED;
            }
            break;
        default:
            return; // Quit when this doesn't handle the key event.
        }
                                                
                // Cancel the default action to avoid it being handled twice
                //                                    event.preventDefault();
        
    }, false);

    document.addEventListener('keyup', function (event) {
//                                        if (event.defaultPrevented) {
  //                                      return; // Do nothing if the event was already processed
    //                                    }
                                    
        switch (event.code) {
        case "ArrowDown":
            rocket2.speed = 0;
            break;
        case "ArrowUp":
            rocket2.speed = 0;
            break;
        case "ShiftLeft":
            rocket1.speed = 0;
            break;
        case "ControlLeft":
            rocket1.speed = 0;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        //                                  event.preventDefault();
    }, false);
    
    requestAnimationFrame(function measure() {
        draw();
        requestAnimationFrame(measure);
    });
};

function draw() {
    rocket1.style.top = (rocket1.offsetTop + rocket1.speed) + 'px';
    rocket2.style.top = (rocket2.offsetTop + rocket2.speed) + 'px';

    var ballX = ball.offsetLeft + BALL_RADIUS;
    var ballY = ball.offsetTop + BALL_RADIUS;
    var ballXnew = ballX + (ball.speedG * BALL_SPEED) - BALL_RADIUS;
    var ballYnew = ballY + (ball.speedV * BALL_SPEED) - BALL_RADIUS;
    if (ballXnew<=(tennis.offsetTop)) {
        var ballXnew = tennis.offsetTop;
        ball.speedV = -ball.speedV;
    };
    if (ballXnew>=(tennis.offsetHeight+BALL_HEIGTH)) {
        var ballXnew = tennis.offsetHeight-BALL_HEIGTH;
        ball.speedV = -ball.speedV;
    };
    if (ballYnew<=(tennis.offsetLeft)) {
        var ballYnew = tennis.offsetLeft;
        ball.speedG = -ball.speedG;
    };
    if (ballYnew>=(tennis.offsetWidth+BALL_HEIGTH)) {
        var ballYnew = tennis.offsetWidth-BALL_HEIGTH;
        ball.speedG = -ball.speedG;
    };
    ball.style.left = ballXnew + 'px';
    ball.style.top = ballYnew + 'px';
};


run();
