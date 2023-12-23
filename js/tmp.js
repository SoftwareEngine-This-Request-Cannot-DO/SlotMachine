/*
count++;
if(resetPos.length == 0){
  cycle = 0;
  is_round = false;
} 
if(is_round){
    qqq = 0;
    cycle = 9 - (resetPos.shift() % 9);
}
else{ 
  if(count % 6 == 0){
    is_round = true;
  }
  else{
    qqq = Math.round(Math.random() * num_icons);
  }
  if(resetPos.length < 3){
  
    resetPos.push(qqq);
  }  
  else{
    resetPos[count % 3] = resetPos[count % 3] + qqq; 
  }
 
}*/


probabilityArr = [0.1,1.5,1.5,8,8,8,10,10,10];
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



/**
 * Setup
 */
const debugEl = document.getElementById('debug'),
			// Mapping of indexes to icons: start from banana in middle of initial position and then upwards
			iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"],
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
const roll = (reel, offset = 0) => {
	// Minimum of 2 + the reel offset rounds
	const delta = (offset + 2) * num_icons + 
round(Math.random() * num_icons); 
	
	// Return promise so we can wait for all reels to finish
	return new Promise((resolve, reject) => {
		
		const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]),
					// Target background position
					targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
					// Normalized background position, for reset
					normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);
		
		// Delay animation with timeout, for some reason a delay in the animation property causes stutter
		setTimeout(() => { 
			// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Set background position
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);
			
		// After animation
		setTimeout(() => {
			// Reset position, so that it doesn't get higher without limit
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			// Resolve this promise
			resolve(delta%num_icons);
		}, (8 + 1 * delta) * time_per_icon + offset * 150);
		
	});
};


/**
 * Roll all reels, when promise resolves roll again
 */
function rollAll() {
	
	debugEl.textContent = 'rolling...';
	
	const reelsList = document.querySelectorAll('.slots > .reel');
	
	Promise
		
		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all( [...reelsList].map((reel, i) => roll(reel, i)) )	
		
		// When all reels done animating (all promises solve)
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
		
			// Win conditions
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(() => document.querySelector(".slots").classList.remove(winCls), 2000)
			}
		
			// Again!
			setTimeout(rollAll, 3000);
		});
};

// Kickoff
setTimeout(rollAll, 1000);


//修改2錯誤
var resetPos = [0,0,0],winNumber = -1,failNumber = -1;

var count = -1,win = -1,closeProbablity = true;

const roll = (reel, offset = 0) => {
  count++;
  if(count % 3 == 0){
    /*if(winNumber != -1){
      for(var i=0;i<3;i++){
        resetPos[i] = winNumber;
      }   
      winNumber = -1;
    }*/
    /*if(winNumber != -1){
      for(var i=0;i<3;i++){
        resetPos[i] = 0;
      }   
    }*/
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
    winNumber = 9 - (resetPos[count % 3] % 9) ;
    //console.log("winNUmber", winNumber);
  }
  else{
    winNumber = 0;
    failNumber = Math.round(Math.random() * num_icons); 
    resetPos[count % 3] += failNumber;
   // console.log("resetpos", resetPos[count % 3]);
  }
  
  const delta = failNumber + winNumber;
  console.log("delta",delta);
  //((offset + 2) * num_icons)