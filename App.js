let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count=0;

const showDraw= ()=>{
    msg.innerText = `Ohh, You Both Played Well , DRAW GAME `;
    msgContainer.classList.remove("hide");
}


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();
        count++;
        if(count>=9){
            showDraw();
        }
    });
}
);

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes and reset their text content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Corrected typo (flase -> false)
        box.innerText = "";
    }
};

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};



// Function to reset the game
const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Function to check for a winner
const checkWinner = () => {
    
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                isWinner=true;
                showWinner(pos1Val);
                return; // Stop further checks after a winner is found
            }
        }
    }
    
};

// Event listeners for reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
