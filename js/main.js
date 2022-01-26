'use strict'

// globals
var gTimerInterval
var gBoard
var gLevel = {
  SIZE: 4,
  MINES: 2,
}
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}
var gIsFirstClick = false

var MINE = '💣'
var FLAG = '🚩'

function initGame() {
  console.log('starting app...')
  resetTimer()
  gIsFirstClick = false
  gBoard = buildBoard()
  printBoardForDebug(gBoard)
  console.log('gBoard', gBoard)
  renderBoard()
}

function buildBoard() {
  // done: build the board
  var mat = []
  for (var i = 0; i < gLevel.SIZE; i++) {
    mat[i] = []
    for (var j = 0; j < gLevel.SIZE; j++) {
      mat[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  // done: set mines at random locations
  var emptyPlaces = getEmptyPlaces(mat)
  setMinesAtRandomLocation(mat, emptyPlaces)
  // done: call setMinesNegsCount()
  setMinesNegsCount(mat)
  // done: return the created board
  return mat
}

function setMinesNegsCount(board) {
  // done: count mines around each cell and set the cell's minesAroundCount property.
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      currCell.minesAroundCount = countNearMines(board, { i, j })
    }
  }
}

function renderBoard() {
  // done: render the board as a <table> to the page
  var strHTML = ``
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += `<tr>\n`
    for (var j = 0; j < gBoard.length; j++) {
      var currCell = gBoard[i][j]
      // var cellContent = currCell.isMine ? MINE : currCell.isShown ? currCell.minesAroundCount : ''
      var cellContent = currCell.isShown ? (currCell.isMine ? MINE : currCell.minesAroundCount) : ''
      strHTML += `\t<td class="cell-${i}-${j}" oncontextmenu="cellMarked(this, ${i}, ${j}); return false;" onclick="cellClicked(this, ${i}, ${j})">${cellContent}</td>\n`
    }
    strHTML += `</tr>\n`
  }

  var elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
  // done: called when a cell (td) is clicked
  if (!gIsFirstClick) {
    console.log('first click!!!')
    gIsFirstClick = true
    startTimer()
  }
  // update the model:
  var cell = gBoard[i][j]
  if (cell.isMarked) return
  cell.isShown = true
  // update the DOM:

  if (!cell.isMine && !cell.isMarked) expandShown(gBoard, elCell, i, j)
  else console.log('mine')
}

function cellMarked(elCell, i, j) {
  // done: called on right click to mark a cell (suspected to be a mine)
  var location = { i, j }
  // update the model
  var cell = gBoard[location.i][location.j]
  cell.isMarked = !cell.isMarked

  // update the DOM
  elCell.innerText = cell.isMarked ? FLAG : null
}

function checkGameOver() {
  // todo: game ends when all mines are marked, and all the other cells are shown
}

function expandShown(board, elCell, i, j) {
  // done: when user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
  // todo: try recursion
  var pos = { i, j }
  var clickedCell = board[i][j]
  var cellsLocationToShow = [{ i, j }]
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (pos.i === i && pos.j === j) continue
      var cell = board[i][j]
      cell.isShown = true
      if (!cell.isMine && !cell.isMarked && !clickedCell.minesAroundCount) cellsLocationToShow.push({ i, j })
    }
  }

  for (var i = 0; i < cellsLocationToShow.length; i++) {
    var pos = cellsLocationToShow[i]
    var currCell = board[pos.i][pos.j]
    var elCurrCell = getCellByClass(pos)
    renderCell(elCurrCell, currCell)
  }
}

function getEmptyPlaces(mat) {
  var emptyPlaces = []
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      var currCell = mat[i][j]
      var cellLocation = { i, j }
      if (!currCell.isMine) emptyPlaces.push(cellLocation)
    }
  }
  return emptyPlaces
}

function setMinesAtRandomLocation(mat, locations) {
  var copyLocations = JSON.parse(JSON.stringify(locations))
  shuffleArray(copyLocations)

  for (var i = 0; i < gLevel.MINES; i++) {
    var randomLocation = copyLocations.pop()
    mat[randomLocation.i][randomLocation.j].isMine = true
  }
}

function countNearMines(mat, pos) {
  var count = 0
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= mat[0].length) continue
      if (pos.i === i && pos.j === j) continue
      var cell = mat[i][j]
      if (cell.isMine) {
        count++
      }
    }
  }
  return count
}

function renderCell(elCell, cell) {
  // elCell.innerText = cell.isMarked ? FLAG : null
  elCell.innerText = cell.minesAroundCount
}

function getCellByClass(pos) {
  var elCell = document.querySelector(`.cell-${pos.i}-${pos.j}`)
  return elCell
}

function setLevel(size) {
  switch (size) {
    case 4:
      gLevel.SIZE = 4
      gLevel.MINES = 2
      break
    case 8:
      gLevel.SIZE = 8
      gLevel.MINES = 12
      break
    case 12:
      gLevel.SIZE = 12
      gLevel.MINES = 30
    default:
      break
  }
  initGame()
}
