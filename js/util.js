'use strict'

// util functions
function startTimer() {
  // if interval already started don't start a new one.
  if (gTimerInterval) return

  // catch the DOM elements
  var elTimer = document.querySelector('.timer')
  var elSeconds = elTimer.querySelector('.seconds')
  var elMinutes = elTimer.querySelector('.minutes')

  // create time vars - model
  var seconds = 0
  var minutes = 0
  gTimerInterval = setInterval(() => {
    seconds++
    if (seconds === 60) {
      minutes++
      seconds = 0
    }
    // render to DOM
    elSeconds.innerText = seconds.toString().padStart(2, '0')
    elMinutes.innerText = minutes.toString().padStart(2, '0')
  }, 1000)
}

function stopTimer() {
  clearInterval(gTimerInterval)
}

function resetTimer() {
  stopTimer()
  gTimerInterval = null

  // catch the DOM elements
  var elTimer = document.querySelector('.timer')
  var elSeconds = elTimer.querySelector('.seconds')
  var elMinutes = elTimer.querySelector('.minutes')
  // create time vars - model
  var seconds = 0
  var minutes = 0

  // render to DOM
  elSeconds.innerText = seconds.toString().padStart(2, '0')
  elMinutes.innerText = minutes.toString().padStart(2, '0')
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function printBoardForDebug(mat) {
  var printedMat = []
  for (var i = 0; i < mat.length; i++) {
    printedMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      var currCell = mat[i][j]
      var cellContent = currCell.isMine ? MINE : currCell.minesAroundCount
      printedMat[i][j] = cellContent
    }
  }
  console.table(printedMat)
}

function findNegsLocation(board, pos) {
  var negsLocation = []
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (pos.i === i && pos.j === j) continue

      negsLocation.push({ i, j })
    }
  }
  return negsLocation
}
