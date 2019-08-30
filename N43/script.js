"use strict";

var rocket1 = null;
var rocket2 = null;
var tennis = null;
var ball = null;

var DISPLAY_REFRESH = 1000 / 60; // обновление монитора 60 раз в секунду

function run() {
    tennis = document.getElementById('tennis');

    ball = document.getElementById('ball');
    ball.speed = 0;
    
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
                                                if (rocket2.offsetTop>=(tennis.offsetHeight - rocket2.offsetHeight - 2)) {
                                                    rocket2.speed = 0;
                                                }
                                                else {
                                                    rocket2.speed = 1;
                                                }
                                                break;
                                            case "ArrowUp":
                                                if (rocket2.offsetTop<=2) {
                                                    rocket2.speed = 0;
                                                }
                                                else {
                                                    rocket2.speed = -1;
                                                }
                                                break;
                                            case "ShiftLeft":
                                                    if (rocket1.offsetTop<=1) {
                                                        rocket1.speed = 0;
                                                    }
                                                    else {
                                                        rocket1.speed = -1;
                                                    }
                                                break;
                                            case "ControlLeft":
                                                    if (rocket1.offsetTop>=(tennis.offsetHeight - rocket1.offsetHeight)) {
                                                        rocket1.speed = 0;
                                                    }
                                                    else {
                                                        rocket1.speed = 1;
                                                    }
                                                break;
                                            default:
                                                return; // Quit when this doesn't handle the key event.
                                            }
                                        
                                            // Cancel the default action to avoid it being handled twice
        //                                    event.preventDefault();

                                            console.log("keydown->speed: rocket1 " + rocket1.speed + ", rocket2 " + rocket2.speed);
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

                                        console.log("keyup->speed: rocket1 " + rocket1.speed + ", rocket2 " + rocket2.speed);
    }, false);
    
    var dtn = new Date();
    setTimeout(draw,DISPLAY_REFRESH-dtn.getMilliseconds());
};

function draw() {
    if (rocket2.offsetTop>=(tennis.offsetHeight - rocket2.offsetHeight - 2)) {
        rocket2.speed = 0;
    };
    if (rocket2.offsetTop<=2) {
        rocket2.speed = 0;
    };
    rocket1.style.top = (rocket1.offsetTop + rocket1.speed) + 'px';
    rocket2.style.top = (rocket2.offsetTop + rocket2.speed) + 'px';

    var dtn = new Date();
    setTimeout(draw,DISPLAY_REFRESH-dtn.getMilliseconds());
  }


run();