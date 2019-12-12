import React from 'react';

let withRainbowFrame = colors => Component => props =>
    colors.forEach(function(color) {
        <div style={{border:"solid 5px "+color,padding:"10px"}}>
            <Component/>
        </div>
    })
;

/*
function withRainbowFrame(colors) {
    return function(Component) {
        return (
            colors.forEach(function(color) {
                <div style={{border:"solid 5px "+color,padding:"10px"}}>
                      <Component/>
                </div>
              })
          );
        }
}
*/

/*
let withColorBackground = color => Component => props =>
    <div style={{backgroundColor:color}}>
      <Component {...props} />
    </div>
;
*/

export { withRainbowFrame };
