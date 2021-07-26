const container = document.querySelector('.container')
const divs = Array.from(document.querySelectorAll('.div'))
const flightZoneX = container.clientLeft;
const flightZoneY = container.offsetTop;
const flightZoneMaxX = container.clientWidth;
const flightZoneMaxY = container.clientHeight;
let originX, originY, originXY;

console.log('flight zone: ', flightZoneX, flightZoneY);

window.onload = function() {  
  originXY = [];
  /* listen to the touchmove event, every time it fires, grab the location 
  of touch and assign it to box */  
  divs.forEach ( (divElement) => {
    divElement.addEventListener('touchmove', touchMove);
    divElement.addEventListener('touchstart', touchStart);
    divElement.addEventListener('touchend', touchEnd);

    // Mouse events
    divElement.addEventListener('mousedown', touchStart);
    divElement.addEventListener('mouseup', touchEnd);
    divElement.addEventListener('mouseleave', touchEnd);
    divElement.addEventListener('mousemove', touchMove);

    const divName = divElement.id;    
    const id = document.getElementById(divName);    
    const left = id.offsetLeft;
    const top = id.offsetTop;

    console.log(divName, left, top);    
    originXY.push({divName, left, top});
    console.log(originXY);   
  }) 
}

function touchMove (e) {    
  console.log('move');
  
  // // grab the location of touch
  const touchLocation = e.targetTouches[0];
  const touchedElement = e.target.id;
      
  const moveDiv = document.getElementById(touchedElement);    
  moveDiv.style.zIndex = 1;

  if(touchLocation.pageX < flightZoneX || touchLocation.pageX > flightZoneMaxX 
    || touchLocation.pageY < flightZoneY || touchLocation.pageY > flightZoneMaxY){
    console.log('out of flight zone')
  } else {
    
  }
    // assign box new coordinates based on the touch.
    moveDiv.style.left = touchLocation.pageX - 60 + 'px';
    moveDiv.style.top = touchLocation.pageY - 140 + 'px';
  // console.log(moveDiv.style.left, moveDiv.style.top)    
}

function getTouchPosition(e) {
  var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
  // console.log(x,y)
}

function touchStart(e){
  e.preventDefault()
  console.log('start');    
  
  // Another way to get info
  // var t = e.targetTouches.length > 0 ? e.targetTouches.item(0) : e.touches.item(0); 
  // var x = e.targetTouches[0].target.tagName;    
  // console.log(x, t);  
  // console.log(e.target.id);
}

function touchEnd(e){
  e.preventDefault()
  console.log('end');
  const touchedElement = e.target.id;    
  const moveDiv = document.getElementById(touchedElement);

  for (i = 0; i < originXY.length; i++){
    if (touchedElement == originXY[i].divName){
      originX = originXY[i].left;
      originY = originXY[i].top;
    }
  }

  var x = parseInt(moveDiv.style.left);
  var y = parseInt(moveDiv.style.top) + flightZoneY;

  if (y < flightZoneY || y > flightZoneMaxY)
  console.log('heyyyy');

  if(x < flightZoneX || (x + moveDiv.clientWidth) > flightZoneMaxX || 
    y < flightZoneY || (y - flightZoneY + moveDiv.clientHeight) > flightZoneMaxY){      
    moveDiv.style.left = originX + 'px';
    moveDiv.style.top = originY + 'px';
  } else {
    moveDiv.style.left = x + 'px';
    moveDiv.style.top = y - flightZoneY + 'px'; 
  }
  
  console.log(x, y, flightZoneY);
}
