function DetectedSensorLeft () {
    SensorRawLeft = k_Bit.obstacle(MotorObs.LeftSide)
    return !(SensorRawLeft)
}
function ReadSensors () {
    if (DetectedFrontClose()) {
        NewMove = 8
    } else if (input.buttonIsPressed(Button.A)) {
        NewMove = 7
    } else if (input.buttonIsPressed(Button.B)) {
        NewMove = 9
    }
}
function DetectedSensorRight () {
    SensorRawRight = k_Bit.obstacle(MotorObs.RightSide)
    return !(SensorRawRight)
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
function DetectedFrontClose () {
    if (input.buttonIsPressed(Button.AB)) {
        return 1
    } else if (UltrasonicDistance < 30) {
        return 1
    } else if (DetectedSensorLeft() && DetectedSensorRight()) {
        return 1
    } else {
        return 0
    }
}
let UltrasonicDistance = 0
let SensorRawRight = 0
let SensorRawLeft = 0
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
control.inBackground(function () {
    while (true) {
        UltrasonicDistance = sonar.ping(
        DigitalPin.P14,
        DigitalPin.P15,
        PingUnit.Centimeters
        )
        basic.pause(200)
    }
})
