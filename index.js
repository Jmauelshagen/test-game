const browser = document.getElementById("main-container");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const colors = ['red','orange','blue','green'];
let whiteSquares = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let playing = false;

const timer = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

let play = async () => {
    playing = true;
    while(playing === true) {
        changecolor();
        await timer(500);
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

const startGame = () => {
    play();
};

const stopGame = () => {
    playing = false;
};

const test = (e) => {
    const item = e.target;
    item.classList.replace(item.classList[1], 'white');
    let int = whiteSquares.findIndex((i) => i === item.id);
    if (int === -1){
        whiteSquares.push(item.id)
    }
};

browser.addEventListener('click', test);
playButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);