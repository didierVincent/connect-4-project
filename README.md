## Didier's Game - Unit 1 Project

Connect 4!
Player vs Player

## Description & Game Rules

- 2 player game
- Turn based game
- Grid based game (Board)

- This game called "Connect 4". It's a turn-based 2 player game.
- This game is played on a 7x6 grid with 7 columns and 6 rows.

- Each player takes turns to place a single piece on the grid each, which must be placed only at the lowest available row of each column.
- Each piece that has been placed occupies that space in the grid until the game is over.

- To win, a player must place 4 pieces next to eachother that align either vertically, horizontally or diagonally against an opponent.
  If there are no available spaces left to place pieces, and if neither player has won, the game results in a draw.

## Wireframe

![alt text](docs/wireframe/wire-frame-overview.png)
![alt text](docs/wireframe/wire-frame-1-main-menu.png)
![alt text](docs/wireframe/wire-frame-2-how-to-play.png)
![alt text](docs/wireframe/wire-frame-3-game-UI.png)
![alt text](docs/wireframe/wire-frame-4-example-win.png)

## Roadmap

- [ ] Basic Game (excluding diagonal wins, main menu page & how to play page)
- [ ] Adding Diagonal Wins
- [ ] Adding Main Menu & How to play page

## Stories (in order of priority)

- As a user, I want a 7x6 board that can be played on.
- As a user, I only want to make legal moves in order to play the game properly.
- (Making sure every piece falls to the lowest available row of each column if there is space.)
- As a user, I want the game to end when someone has won.
- As a user, I want to visually know when it's my turn.

## Optional Stories (in order of priority)

- As a user, I want to be able to restart after the game is over.
- As a user, I want to be able to go back to the main menu if I want to quit or see instructions on how to play.
- As a user, I want instructions on how to play before playing.
- As a user, I want a victory message and crown when when I win! And a lose message as well.

# To Do

### Figure out!

- [x] Rewrite code and separate Model Functions with View Functions
- [x] Create Objects to store data for spaces (instead of arrays)
- [ ] (?) Use JS Classes to create a dictionary for each space?

- [ ] Model Functions - Come up with pseudocode

### Basic Setup - View

- [x] Create HTML + Board
- [x] Inject Divs with classes/id's using JS
- [x] Basic Flexbox layout for features under Board
- [ ] Features - Finalise display for Features under Board (Game Messages/Player Turn/Win or Loss Image)
- [x] Setup basic CSS for board properties

### Optional Setup

- [ ] (Optional) Create 'Main Menu' Page
- [ ] (Optional) Create 'How To Play' Page
- [ ] (Optional) Access to Main Menu while Game is running

### Inject Grid for Board - Model

- [x] Inject JS Grid into HTML for Board
- [x] Create Board Array with coordinates set to (column,row)
- [x] Create Object database for spaces (column + row properties)

### View - Place Piece

- [x] On click, change empty space to red or blue then swap to other player
- [x] On click, only change color of the space in the lowest row of the column, if no space in column, return
- [x] Derive coordinates (from set id values) from clicks
- [x] Place Piece only if legal
- [x] Swap to other player after placing piece

### Model - Setting Legal Moves

- [x] Set Starting Available Moves
- [x] Update Available moves on board
- [x] Don't allow moves if column is full

### Check for win

- [ ] Check for win horizontally
- [ ] Check for win vertically
- [ ] (optional) Check for win diagonally (one way)
- [ ] (optional) Check for win diagonally (other way)

### Game End

- [ ] Game over if no spaces left - Game over message
- [ ] Win Message - Set a victory message for player that won
- [ ] Win/Loss Image - Display a win or loss image for both players
- [ ] Draw - Set a draw message for a tie
- [ ] (Optional) Add button to Restart Game
- [ ] (Optional) 'Play Again' button should reset board and start game again
- [ ] (Optional) Feature: Visual Indicator for when its player 1 or player 2's turn
- [ ] (Optional) Create a Line through winning pieces or Highlight pieces with thick outline

### Things to refactor

- [ ] Scope: Make sure things are declared in the right scope
- [ ] Try remove repetitive code
- [ ] Try simplify code

### Things to debug

- [ ] Error: Doesn't place piece if click is executed inbetween the circle divs
