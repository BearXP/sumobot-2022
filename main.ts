function ReadSensors () {
    if (input.buttonIsPressed(Button.AB)) {
        NewMove = 8
    } else if (input.buttonIsPressed(Button.A)) {
        NewMove = 7
    } else if (input.buttonIsPressed(Button.B)) {
        NewMove = 9
    }
}
// https://github.com/mworkfun/pxt-k-bit.git
function Move () {
    if (LastMove == NewMove) {
        LastMove = NewMove
        if (NewMove == 7) {
            basic.showLeds(`
                # # # # .
                # # . . .
                # . # . .
                # . . # .
                . . . . #
                `)
        } else if (NewMove == 8) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        } else if (NewMove == 9) {
            basic.showLeds(`
                . # # # #
                . . . # #
                . . # . #
                . # . . #
                # . . . .
                `)
        }
    }
}
let NewMove = 0
let LastMove = 0
LastMove = 5
NewMove = 5
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    `)
basic.forever(function () {
    ReadSensors()
    Move()
})
