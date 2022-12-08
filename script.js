let bingoBoard = document.getElementById("bingoboard");
let numbers = [];
let drawn = [];

function generateNumberField(n) {
    let numField = document.createElement("div");
    numField.classList.add("numberField")
    numField.innerText = n;
    bingoBoard.appendChild(numField);
}

function drawRandom() {
    let available = numbers.filter(n => !drawn.includes(n));
    if (available.length > 0) {
        let num = available[Math.floor(Math.random() * available.length)];
        drawn.push(num);
    
        let nums = document.querySelectorAll(".numberField");
        for (let i=0; i<nums.length; i++) {
            if (parseInt(nums[i].innerText) === num) {
                nums[i].classList.add("drawn");
                setRandomBG(nums[i]);
            }
        }
    } else {
        alert("No more numbers left, dummy!")
    }
}

function generateBoards() {
    let players = document.getElementById("numplayers").value;
    console.log(players);
}


function setMaxNumbers(n) {
    for (let i=1;i<=n; i++) {
        numbers.push(i)
    }
}


function setRandomBG(node) {
    node.style.backgroundColor = "#" + Math.floor(Math.random()*16777216).toString(16);
}

function shuffleNumbers() { // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i=0;i<numbers.length-1; i++) {
        let j = Math.floor(Math.random() * (numbers.length - i)) + i;
        let swp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = swp;
    }
}

window.onload = function() {
    alert("lets fucking play bingo")
    setMaxNumbers(11); // i know the task said 76, but it looks so much cleaner with only full rows on my screen 
    shuffleNumbers();

    for (let i=0;i<numbers.length;i++) { // create as many numberFields on the board as there are numbers set
        generateNumberField(numbers[i]);
    }
}