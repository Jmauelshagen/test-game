const gameScreen = document.getElementById("main-container");
const playBeginnerButton = document.getElementById("playB");
const playProButton = document.getElementById("playP");
const playExpertButton = document.getElementById("playE");
const stopButton = document.getElementById("stop");
const livesLeft = document.getElementById("lives");
const clicks = document.getElementById("clicks");
const needed = document.getElementById("needed");

// const colors = ['red','orange','blue','green'];
let whiteSquares = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let count = 0;
let lives = 0;
let time = 0;
let endGame = null;

const timer = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const timeLimit = async (item) => {
    let i = 3;
    item.innerText = i;
    do{ 
        if (item.innerText === 'c') {
            break;
        }
        else if (i === 0){
            item.innerText = i;
            lives--;
            livesLeft.innerHTML = lives;
            // await timer(10);
            if(lives === 0){
                endGame = 'lives'
                // stopGame();
            }
            else{
                lifeLost(item);
            }
            break;
        }
        else{
            item.innerText = i;
            i--;
            await timer(1000);
        }
    } while(endGame === null);
}

let playExpert = async () => {
    endGame = null;
    count = 0;
    lives = 2;
    time = 200;
    needed.innerText = time/5 - count;
    do {
        if(count*5 >= time){
            endGame = 'win';
            stopGame();
        }
        else{
            if(whiteSquares.length === 16){
                changecolor();
            }
            else{
                changecolor();
                await timer(time - count*2);
            }
        }
    } while (endGame === null);
}

let playPro = async () => {
    endGame = null;
    count = 0;
    lives = 2;
    time = 400;
    needed.innerText = time/5 - count;
    do {
        if(count*5 >= time){
            endGame = 'win';
            stopGame();
        }
        else{
            if(whiteSquares.length === 16){
                changecolor();
            }
            else{
                changecolor();
                await timer(time - count*2);
            }
        }
    } while (endGame === null);
}

let playBeginner = async () => {
    endGame = null;
    count = 0;
    lives = 2;
    time = 600;
    needed.innerText = time/5 - count;
    do {
        if(count*5 >= time){
            endGame = 'win';
        }
        else{
            if(whiteSquares.length === 16){
                changecolor();
            }
            else{
                changecolor();
                await timer(time - count*2);
            }
        }
    } while (endGame === null);
    stopGame();
}

const changecolor = () =>{
    let int = parseInt(Math.random() * whiteSquares.length);
    const colors = ['red','orange','blue','green'];
    let color = colors[Math.floor((Math.random() * colors.length))];
    if(whiteSquares.length !== 0){
        const item = document.getElementById(`${whiteSquares[int]}`);
        whiteSquares.splice(int,1);
        item.classList.replace(item.classList[2], 'counting');
        item.innerText = '';
        item.classList.replace(item.classList[1], color);
        timeLimit(item);
    }
    else{
        endGame = 'numbers';
        // stopGame();
    }
}

const lifeLost = (square) => { 
    alert(`timer ran out on a square:${square.id}\nLives left: ${lives}`);
    whiteSquares = [];
    for (i = 1 ; i < 17 ; i++){
        const item = document.getElementById(i);
        item.classList.replace(item.classList[1], 'white');
        item.classList.replace(item.classList[2], 'hidden');
        item.innerText = 'c';
        whiteSquares.push(item.id);
    }
};

const stopGame = () => {
    switch (endGame) {
        case 'lives': alert(`Game over!\nYou lost all your lives!\n You got ${count} points.`); console.log('you lost all your lives');break;
        case 'numbers': alert(`Game over!\nThe screen filled up...\n You got ${count} points.`); console.log('numbers');break;
        case 'win': alert(`YOU WON!\n You got ${count} points.`); console.log('won'); break;
        case 'quit': alert(`You gave up...\n You got ${count} points.`); console.log('quit'); break;
        default: console.log('Sorry, we are out of ' + expr + '.');
    }
    
    whiteSquares = [];
    for (i = 1 ; i < 17 ; i++){
        const item = document.getElementById(i);
        item.classList.replace(item.classList[1], 'white');
        item.classList.replace(item.classList[2], 'c');
        item.innerText = '';
        let int = whiteSquares.findIndex((i) => i === item.id);
        if (int === -1){
            whiteSquares.push(item.id)
        }
    }
    livesLeft.innerText = 2;
    clicks.innerText = 0;
    needed.innerText = 0;
};

const clickBox = (e) => {
    const item = e.target;
    console.log(e);
    if (item.id !== 'main-container'){
        if(item.classList[1] !== 'white'){
            count++;
            item.classList.replace(item.classList[1], 'white');
            item.innerText = 'c';
            item.classList.replace(item.classList[2], 'hidden');
            let int = whiteSquares.findIndex((i) => i === item.id);
            if (int === -1){
                whiteSquares.push(item.id)
            }
            clicks.innerText = count;
            needed.innerText = time/5 - count;
        }
    }
};

const giveUp = () =>{
    endGame = 'quit'
    stopGame();
}


gameScreen.addEventListener('click', clickBox);
playBeginnerButton.addEventListener('click', playBeginner);
playProButton.addEventListener('click', playPro);
playExpertButton.addEventListener('click', playExpert);
stopButton.addEventListener('click', giveUp);
