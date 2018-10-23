let gameContainer = document.querySelector('.gameContainer');
let time = document.querySelector('.time');
let bonus = document.querySelector('.bonusTime');
let announsment = document.getElementsByClassName('announsment')[0];
let bigScore = document.querySelector('.score');
let backgroundImg = document.querySelectorAll('.backgroundImg');
let choseBackground = document.querySelector('.choseBackground');
// Create Grid
let level = 0;
makeGrid(levelCounter().length);
let boxes = document.querySelectorAll('.box');
let front = document.querySelectorAll('.front');
let counter = 0;
let scoreCounter = 0;
let clicked = [];
let sec = 100;
let loop;
let checked;
let points = 0;
let cols = 2;
// let cardBackground = localStorage.getItem('cardBackground');

timer();
newGame();
setCardBackground();

backgroundImg.forEach(img => {
  img.addEventListener('click', changeBackground)
});

function newGame() {
  boxes = document.querySelectorAll('.box');
  boxes.forEach(function (el) {
    el.addEventListener('click', flip)
  })
}

function flip() {
  this.removeEventListener('click', flip);
  counter++;
  clicked.push(this);

  let front = this.children[1];
  let back = this.children[0];
  front.style.transform = "perspective(900px) rotateY(180deg)";
  back.style.transform = "perspective(900px) rotateY(0deg)";

  if (counter == 2) {
    removeClicks();
    checkTiles();
  }
}

function checkTiles() {
  let back1 = clicked[0].children[0];
  let front1 = clicked[0].children[1];
  let back2 = clicked[1].children[0];
  let front2 = clicked[1].children[1];

  if (back1.innerHTML == back2.innerHTML) {
    //POGODAK
    bonusTime();
    clicked[0].classList.add('checked');
    clicked[1].classList.add('checked');
    clicked[0].classList.add('hide');
    clicked[1].classList.add('hide');
    clicked.length = 0;
    counter = 0;
    scoreCounter++;

    checked = document.querySelectorAll('.checked');
    if (level === 0 && checked.length === 4) {
      clearInterval(loop);
      score(nextLevelSelect);
    } else if (level === 1 && checked.length == 16) {
      clearInterval(loop);
      score(nextLevelSelect);
    } else if (level === 2 && checked.length == 36) {
      clearInterval(loop);
      score(nextLevelSelect);
    } else if (level === 3 && checked.length == 64) {
      clearInterval(loop);
      score(nextLevelSelect);
    } else if (level === 4 && checked.length == 100) {
      clearInterval(loop);
      gameOver(playAgain);
    }
    returnClicks();

  } else {
    setTimeout(function () {
      front1.style.transform = "perspective(900px) rotateY(0deg)";
      back1.style.transform = "perspective(900px) rotateY(180deg)";
      front2.style.transform = "perspective(900px) rotateY(0deg)";
      back2.style.transform = "perspective(900px) rotateY(180deg)";

      clicked.length = 0;
      counter = 0;
      returnClicks();
    }, 700)
  }
}

function timer() {
  loop = setInterval(function () {
    sec--;
    time.innerHTML = sec;
    if (sec == 0) {
      clearInterval(loop);
      timeOut(resetHandler);
      removeClicks()
    }
    if (sec < 20) {
      time.style.fontSize = "70px";
      time.style.border = "5px solid red";
      time.style.animation = "pulse 1s infinite"
    } else {
      time.style.fontSize = "60px";
      time.style.border = "5px solid #999";
      time.style.animation = "none";
    }
  }, 1000)
}

function bonusTime() {
  sec += 6;
  bonus.style.display = "inline-block";
  setTimeout(function () {
    bonus.style.display = "none";
  }, 1500)

}

function removeClicks() {
  boxes.forEach(function (box) {
    box.removeEventListener('click', flip);
  })
}

function returnClicks() {
  let boxes = document.querySelectorAll('.box:not(.checked)')
  boxes.forEach(function (e) {
    e.addEventListener('click', flip);
  })
}

function levelCounter() {
  let icons = [];
  if (level === 0) {
    icons = icons4
    return icons;
  } if (level === 1) {
    icons = icons16
    return icons;
  } else if (level === 2) {
    icons = icons36
    return icons;
  } else if (level === 3) {
    icons = icons64
    return icons;
  } else if (level === 4) {
    icons = icons100
    return icons;
  }
}


function makeGrid(amount) {
  let icons = levelCounter();
  let text = '';
  for (var i = 0; i < amount; i++) {
    var rand = Math.floor(Math.random() * icons.length);
    text += '<div class="box">';
    text += '<div class="back">' + icons[rand] + '</div>';
    text += '<div class="front"></div>';
    text += '</div>';
    icons.splice(rand, 1);

  }
  gameContainer.innerHTML = text;
}

