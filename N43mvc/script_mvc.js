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
        var score = null;
        var ball = null;
        var rocket1 = null;
        var rocket2 = null;

        this.start=function(model, view) {
            thisModel = model;
            thisView = view;

            score = thisView.getElementById('score');

            ball = thisView.getElementById('ball');

            rocket1 = thisView.getElementById('rocket1');
            rocket1.style.backgroundColor = '#09A85A';

            rocket2 = thisView.getElementById('rocket2');
            rocket2.style.backgroundColor = '#171392';
        }

        var update = this.update=function() {
            rocket1.style.left = (thisModel.rocket1.x - (thisModel.ROCKET_WIDTH / 2)) + 'px';
            rocket1.style.top = (thisModel.rocket1.y - (thisModel.ROCKET_HEIGTH / 2)) + 'px';

            rocket2.style.left = (thisModel.rocket2.x - (thisModel.ROCKET_WIDTH / 2)) + 'px';
            rocket2.style.top = (thisModel.rocket2.y - (thisModel.ROCKET_HEIGTH / 2)) + 'px';

            ball.style.left = (thisModel.ball.x - thisModel.BALL_RADIUS) + 'px';
            ball.style.top = (thisModel.ball.y - thisModel.BALL_RADIUS) + 'px';

            score.innerHTML = '<h1>' + thisModel.getScore("1") + ':' + thisModel.getScore("2") + '</h1>';

            if (requestId!=null) {
                cancelAnimationFrame(requestId);
            };
            requestId = requestAnimationFrame(function measure() {
//                thisModel.updateView();
                thisModel.ballMove();
                update();
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
        var TENNIS_SIZE_X = this.TENNIS_SIZE_X = 800;
        var TENNIS_SIZE_Y = this.TENNIS_SIZE_Y = 500;
        // размер и скорость ракеток
        var ROCKET_SPEED = 10;
        var ROCKET_WIDTH = this.ROCKET_WIDTH = 20;
        var ROCKET_HEIGTH = this.ROCKET_HEIGTH = 160;
        // размер и скорость мяча
        var BALL_SPEED = 4;
        var BALL_HEIGTH = 50;
        var BALL_RADIUS = this.BALL_RADIUS = BALL_HEIGTH / 2;
        // модели ракеток и мяча
        var rocket1 = this.rocket1 = {speed: 0, x: (ROCKET_WIDTH / 2), y: (TENNIS_SIZE_Y / 2)};
        var rocket2 = this.rocket2 = {speed: 0, x: (TENNIS_SIZE_X - (ROCKET_WIDTH / 2)), y: (TENNIS_SIZE_Y / 2)};
        var ball = this.ball = {speed: 0, speedG: 0, speedV: 0, x: (TENNIS_SIZE_X / 2), y: (TENNIS_SIZE_Y / 2)};
        // счет
        var score1 = this.score1 = 0;
        var score2 = this.score2 = 0;

        this.getScore = function(player) {
            return ((player=="1") ? score1 : score2);
        };

        this.start=function(view) {
            thisView = view;
        };

        var updateView = this.updateView=function() {
            if ( thisView ) {
//                ballMove();
                thisView.update();
            }
        };

        this.rocketUp = function(rocket) {
            rocket.speed = -ROCKET_SPEED;
            this.updateView();
        };

        this.rocketDown = function(rocket) {
            rocket.speed = ROCKET_SPEED;
            this.updateView();
        };

        this.rocketStop = function(rocket) {
            rocket.speed = 0;
            this.updateView();
        };

        this.ballStart = function() {
            ball.x = TENNIS_SIZE_X / 2;
            ball.y = TENNIS_SIZE_Y / 2;
            ball.speedV = (Math.random()<0.5)? -1 : 1; // вектор скорости по вертикали (1 и -1)
            ball.speedG = (Math.random()<0.5)? -1 : 1; // вектор скорости по горизонтали (1 и -1)
            ball.speed = BALL_SPEED;
//            if ( thisView ) thisView.update();
            updateView();
        };

        var ballMove = this.ballMove = function() {
            rocket1.y = rocket1.y + rocket1.speed;
            rocket2.y = rocket2.y + rocket2.speed;
            var border = ROCKET_HEIGTH / 2;
            rocket1.y = (rocket1.y<border) ? border : rocket1.y;
            rocket2.y = (rocket2.y<border) ? border : rocket2.y;
            border = TENNIS_SIZE_Y - (ROCKET_HEIGTH / 2);
            rocket1.y = (rocket1.y>border) ? border : rocket1.y;
            rocket2.y = (rocket2.y>border) ? border : rocket2.y;

            ball.x = ball.x + (ball.speedG * ball.speed);
            ball.y = ball.y + (ball.speedV * ball.speed);

            if ((ball.y<=BALL_RADIUS+1) && (ball.speedV<0)) { // верхняя стенка
                ball.y = BALL_RADIUS+1;
                ball.speedV = -ball.speedV;
            }
            else if (ball.x>=(TENNIS_SIZE_X-ROCKET_WIDTH-BALL_RADIUS-1) && (ball.speedG>0)) {  // правая стенка
                if ((ball.y>(rocket2.y - (ROCKET_HEIGTH / 2))) && (ball.y<(rocket2.y + (ROCKET_HEIGTH / 2)))) { // попал в ракетку
                    ball.x = TENNIS_SIZE_Y-ROCKET_WIDTH-BALL_RADIUS-1;
                    ball.speedG = -ball.speedG;
                }
                else { // гол правому игроку
                    score1 = score1 + ((ball.speed>0) ? 1 : 0);
                    ball.speed = 0; 
                    ball.x = TENNIS_SIZE_X-BALL_RADIUS;
                    if (((ball.y+BALL_RADIUS)>=(rocket2.y - (ROCKET_HEIGTH / 2))) && (ball.y<((rocket2.y - (ROCKET_HEIGTH / 2))+BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                        // устанавливаем мяч сверху, рядом с ракеткой
                        ball.y = (rocket2.y - (ROCKET_HEIGTH / 2))-BALL_RADIUS; 
                    }
                    else if (((ball.y-BALL_RADIUS)<=(rocket2.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH) && (ball.y>((rocket2.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH))) { // попал в нижний край ракетки и отскочил в гол
                        // устанавливаем мяч снизу, рядом с ракеткой
                        ball.y = (rocket2.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH+BALL_RADIUS; 
                    }
                }
            }
            else if ((ball.x<=(ROCKET_WIDTH+BALL_RADIUS+1)) && (ball.speedG<0)) {  // левая стенка
                if ((ball.y>(rocket1.y - (ROCKET_HEIGTH / 2))) && (ball.y<(rocket1.y + (ROCKET_HEIGTH / 2)))) { // попал в ракетку
                    ball.x = ROCKET_WIDTH + BALL_RADIUS + 1;
                    ball.speedG = -ball.speedG;
                }
                else { // гол левому игроку
                    score2 = score2 + ((ball.speed>0) ? 1 : 0);
                    ball.speed = 0;
                    ball.x = BALL_RADIUS;
                    if (((ball.y+BALL_RADIUS)>=(rocket1.y - (ROCKET_HEIGTH / 2))) && (ball.y<((rocket1.y - (ROCKET_HEIGTH / 2))+BALL_RADIUS))) { // попал в верхний край ракетки и отскочил в гол
                        // устанавливаем мяч сверху, рядом с ракеткой
                        ball.y = (rocket1.y - (ROCKET_HEIGTH / 2))-BALL_RADIUS; 
                    }
                    else if (((ball.y-BALL_RADIUS)<=(rocket1.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH) && (ball.y>((rocket1.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH))) { // попал в нижний край ракетки и отскочил в гол
                        // устанавливаем мяч снизу, рядом с ракеткой
                        ball.y = (rocket1.y - (ROCKET_HEIGTH / 2))+ROCKET_HEIGTH+BALL_RADIUS; 
                    }
                }
            }
            else if ((ball.y>=(TENNIS_SIZE_Y-BALL_RADIUS-1)) && (ball.speedV>0)) {  // нижняя стенка
                ball.y = TENNIS_SIZE_Y-BALL_RADIUS-1;
                ball.speedV = -ball.speedV;
            };
//            console.log(score1 + ":" + score2);

//            this.updateView();
        }
    }
}

run();