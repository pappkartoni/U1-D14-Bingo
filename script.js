// Some global variables we need. The bingoBoard itself, 
// the board containing the player cards, 
// the array of numbers which we use to generate random permutation of numbers 
// and finally a second array, to keep track of all the numbers that have already been drawn
let bingoBoard = document.getElementById("bingoboard");
let playerBoards = document.getElementById("playerboards");
let numbers = [];
let drawn = [];

// Upon rereading the task I think I did not do this the intended way. However, my idea works as well and I even check for winners (in case of 5x5 board at least)!
function drawRandom() {
    let available = numbers.filter(n => !drawn.includes(n));

    if (document.getElementsByClassName("winner").length > 0) {
        alert("We already have a winner, dummy!");
    } else if (!(document.getElementsByClassName("playerboard").length > 0)) {
        alert("Don't draw a number, there are no players yet, dummy!");
    } else {
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
            checkWinnerN25();
        } else {
            alert("No more numbers left, dummy!") // Technically this can't happen i guess
        }
    }
}

function generateBoards() {
    let players = document.getElementById("numplayers").value;
    playerBoards.innerHTML = ""; // new game new luck
    for (let i = 1; i <= players; i++) {
        let board = document.createElement("div");
        board.classList.add("playerboard");
        let title = document.createElement("h2");
        title.innerText = `Player ${i}`;
        board.appendChild(title);

        let numCopy = shuffleNumbers(numbers);

        for (let j = 0; j < Math.floor(numbers.length / 3); j++) {  // player cards get amount of numbers based on total numbers in the pool
            if (j === 12) {                                         // sadly this means this can't be static to make any sense outside of the one case that was in the task.
                generateDummyField(board);                          // TODO: Make dynamic, i.e. rethink how to generate player boards based on total numbers
            } else {
                generateNumberField(numCopy[j], board);
            }
        }

        playerBoards.appendChild(board);
    }
}

function generateNumberField(n, board) {
    let numField = document.createElement("div");
    numField.classList.add("numberField")
    numField.innerText = n;
    board.appendChild(numField);
}

function generateDummyField(board) {
    let dummyField = document.createElement("div");
    dummyField.classList.add("numberField", "drawn")
    dummyField.innerText = "X";
    setRandomBG(dummyField);
    board.appendChild(dummyField);
}

// why did i do this?
function checkWinnerN25() {                                         // This has to be made dynamic based on player board size as well
    let players = playerBoards.children;
    for (let p of players) {
        let fields = p.children;
        if ((isDrawn(fields[1]) && isDrawn(fields[2]) && isDrawn(fields[3]) && isDrawn(fields[4]) && isDrawn(fields[5])) || 
            (isDrawn(fields[6]) && isDrawn(fields[7]) && isDrawn(fields[8]) && isDrawn(fields[9]) && isDrawn(fields[10])) ||
            (isDrawn(fields[11]) && isDrawn(fields[12]) && isDrawn(fields[13]) && isDrawn(fields[14]) && isDrawn(fields[15])) ||
            (isDrawn(fields[16]) && isDrawn(fields[17]) && isDrawn(fields[18]) && isDrawn(fields[19]) && isDrawn(fields[20])) ||
            (isDrawn(fields[21]) && isDrawn(fields[22]) && isDrawn(fields[23]) && isDrawn(fields[24]) && isDrawn(fields[25])) ||
            (isDrawn(fields[1]) && isDrawn(fields[6]) && isDrawn(fields[11]) && isDrawn(fields[16]) && isDrawn(fields[21])) ||
            (isDrawn(fields[2]) && isDrawn(fields[7]) && isDrawn(fields[12]) && isDrawn(fields[17]) && isDrawn(fields[22])) ||
            (isDrawn(fields[3]) && isDrawn(fields[8]) && isDrawn(fields[13]) && isDrawn(fields[18]) && isDrawn(fields[23])) ||
            (isDrawn(fields[4]) && isDrawn(fields[9]) && isDrawn(fields[14]) && isDrawn(fields[19]) && isDrawn(fields[24])) ||
            (isDrawn(fields[5]) && isDrawn(fields[10]) && isDrawn(fields[15]) && isDrawn(fields[20]) && isDrawn(fields[25])) ||
            (isDrawn(fields[1]) && isDrawn(fields[7]) && isDrawn(fields[15]) && isDrawn(fields[19]) && isDrawn(fields[25])) ||
            (isDrawn(fields[21]) && isDrawn(fields[17]) && isDrawn(fields[13]) && isDrawn(fields[9]) && isDrawn(fields[5]))
        ) {
            alert("BINGO");
            p.classList.add("winner");
        }
    }
}

// Helper Functions
function isDrawn(node) {
    return node.classList.contains("drawn");
}

function setMaxNumbers(n) {
    for (let i=1;i<=n; i++) {
        numbers.push(i)
    }
}

function setRandomBG(node) {
    node.style.backgroundColor = "#" + Math.floor(Math.random()*16777216).toString(16);
}

function shuffleNumbers(numArray) { // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i=0;i<numArray.length-1; i++) {
        let j = Math.floor(Math.random() * (numArray.length - i)) + i;
        let swp = numArray[i];
        numArray[i] = numArray[j];
        numArray[j] = swp;
    }

    return numArray;
}

window.onload = function() {
    setMaxNumbers(77); // i know the task said 76, but it looks so much cleaner with only full rows on my screen 
    numbers = shuffleNumbers(numbers);

    for (let i=0;i<numbers.length;i++) { // create as many numberFields on the board as there are numbers set
        generateNumberField(numbers[i], bingoBoard);
    }
}