const gameScreen = document.getElementById("main-container");
const playBeginnerButton = document.getElementById("playB");
const playProButton = document.getElementById("playP");
const playExpertButton = document.getElementById("playE");
const stopButton = document.getElementById("stop");
const colors = ['red','orange','blue','green'];
let whiteSquares = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let playing = false;
let count = 0;

const timer = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

let playExpert = async () => {
    playing = true;
    while(playing === true) {
        while (whiteSquares.length !== 0){
            changecolor();
            await timer(200);
        }
        stopGame();
    }
}
let playPro = async () => {
    playing = true;
    while(playing === true) {
        while (whiteSquares.length !== 0){
            changecolor();
            await timer(400);
        }
        stopGame();
    }
}
let playBeginner = async () => {
    playing = true;
    while(playing === true) {
        while (whiteSquares.length !== 0){
            console.log(whiteSquares.length);
            changecolor();
            await timer(600);
        }
        stopGame();
    }
}

const changecolor = () =>{
    var int = parseInt(Math.random() * whiteSquares.length);
    const colors = ['red','orange','blue','green'];
    var color = colors[Math.floor((Math.random() * colors.length))];
    if(whiteSquares.length !== 0){
        const item = document.getElementById(`${whiteSquares[int]}`);
        whiteSquares.splice(int,1);
        item.classList.replace(item.classList[1], color);
    }
}

const stopGame = () => {
    playing = false;
    for (i = 1 ; i < 17 ; i++){
        const item = document.getElementById(i);
        item.classList.replace(item.classList[1], 'white');
        let int = whiteSquares.findIndex((i) => i === item.id);
        if (int === -1){
            whiteSquares.push(item.id)
        }
    }
    alert(`Game over! you got ${count} items.`);
    count = 0;
};

const clickBox = (e) => {
    const item = e.target;
    if(item.classList[1] !== 'white'){
        count++;
        item.classList.replace(item.classList[1], 'white');
        let int = whiteSquares.findIndex((i) => i === item.id);
        if (int === -1){
            whiteSquares.push(item.id)
        }
    }
};

gameScreen.addEventListener('click', clickBox);
playBeginnerButton.addEventListener('click', playBeginner);
playProButton.addEventListener('click', playPro);
playExpertButton.addEventListener('click', playExpert);
stopButton.addEventListener('click', stopGame);