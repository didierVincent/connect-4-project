## Didier's Game
Connect 4!
Player vs Player
(or Player vs CPU?)

## Description
2 player game
Turn based game
Grid based game

This game called "Connect 4" is a turn-based 2 player game.
This game is played on a 7x6 grid with 7 columns and 6 rows.

Each player takes turns to place a single piece on the grid each, which must be placed only at the lowest available row of each column.
Each piece that has been placed occupies that space in the grid until the game is over.

To win, a player must place 4 pieces next to eachother that align either vertically, horizontally or diagonally against an opponent.
If there are no available spaces left to place pieces, and if neither player has won, the game results in a draw.


## Roadmap
 - [ ] Basic Game


## To Do

- [ ] Create HTML + Board 
- [ ] Setup basic CSS for board properties

# Inject Grid for Board
- [ ] Create JS logic for Grid (42 Spaces for 7x6 Board)
- [ ] Inject JS Grid into HTML for Board

# Setting Legal Moves
- [ ] Set Starting Available Moves 
- [ ] Update Available moves on board
- [ ] Don't allow moves if column is full
- [ ] Game over if no spaces left

# Place Piece
- [ ] Create coordinate system to check which space was clicked in HTML
- [ ] Place Piece only if legal
- [ ] Swap to other player after placing piece

# Check for win
- [ ] Check for win horizontally
- [ ] Check for win vertically
- [ ] Check for win diagonally (one way)
- [ ] Check for win diagonally (other way)

# Game End
- [ ] Win Message - Set a victory message for player that won
- [ ] Draw - Set a draw message for a tie 
- [ ] Add button to Restart Game
- [ ] Restart game button should reset board