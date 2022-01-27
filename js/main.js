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
  liveCount: 3,
  isHint: false,
  hintCount: 3,
}
var gIsFirstClick = false

var MINE = '💣'
var FLAG = '🚩'

function initGame() {
  resetTimer()
  gIsFirstClick = false
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    liveCount: 3,
    isHint: false,
    hintCount: 3,
  }
  gBoard = buildBoard()
  printBoardForDebug(gBoard)
  renderLives()
  renderHints()
  renderBoard()
  var elSmiley = document.querySelector('.stats .smiley')
  elSmiley.innerText = '😀'
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
  // var emptyPlaces = getEmptyPlaces(mat)
  // setMinesAtRandomLocation(mat, emptyPlaces)
  // done: call setMinesNegsCount()
  // setMinesNegsCount(mat)
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
  checkFirstClick({ i, j })
  if (gGame.isHint) {
    checkHintClick({ i, j })
    return
  }

  if (!gGame.isOn) return
  // update the model:
  var cell = gBoard[i][j]
  if (cell.isMarked) return
  if (cell.isShown) return

  // update the DOM:
  if (!cell.isMine) {
    expandShown(gBoard, i, j)
    checkGameOver()
  } else if (cell.isMine) {
    var elSmiley = document.querySelector('.stats .smiley')
    elSmiley.innerText = '😖'
    cell.isShown = true
    gGame.liveCount--
    renderLives()
    renderCell(elCell, cell)
    checkGameOver()
    if (gGame.isOn) {
      setTimeout(function () {
        // var elSmiley = document.querySelector('.stats .smiley')
        elSmiley.innerText = '😀'
      }, 400)
    }
  }
}

function expandShown(board, i, j) {
  // done: when user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
  // done: try recursion
  var elCell = getCellByClass({ i, j })
  var pos = { i, j }
  var cell = board[i][j]
  cell.isShown = true
  renderCell(elCell, cell)

  if (cell.minesAroundCount > 0) {
    return
  }

  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (pos.i === i && pos.j === j) continue

      var currCell = board[i][j]

      if (!currCell.isMine && !currCell.isMarked && currCell.minesAroundCount === 0 && !currCell.isShown) {
        expandShown(board, i, j)
      } else if (!currCell.isMine && !currCell.isMarked && currCell.minesAroundCount > 0 && !currCell.isShown) {
        currCell.isShown = true
        var elCell = getCellByClass({ i, j })
        renderCell(elCell, currCell)
      }
    }
  }
}

function cellMarked(elCell, i, j) {
  // done: called on right click to mark a cell (suspected to be a mine)
  checkFirstClick({ i, j })
  var location = { i, j }
  // update the model
  var cell = gBoard[location.i][location.j]
  cell.isMarked = !cell.isMarked

  // update the DOM
  elCell.innerText = cell.isMarked ? FLAG : null
  if (elCell.classList.contains('danger')) elCell.classList.remove('danger')
  elCell.classList.toggle('success')
  checkGameOver()
}

function checkGameOver() {
  // done: game ends when all mines are marked, and all the other cells are shown
  if (!gGame.liveCount) {
    gGame.isOn = false
    stopTimer()
    revealAllMines()
    openAlert(false, 'Oof. You lost!')
    renderSmiley(false)
    return
  }

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currCell = gBoard[i][j]
      if (currCell.isMine && !currCell.isMarked) {
        return
      }
      if (!currCell.isShown && !currCell.isMine) {
        return
      }
    }
  }

  gGame.isOn = false
  stopTimer()
  openAlert(true, 'You won the game!')
  renderSmiley(true)
  return true
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

