import drawDot from './draw.dot.js'
import drawLine from './draw.line.js'

/**
    Class for render dynamics dots on container/body
 */
export default class canvasClass {
    constructor(
        canvas,
        settings = {
            count: 60, 
            color: {
                r: 198,
                g: 63,
                b: 63
            },
            sizes: {
                min: 5,
                max: 10
            }
        }
    ) {
        this.canvas = canvas
        this.settings = settings
        this.createDots = this.createDots.bind(this)
        this.dots = []
    }

    /**
     * Get canvasnith and height from DOM element
     * @private
     * @param {Object} canvas
     * @returns {Boolean}
     */
    getCanvasArea( canvas ) {
        if (canvas.getContext) {
            return true
        }

        return false
    }

    /**
     * Render dots from array
     */
    createDots(){
        const dots = this.dots
        const context = this.canvas.getContext('2d')

        // clear canvas context before draw dots & lines
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        
        // iterate on dots array
        for(var i = 0; i < this.dots.length; i++) {
            const dot = dots[i]
            const color = dot.color
            
            // add some magic - move dot
            this.moveDot(dot)

            // 
            drawDot(context, dot.x, dot.y, color, dot.size)

            // preventing the escape of dots
            this.bounceDirection(dot)
            
            // connect dots
            for(var j = i + 1; j < dots.length; j++){

                drawLine(context, this.settings.color, dots[i], dots[j])

            }
        }

        // let's animation begin
        window.requestAnimationFrame(this.createDots)
    }

    /**
     * Move dot depend of directory
     * @param {Object} dot
     */
    moveDot( dot ) {

        // swipe by 1px
        if( dot.dirX == '+' ) {
            dot.x += 1
        } else {
            dot.x -= 1
        }
        if( dot.dirY == '+' ) {
            dot.y += 1
        } else {
            dot.y -= 1
        }
    }

    /**
     * Bounce dots on container edge to prevent the dot from getting out of the container 
     * @param {Object} dot
     */
    bounceDirection( dot ) {
        const dotX = dot.x
        const dotY = dot.y
        const dotSize = dot.size

        // change dot directory
        if( ( dotX + dotSize ) == window.innerWidth ) {
            dot.dirX = '-'
        }

        if( ( dotX - dotSize ) == 0 ) {
            dot.dirX = '+'
        }

        if( ( dotY + dotSize ) == window.innerHeight ) {
            dot.dirY = '-'
        }

        if( ( dotY - dotSize ) == 0 ) {
            dot.dirY = '+'
        }
    }

    /**
     * Return number from range
     * @private
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    randomFromRange( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1) ) + min
    }

    /**
     * Generate array with dots from settings
     * @param {Object} settings
     */
    generateDotsArray( settings = this.settings ){
        const directories = ['-', '+']

        //render dots from configs
        for (let i = 0; i < settings.count; i++) {

            const coordinate = {
                x: this.randomFromRange(0, window.innerWidth),
                y: this.randomFromRange(0, window.innerHeight),
                size: this.randomFromRange(settings.sizes.min, settings.sizes.max),
                dirX: directories[Math.round(Math.random())],
                dirY: directories[Math.round(Math.random())]
            }
            this.dots.push(coordinate)
        }
    }
}