function DetectedSensorLeft () {
    // Left when behind the robot (i.e. D3)
    SensorRawLeft = k_Bit.obstacle(MotorObs.LeftSide)
    return !(SensorRawLeft)
}
function ReadSensors () {
    if (DetectedFrontClose()) {
        NewMove = 8
    } else if (DetectedSensorLeft()) {
        NewMove = 7
    } else if (DetectedSensorRight()) {
        NewMove = 9
    } else if (DetectedEgde()) {
        if (LastMove == 7) {
            NewMove = 3
        } else {
            NewMove = 2
        }
    } else {
        NewMove = 5
    }
}
function ReadRemote () {
    RemoteButtonPressed = irRemote.returnIrButton()
    if (RemoteButtonPressed != 0) {
        SerialDebug("THE REMOTE INTERFERES WITH THE")
        SerialDebug(" LEFT/RIGHT SENSOR, AND IS")
        SerialDebug(" NOT ALLOWED")
    }
}
function DetectedSensorRight () {
    // Right when behind the robot (i.e. D8)
    SensorRawRight = k_Bit.obstacle(MotorObs.RightSide)
    return !(SensorRawRight)
}
function DetectedEgde () {
    SensorEdge = k_Bit.LineTracking()
    return !(SensorEdge)
}
// https://github.com/mworkfun/pxt-k-bit.git
function Move () {
    if (LastMove != NewMove) {
        LastMove = NewMove
        if (NewMove == 7) {
            k_Bit.Motor(MotorObs.LeftSide, MotorDir.Forward, MotorSpeed / 2)
            k_Bit.Motor(MotorObs.RightSide, MotorDir.Forward, MotorSpeed)
            basic.showLeds(`
                . # # # #
                . . . # #
                . . # . #
                . # . . #
                # . . . .
                `)
        } else if (NewMove == 8) {
            k_Bit.run(DIR.RunForward, MotorSpeed)
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        } else if (NewMove == 9) {
            k_Bit.Motor(MotorObs.LeftSide, MotorDir.Forward, MotorSpeed)
            k_Bit.Motor(MotorObs.RightSide, MotorDir.Forward, MotorSpeed / 2)
            basic.showLeds(`
                # # # # .
                # # . . .
                # . # . .
                # . . # .
                . . . . #
                `)
        } else if (NewMove == 2) {
            k_Bit.run(DIR.RunBack, MotorSpeed)
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
        } else if (NewMove == 3) {
            k_Bit.Motor(MotorObs.LeftSide, MotorDir.Back, MotorSpeed / 2)
            k_Bit.Motor(MotorObs.RightSide, MotorDir.Back, MotorSpeed)
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
        }
    }
}
function DetectedFrontClose () {
    if (UltrasonicDistance < 30 && UltrasonicDistance > 1) {
        return 1
    } else if (DetectedSensorLeft() && DetectedSensorRight()) {
        return 1
    } else {
        return 0
    }
}
function SerialDebug (text: string) {
    serial.writeLine(text)
}
let UltrasonicDistance = 0
let SensorEdge = 0
let SensorRawRight = 0
let RemoteButtonPressed = 0
let SensorRawLeft = 0
let NewMove = 0
let LastMove = 0
let MotorSpeed = 0
let strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
MotorSpeed = 30
irRemote.connectInfrared(DigitalPin.P16)
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
    ReadRemote()
    ReadSensors()
    Move()
})
control.inBackground(function () {
    while (true) {
        UltrasonicDistance = k_Bit.ultra()
        // SerialDebug("UltrasonicDistance" + UltrasonicDistance)
        basic.pause(200)
    }
})
control.inBackground(function () {
    while (true) {
        basic.pause(111.1)
        strip.rotate(1)
        strip.show()
    }
})
