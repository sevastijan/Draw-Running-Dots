/**
 * Calculate length between two dots 
 * @param {Object} firstDot
 * @param {Object} secondDot
 * @returns {Number}
 */
const distanceBetweenDots = ( firstDot, secondDot ) => {
    let xs = secondDot.x - firstDot.x
    xs = xs * xs

    let ys = secondDot.y - firstDot.y
    ys = ys * ys

    return Math.sqrt( xs + ys )
}

export default function( context, color, firstDot, secondDot ) {  

    // Calculate line opacity
    const distance = distanceBetweenDots(firstDot, secondDot)
    const opacity = 1 - (distance) / (100 * window.devicePixelRatio)

    // Create path
    context.strokeStyle = `rgba(${color.r},${color.g},${color.b},${opacity}`
    context.beginPath()
    context.moveTo(firstDot.x, firstDot.y)
    context.lineTo(secondDot.x, secondDot.y)
    context.stroke()
    context.closePath()
}