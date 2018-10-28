
import renderCanvas from './render.canvas.js'

const canvas = document.querySelector('#js-canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

renderCanvas(canvas)