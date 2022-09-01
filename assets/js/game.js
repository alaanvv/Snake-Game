// VARIABLE
const ctx = canvas.getContext('2d')
const cells = []
let cellSize = size / 20
const padding = 5
const objSize = cellSize - padding * 2
let lastDir, dir, row, col, rowF, colF, snake

// FUNCTION
function draw(row, col, obj) {
    x = row * cellSize + padding
    y = col * cellSize + padding

    switch (obj) {
        case '': ctx.fillStyle = 'black'; break
        case 'S': ctx.fillStyle = '#556B2F'; break
        case 'F': ctx.fillStyle = 'red'; break
    }
    ctx.fillRect(x, y, objSize, objSize)
}

function move() {
    lastDir = dir
    switch (dir) {
        case 'R': row++; break
        case 'L': row--; break
        case 'B': col++; break
        case 'T': col--; break
    }
    draw(row, col, 'S')
    snake.push({ row: row, col: col })

    if (cells[row] == undefined || cells[row][col] == undefined) collision = 'S'
    else {
        collision = cells[row][col]
        cells[row][col] = 'S'
    }
    switch (collision) {
        case 'S':
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, size, size)

            alert('YOU LOOSE')
            clearInterval(frame)
            start()
            break
        case 'F':
            spawnFruit()
            break
        case '':
            part = snake.shift()
            cells[part.row][part.col] = ''
            draw(part.row, part.col, '')
            break
    }
}

function spawnFruit() {
    rowF = Math.floor(Math.random() * cells.length)
    colF = Math.floor(Math.random() * cells.length)
    pos = cells[rowF][colF]

    if (pos != '') return spawnFruit()

    cells[rowF][colF] = 'F'
    draw(rowF, colF, 'F')
}

function frameRequester() {
    frame = setInterval(e => {
        move()
    }, 250)
}

function start() {
    lastDir = 'R'
    dir = 'R'
    row = 9
    col = 9
    snake = [{ row: 9, col: 9 }]

    for (let row = 0; row < 20; row++) {
        cells[row] = []
        for (let column = 0; column < 20; column++) { cells[row][column] = '' }
    }

    frameRequester()
    spawnFruit()
}

// EVENT LISTENER
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'a': if (lastDir != 'R') dir = 'L'; break
        case 'd': if (lastDir != 'L') dir = 'R'; break
        case 's': if (lastDir != 'T') dir = 'B'; break
        case 'w': if (lastDir != 'B') dir = 'T'; break
    }
})

// MISC
start()