function checkLevel() {
  if (level === 0 && checked.length === 4) {
    nextLevel();
    gameContainer.style.backgroundImage = "url('./img/css.jpg')";
  } else if (level === 1 && checked.length === 16) {
    nextLevel();
    gameContainer.style.backgroundImage = "url('./img/js.png')";
  } else if (level === 2 && checked.length === 36) {
    nextLevel();
    gameContainer.style.backgroundImage = "url('./img/react.png')";
  } else if (level === 3 && checked.length === 64) {
    nextLevel();
    gameContainer.style.backgroundImage = "url('./img/nodejs.png')";
  } else if (level === 4 && checked.length === 100) {
    alert("Game over");
  }
}

function nextLevel() {
  counter = 0;
  clearInterval(loop);
  level++;
  sec = 101;
  makeGrid(levelCounter().length);
  newGame();
  returnClicks();
  showImgChooser();
  hideAnnounsment();
  timer();
  resizeContainer();
  setCardBackground();

}

function resizeContainer(params) {
  cols = cols + 2;
  gameContainer.style.width = cols * 75 + "px";
  gameContainer.style.height = cols * 75 + "px";
}


function timeOut(callback) {
  hideImgChooser();
  announsment.innerHTML = "";
  announsment.innerHTML = `<span>Time is out! </span>
  <input type="button" class="resetBtn" value="RESET">`;
  announsment.style.display = "inline-block";
  if (announsment.innerHTML) {
    callback();
  }
}

function hideAnnounsment() {
  announsment.style.display = "none";
}

function score(callback) {
  hideImgChooser();
  points = points + Math.ceil(sec / 2 - 3);
  announsment.innerHTML = `You won ${points} points! <span class="nextLevelBtn">Next Level</span>`;
  gameContainer.innerHTML += '<span class="hideAnnounsment">show image</span>';
  announsment.style.display = "inline-block";
  bigScore.innerHTML = "Score : " + points;
  callback()
}

function nextLevelSelect() {
  let nextLevelBtn = document.querySelector('.nextLevelBtn');
  let hideAnnounsmentBtn = document.querySelector('.hideAnnounsment');
  hideAnnounsmentBtn.addEventListener('mouseover', hideAnnounsmentOnHover);
  hideAnnounsmentBtn.addEventListener('mouseleave', showAnnounsment);
  nextLevelBtn.addEventListener('click', checkLevel)
}

function hideAnnounsmentOnHover() {
  announsment.style.display = 'none';
  gameContainer.style.boxShadow = "6px 6px 60px";
}

function showAnnounsment() {
  announsment.style.display = 'block';
  gameContainer.style.boxShadow = "2px 2px 30px";
}

function hideImgChooser() {
  choseBackground.style.display = "none";
}

function showImgChooser() {
  choseBackground.style.display = "table";
}

function reset() {
  window.location.reload()
}

function resetHandler() {
  let resetBtn = document.querySelector('.resetBtn');
  resetBtn.addEventListener('click', reset);
}

function changeBackground() {
  let image = this.getAttribute("src");
  localStorage.setItem('cardBackground', image);
  let front = document.querySelectorAll('.front');
  front.forEach(el => {
    el.style.backgroundImage = `url('${image}')`;
  })
}

function setCardBackground() {
  let cardBackground = localStorage.getItem('cardBackground');
  front = document.querySelectorAll('.front');
  front.forEach(el => {
    el.style.backgroundImage = `url('${cardBackground ? cardBackground : ""}')`;
  })
}

function playAgain() {
  let nextLevelBtn = document.querySelector('.nextLevelBtn');
  let hideAnnounsmentBtn = document.querySelector('.hideAnnounsment');
  hideAnnounsmentBtn.addEventListener('mouseover', hideAnnounsmentOnHover);
  hideAnnounsmentBtn.addEventListener('mouseleave', showAnnounsment);
  nextLevelBtn.addEventListener('click', reset);
}

function gameOver(callback) {
  hideImgChooser();
  points = points + Math.ceil(sec / 2 - 3);
  announsment.innerHTML = `<p> Game over! <p/> <p> You won ${points} points! <p/> <span class="nextLevelBtn">Play Again</span>`;
  announsment.style.height = "200px";
  gameContainer.innerHTML += '<span class="hideAnnounsment">show image</span>';
  announsment.style.display = "inline-block";
  bigScore.innerHTML = "Score : " + points;
  callback()
}
