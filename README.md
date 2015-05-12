# Bughouse Chess
##Softdev Term 2 Final Project - Bughouse Chess Client
* Barak Zhou, Albert Yeung, Jason Lu

- [x] Chess engine
  - [x] Minor pieces
  - [x] Player
  - [x] Board init
  - [x] Piece and board interaction
  - [ ] King, check, and endgame
  - [ ] Dropping pieces
- [ ] Set up node.js server
- [x] Chessboard - 75%
  - [x] Board
  - [x] Highlight square + coordinates
  - [ ] Setup
  - [ ] Working 2v2 site
  - [ ] Multiple rooms

## Description
* Bughouse chess is a chess variation that involves four players in teams of two and two boards.
* Each board uses algebraic notation, with capitalization to distinguish between the boards.
* The game ends in a "one for all" fashion, as one player loses for the team.
* The losing player can lose by getting checkmated, dropping the King, or flagging (running out of time on the clock).
* Each board runs like a separate game, except when piece capturing occurs.
* If a piece is captured, ownership of that piece passes to the capturer's partner, who can spend the turn to drop that piece on any empty square in lieu of a regular move.
* Pawns cannot be dropped on the 1st and 8th ranks.
* If a promoted pawn is captured, it reverts into a pawn.

## Usage and Features
* TBD!!!!!
* On the main site, there will be many rooms. Each room will have four slots for players to join.
* The game can start when four players fill up a room.
* All game data is stored on an external database.
