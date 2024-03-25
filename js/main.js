
/*----------------------------------- constants ---------------------------------------------*/

/*----------------------------------- default settings -----------------------------------*/

//declare players with Red and Blue
const playerRed = "Red"
const playerBlue = "Blue"

//set starting default player to player one
let playerTurn = playerRed

/*------------------------- creating the grid using JS, and storing coordinate data -------------------------*/

//need to generate <div> tags for the html inside the board div with ([column],[row]) coordinates
const board = [];

//need to create column arrays to nest inside board div in html, & to add to a board array to reference later for checking wins using coordinates

for (let i = 0; i < 6; i++) {
  let column = [];
  for (let x = 0; x < 7; x++) {
    //FOR JS ---> creating and adding (column,row) co-ordinate notation for each iteration
    column.push(x.toString() + "," + i.toString());

    //FOR HTML --> create <div> + id="(column,row)"" + class="space" --> append into board div
    let space = document.createElement("div")
    space.id = x.toString() + "," + i.toString();
    space.classList.add("space")

    //Add to board div
    document.getElementById("board").appendChild(space);
  }
  //For JS --> after each full column array is created, we need to add that array to the board array
  board.push(column)
}

//testing that the board has nested arrays inside (used chrome dev tools to check html divs are correct)
console.log("below is a console log of board")
console.log(board)

/*----------------------------------- placing a piece -----------------------------------*/
//need to change a div background color to red or blue
//do this by changing the class to .redPiece or .bluePiece
//alternate between players, so after class is set to red, make the next click set to blue and vice versa

// let space = document.getElementsByClassName("space")

let spaceDiv = document.querySelectorAll(".space") //

console.log("below is a console log of spaceDiv")
console.log(spaceDiv)

spaceDiv.forEach(spaceDiv => {
spaceDiv.addEventListener('click', function(evt) {
  if (playerTurn === playerRed) {
    console.log("red is placed here")
    spaceDiv.classList.add("red-space") 
    playerTurn = playerBlue;
   } else {
    console.log("blue is placed here")
    spaceDiv.classList.add("blue-space")
    playerTurn = playerRed
   }
  })
})

/*----------------------------------- coordinate system to place piece at lowest row available (or return if no space) -----------------------------------*/

//future for???set starting default row position for each column???
//let columnRow = [5,5,5,5,5,5,5]

//idea: extract the ID from each div (to use as coordinates) and create an array

 spaceDiv.forEach(spaceDiv => {
  spaceDiv.addEventListener('click', function(evt) {
    let coord = spaceDiv.id.split(',') //convert div id into array with ["column", "row"]
    console.log(coord)
    })
  })



//eg div id="0-0" will represent (column 0, row 0), like [c,r], and by default, r=5
//so when a column is clicked, the div at the columnRow r value is checked and placed, and then updated

// let c = coord[0]
// let r = coord[1]

//  const playableRow = columnRow[c]

//  console.log(coord)

//  if (playableRow < 1) { // to avoid placing if there if the highest row is full
//   return; //early return if row = 0
//  } else {
//   columnRow.arraymethod to change columnRow[c] to (c -= 1)
//   place piece at new position [c]


//  }

/*----------------------------------- checking for wins -----------------------------------*/


  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/


  /*----- model functions -----*/





/*example board layout from Gab, E = empty, R = red piece, B = blue piece  

board = [
    [E, E, E, E, E],
    [E, E, E, E, E],
    [E, E, E, E, E],
    [E, E, B, E, E],
    [E, R, B, E, E],
]
*/

  /*----- controller functions -----*/

  /*----- view functions -----*/