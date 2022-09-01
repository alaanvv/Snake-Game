const canvas = document.querySelector('canvas')
let size

size = Math.min(window.innerWidth, window.innerHeight, 500)
size -= size % 100

canvas.width = size
canvas.height = size