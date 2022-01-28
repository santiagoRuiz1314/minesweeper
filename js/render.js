'use strict'

function renderBoard() {
  // done: render the board as a <table> to the page
  var strHTML = ``
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += `<tr>\n`
    for (var j = 0; j < gBoard.length; j++) {
      var currCell = gBoard[i][j]
      var cellContent = currCell.isShown ? (currCell.isMine ? MINE : currCell.minesAroundCount) : ''
      strHTML += `\t<td class="cell-${i}-${j}" oncontextmenu="cellMarked(this, ${i}, ${j}); return false;" onclick="cellClicked(this, ${i}, ${j})">${cellContent}</td>\n`
    }
    strHTML += `</tr>\n`
  }

  var elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
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

function renderSmiley(isWin) {
  var elSmiley = document.querySelector('.control-panel .smiley')
  elSmiley.innerText = isWin ? '😎' : '🤯'
}

function renderLives() {
  var strHTML = `<span class="heart">❤</span>`.repeat(gGame.liveCount)
  strHTML += `<span class="death">❤</span>`.repeat(3 - gGame.liveCount)
  document.querySelector('.control-panel .lives').innerHTML = strHTML
}

function renderHints() {
  var strHTML = `<span class="hint">💡</span>`.repeat(gGame.hintCount)
  strHTML += `<span class="hint">❌</span>`.repeat(3 - gGame.hintCount)
  document.querySelector('.hints').innerHTML = strHTML
}

function renderSafeClicks() {
  var strHTML = `<span class="safe-click">⭐</span>`.repeat(gGame.safeClickCount)
  strHTML += `<span class="safe-click">❌</span>`.repeat(3 - gGame.safeClickCount)
  document.querySelector('.safe-clicks').innerHTML = strHTML
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
