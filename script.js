const aiplaneClass= "airplane";
const cloudClass = "cloud";
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell]");
const gameBody = document.querySelector("#game_body");
const winningMessage = document.querySelector(".winning_message");
const winningPage= document.querySelector(".winning_page_container")
const restartButton= document.querySelectorAll(".reset")
let airplaneTurn

startGame(); 

function startGame(){
    airplaneTurn = true;
    cellElements.forEach(cell=>{
        cell.classList.remove(aiplaneClass);
        cell.classList.remove(cloudClass);
        cell.addEventListener("click", handelClick, {once: true})
    })
    setGameBodyHoverClass()
    winningPage.classList.remove("show");

}

function handelClick(e){
    const cell = e.target
    const currentClass= airplaneTurn ? cloudClass : aiplaneClass;
   placeMark(cell, currentClass)

   if(ceckWin(currentClass)){
        endGame(false);
   }else if(isDraw()){
        endGame(true);
   }else{
    swapTurns();
    setGameBodyHoverClass();
   }
}

function endGame(draw){
    if(draw){
        winningMessage.innerHTML = "Draw"
    }else{
        winningMessage.innerHTML = `${airplaneTurn? "Clouds" : "Airplanes"} wins!`
    }
    winningPage.classList.add("show");
}
function isDraw() {
    return [...cellElements].every(cell=>{
        return cell.classList.contains(aiplaneClass) ||
        cell.classList.contains(cloudClass)
    })
}
function placeMark (cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    airplaneTurn = !airplaneTurn 
}
function setGameBodyHoverClass(){
    gameBody.classList.remove(aiplaneClass);
    gameBody.classList.remove(cloudClass);
    if(airplaneTurn){
        gameBody.classList.add(cloudClass);
        gameBody.style.backgroundImage = "none";
    }else{
        gameBody.classList.add(aiplaneClass);
    }
}

function ceckWin(currentClass){
    return winningCombination.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

restartButton.forEach(button=>{
    button.addEventListener("click", ()=>{
        startGame(); 
    })
})

