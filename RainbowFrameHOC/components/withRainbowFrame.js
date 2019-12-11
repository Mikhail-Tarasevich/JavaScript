import React from 'react';

function withRainbowFrame(colors) {
    return function(Component) {
        return props => (
            colors.forEach(function(color) {
                <div style={{border:"solid 5px "+color,padding:"10px"}}>
                      <Component {...props} />
                </div>
              })
          );
        }
}

export { withRainbowFrame };
