"use strict";

var rocket1 = null;
var rocket2 = null;
var tennis = null;
var ball = null;

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
                                            if (event.defaultPrevented) {
                                            return; // Do nothing if the event was already processed
                                            }
                                        
                                            switch (event.code) {
                                            case "ArrowDown":
                                                rocket2.speed = -1;
                                                break;
                                            case "ArrowUp":
                                                rocket2.speed = 1;
                                                break;
                                            case "ShiftLeft":
                                                rocket1.speed = 1;
                                                break;
                                            case "ControlLeft":
                                                rocket1.speed = -1;
                                                break;
                                            default:
                                                return; // Quit when this doesn't handle the key event.
                                            }
                                        
                                            // Cancel the default action to avoid it being handled twice
                                            event.preventDefault();

                                            console.log("rocket1 " + rocket1.speed + ", rocket2 " + rocket2.speed);
                                        }, false);

  document.addEventListener('keyup', function (event) {
                                        if (event.defaultPrevented) {
                                        return; // Do nothing if the event was already processed
                                        }
                                    
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
                                        event.preventDefault();

                                        console.log("rocket1 " + rocket1.speed + ", rocket2 " + rocket2.speed);
                                    }, false);

};

run();