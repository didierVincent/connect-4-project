/*----------------------------------- constants ---------------------------------------------*/

/*----------------------------------- default settings -----------------------------------*/

//declare players with Red and Blue
const playerRed = "Red";
const playerBlue = "Blue";

//set starting default player to player one
let playerTurn = playerRed;

/*-------- model: creating a nested board array to represent the game state using JS & assigning coordinates as id values --------*/

const board = [];

const rows = 6;
const columns = 7;

function makeBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //for model ---> creating and adding (column,row) co-ordinate notation for each iteration
      row.push(x.toString() + "," + i.toString());
    }
    //for model --> after each full column array is created, we need to add that array to the board array
    board.push(row);
  }
}

makeBoard();

/*------------------------- view: creating board for HTML using JS & assigning coordinates as id values -------------------------*/

function renderBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //for view ---> create divs with coordinate ids, and a unique class to style later in css
      let space = document.createElement("div");
      space.id = x.toString() + "." + i.toString();
      space.classList.add("space");
      //for view ---> adding divs to existing board div in html
      document.getElementById("board").appendChild(space);
    }
  }
}

renderBoard();

/*----------------------------------- model: (board database) initialise column data with row property set to lowest row (6) -----------------------------------*/

const colData = {
  column0: {
    c: 0,
    r: 6,
  },

  column1: {
    c: 1,
    r: 6,
  },

  column2: {
    c: 2,
    r: 6,
  },

  column3: {
    c: 3,
    r: 6,
  },

  column4: {
    c: 4,
    r: 6,
  },

  column5: {
    c: 5,
    r: 6,
  },

  column6: {
    c: 6,
    r: 6,
  },
};

/*----------------------------------- model: update board database after placing a piece -----------------------------------*/

function updatePlayableSpaces(event) {
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  if (colData["column" + coords[0]].r < 0) {
    console.log("row property unchanged: " + colData["column" + coords[0]].r);
    return;
  } else {
    colData["column" + coords[0]].r -= 1;
  }
}

document
  .getElementById("board")
  .addEventListener("click", updatePlayableSpaces);

/*----------------- view: check board database for column data then change background color to place piece (return if no space in column) -----------------*/

function setColour(event) {
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  // console.log(event.target.id);
  if (colData["column" + coords[0]].r < 0) {
    console.log("row property unchanged: " + colData["column" + coords[0]].r);
    return;
  } else if (playerTurn === playerRed) {
    bottomSpace.style.backgroundColor = "#d62839"; // red
    playerTurn = playerBlue;
  } else if (playerTurn === playerBlue) {
    bottomSpace.style.backgroundColor = "#669bbc"; // blue
    playerTurn = playerRed;
  }
}

document.getElementById("board").addEventListener("click", setColour);

/*----------------------------------- checking for wins -----------------------------------*/

/*----- state variables -----*/

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/

/*----- model functions -----*/

/*----- controller functions -----*/

/*----- view functions -----*/
