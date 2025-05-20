let boxes = document.querySelectorAll('.light-box');//it is now in the form of array
let score = 0;
let activeBox = null;//this is used to store the active box
let startbtn = document.querySelector('#startBtn');
let gameInterval = null;
let resetBtn = document.querySelector('#resetBtn');
let timelimit = 20000;
let reqiiredScore = 20;



//for now if we call this fun it will result in undefined because we are not returning anything
function DisableAllBoxes() {
    boxes.forEach(box => {
        // console.log("hello");
        box.classList.remove('active')//act is the class that is used to make the box glow
        box.removeAttribute('data-active')//data-active is the attribute that is used to make the box glow
    });
}
//dif btw active and data-active is that active is a class and data-active is an attribute.



function resetGame() {
    DisableAllBoxes();
    score = 0;
    document.getElementById('score').textContent = score;
    activeBox = null;
}



// function startGame() { }

//click event on each box
boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box === activeBox) {
            score++;
            var scoreElement = document.getElementById('score');
            scoreElement.innerHTML = score;
            activateRandomBox();
        }
    });
});



function activateRandomBox() {
    DisableAllBoxes();
    let rendomBox = Math.floor(Math.random() * boxes.length);
    activeBox = boxes[rendomBox];
    activeBox.classList.add('active');
    activeBox.setAttribute('data-active', 'true');

    //After one second the box will be deactivated
    setTimeout(function () {
        if (activeBox) {
            activeBox.classList.remove('active');
            activeBox.removeAttribute('data-active');
        }
    }, 1000);


}


startbtn.addEventListener('click', () => {
    if (!gameInterval) {
        gameInterval = setInterval(activateRandomBox, 2000);
    }

    gameTimer = setTimeout(function () {
        if (score < reqiiredScore) {
            clearInterval(gameInterval);
            gameInterval = null;
            alert('Game Over');
        } else {
            clearInterval(gameTimer);
            gameTimer = null;
            alert('You Win');
        }
    }, timelimit);

});

resetBtn.addEventListener('click', () => {
    resetGame();
    DisableAllBoxes();
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
});

// function updateScore(){
