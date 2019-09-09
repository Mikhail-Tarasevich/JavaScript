"use strict";

function run() {
    var view = new viewTennis();
    var model = new modelTennis();
    var controller = new controllerTennis();
    var containerElem=document;
    model.start(view);
    view.start(model,containerElem);
    controller.start(model,containerElem);
    model.updateView();

    function viewTennis() {
        var thisModel = null;
        var thisView = null;
        var requestId = null;

        this.start=function(model, view) {
            thisModel = model;
            thisView = view;

            this.score = thisView.getElementById('score');

            this.ball = thisView.getElementById('ball');

            this.rocket1 = thisView.getElementById('rocket1');
            rocket1.style.backgroundColor = '#09A85A';

            this.rocket2 = thisView.getElementById('rocket2');
            rocket2.style.backgroundColor = '#171392';
        }

        this.update=function() {
            rocket1.style.left = thisModel.rocket1.x + 'px';
            rocket1.style.top = thisModel.rocket1.y + 'px';

            rocket2.style.left = thisModel.rocket2.x + 'px';
            rocket2.style.top = thisModel.rocket2.y + 'px';

            ball.style.left = thisModel.ball.x + 'px';
            ball.style.top = thisModel.ball.y + 'px';

            score.innerHTML = '<h1>' + thisModel.score1 + ':' + thisModel.score2 + '</h1>';

            if (requestId!=null) {
                cancelAnimationFrame(requestId);
            };
            requestId = requestAnimationFrame(function measure() {
                thisModel.updateView();
                requestId = requestAnimationFrame(measure);
            });
        };
    }

    function controllerTennis() {
        var thisModel = null;
        var thisView = null;
        var buttonStart = null;

        this.start=function(model, view) {
            thisModel = model;
            thisView = view;

            buttonStart = thisView.getElementById('start');
            buttonStart.onclick = thisModel.ballStart;

            thisView.addEventListener('keydown', function (event) {
                //                                  if (event.defaultPrevented) {
                  //                                return; // Do nothing if the event was already processed
                    //                              }
              switch (event.code) {
              case "ArrowDown":
                  thisModel.rocketDown(thisModel.rocket2); 
                  break;
              case "ArrowUp":
                  thisModel.rocketUp(thisModel.rocket2); 
                  break;
              case "ShiftLeft":
                  thisModel.rocketUp(thisModel.rocket1); 
                  break;
              case "ControlLeft":
                  thisModel.rocketDown(thisModel.rocket1); 
                  break;
              default:
                  return; // Quit when this doesn't handle the key event.
              }
                                                      
                      // Cancel the default action to avoid it being handled twice
                      //                                    event.preventDefault();
              
          }, false);
      
          thisView.addEventListener('keyup', function (event) {
      //                                        if (event.defaultPrevented) {
        //                                      return; // Do nothing if the event was already processed
          //                                    }
                                          
              switch (event.code) {
              case "ArrowDown":
                  thisModel.rocketStop(thisModel.rocket2); 
                  break;
              case "ArrowUp":
                  thisModel.rocketStop(thisModel.rocket2); 
                  break;
              case "ShiftLeft":
                  thisModel.rocketStop(thisModel.rocket1); 
                  break;
              case "ControlLeft":
                  thisModel.rocketStop(thisModel.rocket1); 
                  break;
              default:
                  return; // Quit when this doesn't handle the key event.
              }
              // Cancel the default action to avoid it being handled twice
              //                                  event.preventDefault();
          }, false);
        }
    }

    function modelTennis(view) {
        var thisView = null;

        this.start=function(view) {
            thisView = view;

            this.TENNIS_SIZE_X = 800
            this.TENNIS_SIZE_Y = 500
            // размер и скорость ракеток
            this.ROCKET_SPEED = 5;
            this.ROCKET_WIDTH = 20;
            this.ROCKET_HEIGTH = 160;
            // размер и скорость мяча
            this.BALL_SPEED = 4;
            this.BALL_HEIGTH = 50;
            this.BALL_RADIUS = this.BALL_HEIGTH / 2;
            // модели ракеток и мяча
            this.rocket1 = {speed: 0, x: (this.ROCKET_WIDTH / 2), y: (this.TENNIS_SIZE_Y / 2)};
            this.rocket2 = {speed: 0, x: (this.TENNIS_SIZE_X - (this.ROCKET_WIDTH / 2)), y: (this.TENNIS_SIZE_Y / 2)};
            this.ball = {speed: 0, speedG: 0, speedV: 0, x: (this.TENNIS_SIZE_X / 2), y: (this.TENNIS_SIZE_Y / 2)};
            // счет
            this.score1 = 0;
            this.score2 = 0;
        };

        this.updateView=function() {
            if ( thisView ) {
                this.ballMove();
                thisView.update();
            }
        };

        this.rocketUp = function(rocket) {
            rocket.speed = this.ROCKET_SPEED;
            rocket.y = rocket.y - rocket.speed;
            rocket.y = (rocket.y<0) ? 0 : rocket.y;
            this.updateView();
        };

        this.rocketDown = function(rocket) {
            rocket.speed = this.ROCKET_SPEED;
            rocket.y = rocket.y + rocket.speed;
            rocket.y = (rocket.y>500) ? 500 : rocket.y;
            this.updateView();
        };

        this.rocketStop = function(rocket) {
            rocket.speed = 0;
            this.updateView();
        };

        this.ballStart = function() {
            ball.x = this.TENNIS_SIZE_X / 2;
            ball.y = this.TENNIS_SIZE_Y / 2;
            ball.speedV = (Math.random()<0.5)? -1 : 1; // вектор скорости по вертикали (1 и -1)
            ball.speedG = (Math.random()<0.5)? -1 : 1; // вектор скорости по горизонтали (1 и -1)
            ball.speed = this.BALL_SPEED;
            if ( thisView ) thisView.update();
        };

        this.ballMove = function() {
            ball.x + (ball.speedG * ball.speed);
            ball.y + (ball.speedV * ball.speed);

            if ((ball.y<=this.BALL_RADIUS+1) && (ball.speedV<0)) { // верхняя стенка
                ball.y = this.BALL_RADIUS+1;
                ball.speedV = -ball.speedV;
            }
            else if (ball.x>=(this.TENNIS_SIZE_X-this.ROCKET_WIDTH-this.BALL_RADIUS-1) && (ball.speedG>0)) {  // правая стенка
                if ((ball.y>(rocket2.x - (this.ROCKET_HEIGTH / 2))) && (ball.speedV>0)) { // попал в ракетку при движении мяча вниз
                    ball.x = this.TENNIS_SIZE_Y-this.ROCKET_WIDTH-this.BALL_RADIUS-1;
                    ball.speedG = -ball.speedG;
                }
                else if ((ball.y<((rocket2.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH)) && (ball.speedV<0)) { // попал в ракетку при движении мяча вверх
                    ball.x = this.TENNIS_SIZE_Y-this.ROCKET_WIDTH-this.BALL_RADIUS-1;
                    ball.speedG = -ball.speedG;
                }
                else { // гол правому игроку
                    ball.speed = 0; 
                    score1 = score1 + 1;
                    ball.x = this.TENNIS_SIZE_X-this.BALL_RADIUS;
                    if (((ball.y+this.BALL_RADIUS)>=(rocket2.x - (this.ROCKET_HEIGTH / 2))) && (ball.y<((rocket2.x - (this.ROCKET_HEIGTH / 2))+this.BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                        // устанавливаем мяч сверху, рядом с ракеткой
                        ball.y = (rocket2.x - (this.ROCKET_HEIGTH / 2))-this.BALL_RADIUS; 
                    }
                    else if (((ball.y-this.BALL_RADIUS)<=(rocket2.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH) && (ball.y>((rocket2.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH))) { // попал в нижний край ракетки и отскочил в гол
                        // устанавливаем мяч снизу, рядом с ракеткой
                        ball.y = (rocket2.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH+this.BALL_RADIUS; 
                    }
                }
            }
            else if ((ball.x<=(this.ROCKET_WIDTH+this.BALL_RADIUS+1)) && (ball.speedG<0)) {  // левая стенка
                if ((ball.y>(rocket1.x - (this.ROCKET_HEIGTH / 2))) && (ball.speedV>0)) { // попал в ракетку при движении мяча вниз
                    ball.x = this.ROCKET_WIDTH + this.BALL_RADIUS + 1;
                    ball.speedG = -ball.speedG;
                }
                else if ((ball.y<((rocket1.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH)) && (ball.speedV<0)) { // попал в ракетку при движении мяча вверх
                    ball.x = this.ROCKET_WIDTH + this.BALL_RADIUS + 1;
                    ball.speedG = -ball.speedG;
                }
                else { // гол левому игроку
                    ball.speed = 0;
                    score2 = score2 + 1; 
                    ball.x = this.BALL_RADIUS;
                    if (((ball.y+this.BALL_RADIUS)>=(rocket1.x - (this.ROCKET_HEIGTH / 2))) && (ball.y<((rocket1.x - (this.ROCKET_HEIGTH / 2))+this.BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                        // устанавливаем мяч сверху, рядом с ракеткой
                        ball.y = (rocket1.x - (this.ROCKET_HEIGTH / 2))-this.BALL_RADIUS; 
                    }
                    else if (((ball.y-this.BALL_RADIUS)<=(rocket1.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH) && (ball.y>((rocket1.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH))) { // попал в нижний край ракетки и отскочил в гол
                        // устанавливаем мяч снизу, рядом с ракеткой
                        ball.y = (rocket1.x - (this.ROCKET_HEIGTH / 2))+this.ROCKET_HEIGTH+this.BALL_RADIUS; 
                    }
                }
            }
            else if ((ball.y>=(this.TENNIS_SIZE_Y-this.BALL_RADIUS-1)) && (ball.speedV>0)) {  // нижняя стенка
                ball.y = this.TENNIS_SIZE_Y-this.BALL_RADIUS-1;
                ball.speedV = -ball.speedV;
            };

            this.updateView();
        }
    }
}

run();