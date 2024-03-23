console.log("js is linked")

  /*----- constants -----*/

/*----- default settings -----*/

//declare players with Red and Blue
const playerOne = "Red"
const playerTwo = "Blue"

//set starting default player to player one
const playerTurn = playerOne

  /*----- creating the grid using JS, and storing coordinate data -----*/

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
console.log(board)


  /*----- checking for wins -----*/

//future for???set starting default row position for each column???
const columnRow = [5,5,5,5,5,5,5]

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