function setMinesAtRandomLocation(mat, locations, pos) {
  var copyLocations = JSON.parse(JSON.stringify(locations))
  var negsLocation = findNegsLocation(gBoard, pos)

  // clean negs location:
  for (var i = 0; i < negsLocation.length; i++) {
    var currNeg = negsLocation[i]
    for (var j = 0; j < copyLocations.length; j++) {
      var currLoc = copyLocations[j]
      if (currNeg.i === currLoc.i && currNeg.j === currLoc.j) copyLocations.splice(j, 1)
    }
  }
  shuffleArray(copyLocations)

  var minesCount = 0
  while (minesCount < gLevel.MINES) {
    var randomLocation = copyLocations.pop()
    if (randomLocation.i === pos.i && randomLocation.j === pos.j) continue
    mat[randomLocation.i][randomLocation.j].isMine = true
    minesCount++
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
  if (cell.isMine) {
    elCell.innerText = MINE
    elCell.classList.add('danger')
  } else {
    elCell.innerText = cell.minesAroundCount ? cell.minesAroundCount : ''
    elCell.classList.add('success')
  }
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

function revealAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var pos = { i, j }
      var currCell = gBoard[i][j]
      var elCell = getCellByClass(pos)
      if (currCell.isMine) renderCell(elCell, currCell)
    }
  }
}

function renderLives() {
  var strHTML = `<span class="heart">❤</span>`.repeat(gGame.liveCount)
  strHTML += `<span class="death">❤</span>`.repeat(3 - gGame.liveCount)
  document.querySelector('.stats .lives').innerHTML = strHTML
}

function renderHints() {
  var strHTML = `<span class="hint">💡</span>`.repeat(gGame.hintCount)
  strHTML += `<span class="hint">❌</span>`.repeat(3 - gGame.hintCount)
  document.querySelector('.hints').innerHTML = strHTML
}

function openAlert(isWin, msg = '') {
  var elAlert = document.querySelector('.alert')
  elAlert.querySelector('.msg').innerText = msg
  elAlert.style.backgroundColor = isWin ? 'var(--success)' : 'var(--danger)'
  elAlert.classList.toggle('active')
  setTimeout(closeAlert, 3000)
}

function closeAlert() {
  document.querySelector('.alert').classList.remove('active')
}

function checkFirstClick(pos) {
  if (!gIsFirstClick) {
    gIsFirstClick = true
    gGame.isOn = true
    // set mines:
    var emptyPlaces = getEmptyPlaces(gBoard)
    setMinesAtRandomLocation(gBoard, emptyPlaces, pos)
    setMinesNegsCount(gBoard)
    printBoardForDebug(gBoard)
    startTimer()
  }
}

function renderSmiley(isWin) {
  var elSmiley = document.querySelector('.stats .smiley')
  elSmiley.innerText = isWin ? '😎' : '🤯'
}

function toggleHintMode() {
  gGame.isHint = !gGame.isHint
}

function checkHintClick(pos) {
  gGame.isHint = false
  if (!gGame.hintCount) {
    openAlert(false, 'You used all your hints!')
    return
  }
  gGame.hintCount--
  renderHints()
  var negsLocation = findNegsLocation(gBoard, pos)
  negsLocation.push(pos)

  for (var i = 0; i < negsLocation.length; i++) {
    var currLoc = negsLocation[i]
    // model
    var cell = gBoard[currLoc.i][currLoc.j]
    // update DOM
    var elCell = getCellByClass({ i: currLoc.i, j: currLoc.j })
    elCell.classList.toggle('active-hint')
    // renderCell(elCell, cell)
    if (cell.isMine && !cell.isMarked) {
      elCell.innerText = '💣'
    } else if (cell.minesAroundCount > 0 && !cell.isMarked) {
      elCell.innerText = cell.minesAroundCount
    } else if (cell.minesAroundCount === 0 && !cell.isMarked) {
      elCell.innerText = ''
    } else if (cell.isMarked) {
      elCell.innerText = '🚩'
    }
  }

  setTimeout(() => {
    for (var i = 0; i < negsLocation.length; i++) {
      var currLoc = negsLocation[i]
      // model
      var cell = gBoard[currLoc.i][currLoc.j]
      // update DOM
      var elCell = getCellByClass({ i: currLoc.i, j: currLoc.j })

      if (!cell.isShown && !cell.isMarked) {
        elCell.classList.remove('active-hint')
        elCell.innerText = ''
      }
    }
  }, 1000)
}
