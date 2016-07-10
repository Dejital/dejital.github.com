'use strict';

function puzzle() {

  var board = [];
  var pieces = [];
  var selectedPiece = '';
  var undoHistory = [];
  var frustrationCounter = 0;

  var boardContainer = document.querySelector('.game-board');
  var piecesContainer = document.querySelector('.game-pieces');
  var undoButton = document.querySelector('.undo-button');
  var instructions = document.querySelector('.instructions');

  var instructionsTexts = [
    'Select a loose piece &#8593;',
    '&#8593; Place it on the game board',
    'Same color pieces cannot touch <br> (vertically, horizontally or diagonally)',
    'Complete the puzzle by filling the entire board',
    'Good luck! Keep going.',
    '&nbsp;'
  ];
  var instructionsPhase = 0;

  var colors = ['#4CB648', '#0C9CEE', '#FDEA2E', '#9A47CB', '#DA1212'];

  var defaultBoardConfiguration = [4,2,4,1,3,1,3,0,2,0,2,1,1,4,3,0];
  var defaultPiecesDistribution = [3,3,3,4,3];
  var dimension = 4;

  function setupBoard(configuration, dimension) {

    instructionsPhase = -1;
    incrementInstructions();

    boardContainer.innerHTML = '';
    var id = 0;

    for (var y = 0; y < dimension; y++) {
      var row = [];
      for (var x = 0; x < dimension; x++) {

        var type = configuration[id];
        var color = colors[type];

        var spot = document.createElement('span');
        spot.className = 'spot';
        spot.setAttribute('x', x);
        spot.setAttribute('y', y);
        spot.setAttribute('isOpen', true);
        spot.setAttribute('startingType', type);
        spot.setAttribute('type', type);
        spot.setAttribute('style', 'background:' + color);

        spot.onclick = function () {
          var isOpen = this.getAttribute('isOpen');
          var x = parseInt(this.getAttribute('x'));
          var y = parseInt(this.getAttribute('y'));
          if (canPlacePiece(x,y)){
            if (instructionsPhase > 1){
              incrementInstructions();
            }

            selectedPiece.className = 'piece-hidden';
            selectedPiece.setAttribute('isPlaced', true);

            var type = selectedPiece.getAttribute('type');
            var color = colors[type];
            this.setAttribute('isOpen', false);
            this.setAttribute('type', type);
            this.setAttribute('style', 'background:' + color);
            this.className += ' spot-on';

            undoHistory.push([selectedPiece, this]);

            if (undoHistory.length === dimension * dimension)
              instructions.innerHTML = 'Congratulations, the puzzle is solved!';

            frustrationCounter = 0;
            selectedPiece = '';
            resetPieces();
          }
          else {
            frustrationCounter++;
            if (instructionsPhase > 2)
              instructions.innerHTML = instructionsTexts[2];
            if (frustrationCounter > 15)
              instructions.innerHTML = 'Stuck? Try a Reset.'
          }
          if (instructionsPhase === 1){
            incrementInstructions();
          }
        };

        if (x === 0){
          spot.className += ' spot-clear';
        }

        row.push(spot);
        boardContainer.appendChild(spot);
        id++;
      }
      board.push(row);
    }

  }

  function resetPieces() {
    for (var i = 0; i < pieces.length; i++){
      var piece = pieces[i];
      var isPlaced = piece.getAttribute('isPlaced');
      if (isPlaced === 'false'){
        piece.className = 'piece';
      }
    }
  }

  function incrementInstructions() {
    instructionsPhase++;
    if (instructionsPhase > 5)
      instructionsPhase = 5;
    instructions.innerHTML = instructionsTexts[instructionsPhase];
  }

  function setupPieces(distribution) {

    piecesContainer.innerHTML = '';

    for (var i = 0; i < distribution.length; i++) {
      while (distribution[i] > 0){

        var piece = document.createElement('span');
        piece.className = 'piece';
        piece.setAttribute('isPlaced', false);
        piece.setAttribute('type', i);
        piece.setAttribute('style', 'background:' + colors[i]);

        piece.onclick = function () {
          resetPieces();
          if (instructionsPhase === 0){
            incrementInstructions(instructionsPhase);
          }
          if (selectedPiece === this) {
              this.className = 'piece';
              selectedPiece = null;
          }
          else {
              resetPieces();
              this.className = 'piece piece-selected';
              selectedPiece = this;
          }
        };

        pieces.push(piece);
        piecesContainer.appendChild(piece);
        distribution[i]--;
      }
    }

  }

  function canPlacePiece(x, y) {
    if (!selectedPiece)
      return false;

    var spot = board[y][x];
    if (spot.getAttribute('isOpen') === 'false')
      return false;

    var type = selectedPiece.getAttribute('type');
    var length = board.length;
    if (spot.getAttribute('type') === type)
      return false;
    if (y > 0 && board[y-1][x].getAttribute('type') === type)
      return false;
    if (y < length-1 && board[y+1][x].getAttribute('type') === type)
      return false;
    if (x > 0 && board[y][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && board[y][x+1].getAttribute('type') === type)
      return false;
    if (x > 0 && y > 0 && board[y-1][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && y > 0 && board[y-1][x+1].getAttribute('type') === type)
      return false;
    if (x > 0 && y < length-1 && board[y+1][x-1].getAttribute('type') === type)
      return false;
    if (x < length-1 && y < length-1 && board[y+1][x+1].getAttribute('type') === type)
      return false;

    return true;
  }

  function undo() {

    var historyLength = undoHistory.length;
    if (historyLength > 0){

      var step = undoHistory[historyLength - 1];
      var piece = step[0];
      var spot = step[1];
      var type = spot.getAttribute('startingType');
      var color = colors[type];

      piece.className = 'piece';
      piece.setAttribute('isPlaced', false);

      spot.className = 'spot';
      spot.setAttribute('isOpen', true);
      spot.setAttribute('type', type);
      spot.setAttribute('style', 'background:' + color);

      selectedPiece = '';
      resetPieces();

      undoHistory.splice(historyLength - 1, 1);

    }

  }

  setupBoard(defaultBoardConfiguration, dimension);
  setupPieces(defaultPiecesDistribution);
  undoButton.onclick = undo;

}
