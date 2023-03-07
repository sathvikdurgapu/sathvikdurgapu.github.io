import {wordList} from './words.js';

let gameState = {
    gameGrid: Array(6).fill().map(()=> Array(5).fill('')),
    currentRow:0,
    currentCol:0,
    hiddenWord: wordList[Math.floor(Math.random()*wordList.length)],

}

function init(){
    const gameContainer = document.getElementById('gameContainer');
    makeGameGrid(gameContainer);
    console.log(gameState.hiddenWord);
    keyboardpresses();
}

function makeGameGrid(gameContainer){
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';

    for(let i=0;i<6;i++){
        for(let o=0;o<5;o++){
            makeBox(gameGrid,i,o)
        }
    }
    gameContainer.appendChild(gameGrid);
}

function makeBox(gameGrid,row,col,letter=''){
    const charBox = document.createElement('div');
    charBox.className='charBox';
    charBox.id = 'charBox.'+row+''+col;
    charBox.textContent=letter;
    gameGrid.appendChild(charBox);
    return charBox;
}

function keyboardpresses(){
    document.body.onkeydown = (e) =>{
        let key = e.key;
        if(key === 'Enter'){
            let word = getEnteredWord();
            if(isWordValid(word)){
                checkLetters();
                checkTurn(word);
                gameState.currentRow++;
                gameState.currentCol=0;
            }else{
                alert("The word is invalid");
            }
        }
        if(key === 'Backspace'){
            deleteLetter();

        }
        if(isAlpha(key)){
            addLetter(key);
        }
        updateGameGrid();
    }
}


function checkTurn(enteredWord){
    let won = gameState.hiddenWord===enteredWord;
    let gameOver = gameState.currentRow===5;
    if(won){
        alert('YAY! You have Won the Game!!')
    }else if(gameOver){
        alert('Game Over! You didn\'t find the word, the word was '+gameState.hiddenWord+'.');
    }
}
function isWordValid(enteredWord){
    return wordList.includes(enteredWord);
}

function checkLetters(){
    for(let i=0;i<5;i++){
            let charBox = document.getElementById('charBox.'+gameState.currentRow+''+i);
            let letter = charBox.textContent;

            if(letter==gameState.hiddenWord[i]){
                charBox.classList.add('correct');
            }else if(gameState.hiddenWord.includes(letter)){
                charBox.classList.add('contains');
            }else{
                charBox.classList.add('empty');
            }

    }
}

function getEnteredWord(){
    return gameState.gameGrid[gameState.currentRow].reduce((previous,current)=>previous+current);
}

function updateGameGrid(){
    for(let i=0;i<gameState.gameGrid.length;i++){
        for(let o=0;o<gameState.gameGrid[i].length;o++){
            let charBox = document.getElementById('charBox.'+i+''+o);
            charBox.textContent = gameState.gameGrid[i][o];
        }
    }
}

function isAlpha(key){
    return key.length ===1 && key.match(/[a-z]/i);
}

function addLetter(key){
    if(gameState.currentCol ===5) return;
    gameState.gameGrid[gameState.currentRow][gameState.currentCol]=key;
    gameState.currentCol++;
}

function deleteLetter(){
    if(gameState.currentCol===0) return;
    gameState.gameGrid[gameState.currentRow][gameState.currentCol-1]='';
    gameState.currentCol--;
}
init();