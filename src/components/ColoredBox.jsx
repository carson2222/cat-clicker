import React from 'react';
import classes from './_colored-box.module.scss'
function ColoredBox({color, type="home", textContent}) {
  if(type === 'home'){
    return <p className={`${classes.colorBox} ${classes.colorBox_home} ${classes[`colorBox_${color}`]}`}>{textContent}</p>
  }
  if(type === 'btn'){
    return <p className={`${classes.colorBox} ${classes[`colorBox_${color}`]}`}>{textContent}</p>
  }
}

export default ColoredBox