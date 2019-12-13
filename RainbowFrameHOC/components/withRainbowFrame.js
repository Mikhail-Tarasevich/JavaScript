import React from 'react';

let withRainbowFrame = colors => Component => props => {

    let element = <Component {...props} />;

    colors.forEach(function(color) {
        element = <div style={{border:"solid 5px "+color,padding:"10px"}}>
            {element}
        </div>
    })

    return element;  
}

export { withRainbowFrame };
