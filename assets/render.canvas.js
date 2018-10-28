
import renderCanvas from './utility/canvas.class.js'

const render = ( canvas ) => {

    const partiples = new renderCanvas(canvas)
    console.log(partiples.getCanvasArea(canvas));
    
    if (partiples.getCanvasArea(canvas)) {

        /** generate dots with array, you can pass settings to customize appearance
            eg. settings:

            settings = {
                count: 60, // dots number
                color: { // color in rgb
                    r: 198,
                    g: 63,
                    b: 63
                },
                sizes: { // dot range size
                    min: 5,
                    max: 10
                }
            }
        */
        partiples.generateDotsArray()

        // timeout for perfomance reasults - it eliminate "starting lag"
        setTimeout(() => {

            window.requestAnimationFrame(() => {
                partiples.createDots()
            })
        }, 1000)
    }
}

export default ( canvas ) => {

    render( canvas )
}