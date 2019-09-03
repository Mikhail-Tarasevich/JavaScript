"use strict";

function run() {
    var rocket1 = null;
    var rocket2 = null;
    var tennis = null;
    var ball = null;
    
    var ROCKET_SPEED = 5;
    var BALL_SPEED = 1;

    tennis = document.getElementById('tennis');
    var TENNIS_SIZE_X = tennis.offsetWidth - 2; // размер поля по X равен offsetWidth - 2px на границы
    var TENNIS_SIZE_Y = tennis.offsetHeight - 2; // размер поля по Y равен offsetHeight - 2px на границы

    ball = document.getElementById('ball');
    var BALL_HEIGTH = ball.offsetHeight;
    var BALL_RADIUS = BALL_HEIGTH / 2;
    ball.speedV = (Math.random()<0.5)? -1 : 1; // вектор скорости по вертикали (1 и -1)
    ball.speedG = (Math.random()<0.5)? -1 : 1; // вектор скорости по горизонтали (1 и -1)
    
    rocket1 = document.getElementById('rocket1');
    rocket1.style.backgroundColor = '#09A85A';
    rocket1.speed = 0;

    var ROCKET_WIDTH = rocket1.offsetWidth;
    var ROCKET_HEIGTH = rocket1.offsetHeight;

    rocket2 = document.getElementById('rocket2');
    rocket2.style.left = (TENNIS_SIZE_X - ROCKET_WIDTH) + 'px'; 
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

    function draw() {
        rocket1.style.top = (rocket1.offsetTop + rocket1.speed) + 'px';
        rocket2.style.top = (rocket2.offsetTop + rocket2.speed) + 'px';
    
        var ballX = ball.offsetLeft + BALL_RADIUS;
        var ballY = ball.offsetTop + BALL_RADIUS;
        var ballXnew = ballX + (ball.speedG * BALL_SPEED);
        var ballYnew = ballY + (ball.speedV * BALL_SPEED);
        var tennisTop = tennis.offsetTop;
        var tennisHeight = tennis.offsetHeight;
        var tennisLeft = tennis.offsetLeft;
        var tennisWidth = tennis.offsetWidth;
        var speedG = ball.speedG;
        var speedV = ball.speedV;
        if (ballYnew<=BALL_RADIUS+1) { // верхняя стенка
            ballYnew = BALL_RADIUS+1;
            ball.speedV = -ball.speedV;
        }
        else if (ballXnew>=(TENNIS_SIZE_X-ROCKET_WIDTH-BALL_RADIUS-1)) {  // правая стенка
            if ((ballYnew>rocket2.offsetTop) && (ball.speedV>0)) { // попал в ракетку при движении мяча вниз
                ballXnew = tennis.offsetWidth-ROCKET_WIDTH-BALL_RADIUS-1;
                ball.speedG = -ball.speedG;
            }
            else if ((ballYnew<(rocket2.offsetTop+ROCKET_HEIGTH)) && (ball.speedV<0)) { // попал в ракетку при движении мяча вверх
                ballXnew = tennis.offsetWidth-ROCKET_WIDTH-BALL_RADIUS-1;
                ball.speedG = -ball.speedG;
            }
            else { // гол правому игроку
                BALL_SPEED = 0; 
                if (((ballYnew+BALL_RADIUS)>=rocket2.offsetTop) && (ballYnew<(rocket2.offsetTop+BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                    // устанавливаем мяч сверху, рядом с ракеткой
                    ballYnew = rocket2.offsetTop-BALL_RADIUS; 
                    ballXnew = TENNIS_SIZE_X-BALL_RADIUS;
                }
                else if (((ballYnew+BALL_RADIUS)<=rocket2.offsetTop+ROCKET_HEIGTH) && (ballYnew<(rocket2.offsetTop+ROCKET_HEIGTH+BALL_RADIUS))) { // попал в нижний край ракетки и отскочил в гол
                    // устанавливаем мяч снизу, рядом с ракеткой
                    ballYnew = rocket2.offsetTop+ROCKET_HEIGTH+BALL_RADIUS; 
                    ballXnew = TENNIS_SIZE_X-BALL_RADIUS;
                }
            }
        }
        else if (ballXnew<=(ROCKET_WIDTH+1)) {  // левая стенка
            if ((ballYnew>rocket1.offsetTop) && (ball.speedV>0)) { // попал в ракетку при движении мяча вниз
                ballXnew = ROCKET_WIDTH + 1;
                ball.speedG = -ball.speedG;
            }
            else if ((ballYnew<(rocket1.offsetTop+ROCKET_HEIGTH)) && (ball.speedV<0)) { // попал в ракетку при движении мяча вверх
                ballXnew = ROCKET_WIDTH + 1;
                ball.speedG = -ball.speedG;
            }
            else { // гол левому игроку
                BALL_SPEED = 0; 
                if (((ballYnew+BALL_RADIUS)>=rocket2.offsetTop) && (ballYnew<(rocket2.offsetTop+BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                    // устанавливаем мяч сверху, рядом с ракеткой
                    ballYnew = rocket2.offsetTop-BALL_RADIUS; 
                    ballXnew = BALL_RADIUS;
                }
                else if (((ballYnew+BALL_RADIUS)<=rocket2.offsetTop+ROCKET_HEIGTH) && (ballYnew<(rocket2.offsetTop+ROCKET_HEIGTH+BALL_RADIUS))) { // попал в нижний край ракетки и отскочил в гол
                    // устанавливаем мяч снизу, рядом с ракеткой
                    ballYnew = rocket2.offsetTop+ROCKET_HEIGTH+BALL_RADIUS; 
                    ballXnew = BALL_RADIUS;
                }
            }
        }
        else if (ballYnew>=(TENNIS_SIZE_Y-BALL_HEIGTH-1)) {  // нижняя стенка
            ballYnew = TENNIS_SIZE_Y-BALL_HEIGTH-1;
            ball.speedV = -ball.speedV;
        };

        if ((ballXnew>(TENNIS_SIZE_X-BALL_HEIGTH)) || (ballYnew>(TENNIS_SIZE_Y-BALL_HEIGTH)) || (ballXnew<BALL_HEIGTH) || (ballYnew<BALL_HEIGTH)) {
            console.log(ballXnew + ", " + ballXnew);
        }

        ball.style.left = (ballXnew - BALL_RADIUS) + 'px';
        ball.style.top = (ballYnew - BALL_RADIUS) + 'px';
    };
};

run();
