//中獎設定
var magnificat = [1000,100,100,10,10,10,3,3,3];
var probabilityArr = [0.5,1.5,1.5,8,8,8,10,10,10];
function setProbability(){
  var randomNum = Math.random();
  for(var i=0;i<9;i++){
    if(probabilityArr[i] > randomNum * 100){
      if(i == 0)
        return 0;
      else if(i == 1){
        randomNum = Math.random();
        return Math.floor(randomNum * 2) + 1;
      }
      else if(i == 3){
        randomNum = Math.random();
        return Math.floor(randomNum * 3) + 3;
      }
      else if(i == 6){
        randomNum = Math.random();
        return Math.floor(randomNum * 3) + 6;
      }
    }
  }
  return -1;
}

const debugEl = document.getElementById('debug'),
  // Mapping of indexes to icons: start from banana in middle of initial position and then upwards
  iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  let tolProbabilty = 1;
  const random_number = Math.random() ;
  let probability = [];
  
  let money = [];
 
  // Width of the icons
  icon_width = 79,
  // Height of one icon in the strip
  icon_height = 79,
  // Number of icons in the strip
  num_icons = 9,
  // Max-speed in ms for animating one icon down
  time_per_icon = 100,
  // Holds icon indexes
  indexes = [0, 0, 0];


/** 
 * Roll one reel
 */
var resetPos = [0,0,0],winNumber = -1,failNumber = -1;

var count = -1,win = -1,closeProbablity = true;

const roll = (reel, offset = 0) => {
  count++;
  if(count % 3 == 0){ 
    winNumber = setProbability();
    if(winNumber != -1){
      closeProbablity = true;
      console.log("中獎",winNumber);
    }
    else{
      closeProbablity = false;
    }
  }
  if(closeProbablity){
    failNumber = 0;
    resetPos[count % 3 ] %= 9;
    if(resetPos[count % 3] > winNumber){
      cycle = 9 - (resetPos[count % 3] - winNumber);
    }
    else{
      cycle = winNumber - resetPos[count % 3];
    }
    resetPos[count % 3] = winNumber; //復位
  }
  else{
    cycle = 0;
    failNumber = Math.round(Math.random() * num_icons); 
    resetPos[count % 3] += failNumber;
   // console.log("resetpos", resetPos[count % 3]);
  }

  const delta = failNumber + cycle;
  console.log("delta",delta);
  //((offset + 2) * num_icons)


  // Return promise so we can wait for all reels to finish
  return new Promise((resolve, reject) => {
    const style = getComputedStyle(reel),
      // Current background position
      backgroundPositionY = parseFloat(style["background-position-y"]),
      // Target background position
      targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
    
      normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

  setTimeout(() => {
      reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;

      reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
    }, offset * 150);

    // After animation
    setTimeout(() => {
      // Reset position, so that it doesn't get higher without limit
      reel.style.transition = `none`;
      reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
      // Resolve this promise
      resolve(delta % num_icons);
    }, (8 + 1 * delta) * time_per_icon + offset * 150);  
  });

};

/**
 * Roll all reels, when promise resolves roll again
 */
let is_roll = false;
let winCls = "";
function rollAll() {
  if(is_roll){
    return;
  }
  else{
    is_roll = true;
  }

  debugEl.textContent = 'rolling...';
  const reelsList = document.querySelectorAll('.slots > .reel');
  Promise

  // Activate each reel, must convert NodeList to Array for this with spread operator
  .all([...reelsList].map((reel, i) => roll(reel, i)))

  // When all reels done animating (all promises solve)
  .then(deltas => {
    // add up indexes
    deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
    debugEl.textContent = indexes.map(i => iconMap[i]).join(' - ');
    is_roll = false;
    // Win conditions
    if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
      winCls = indexes[0] == indexes[2] ? "win2" : "win1" ;
      document.querySelector(".slots").classList.add(winCls);
      
      setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000);
    }

    setTimeout(rollAll, 500);
  });
}
;

setTimeout(rollAll, 500);
