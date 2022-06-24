function DetectedSensorLeft () {
    SensorRawLeft = k_Bit.obstacle(MotorObs.LeftSide)
    return !(SensorRawLeft)
}
function DetectedSensorRight() {
    SensorRawRight = k_Bit.obstacle(MotorObs.RightSide)
    return !(SensorRawRight)
}
function ReadSensors () {
    if (DetectedFrontClose()) {
        NewMove = 8
    } else if (DetectedSensorLeft()) {
        NewMove = 7
    } else if (DetectedSensorRight()) {
        NewMove = 9
    } else if (DetectedEgde()) {
        NewMove = 2
    } else {
        NewMove = 5
    }
}
function ReadRemote () {
    RemoteButtonPressed = irRemote.returnIrButton()
    if (RemoteButtonPressed != 0) {
        SerialDebug("    > REMOTE " + RemoteButtonPressed)
    }
    if (irRemote.irButton(IrButton.Up) == 1) {
        UltrasonicDistance = 8
    }
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
            k_Bit.Motor(MotorObs.LeftSide, MotorDir.Forward, MotorSpeed)
            k_Bit.Motor(MotorObs.RightSide, MotorDir.Forward, 0)
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
            k_Bit.Motor(MotorObs.LeftSide, MotorDir.Forward, 0)
            k_Bit.Motor(MotorObs.RightSide, MotorDir.Forward, MotorSpeed)
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
let SensorEdge = 0
let SensorRawRight = 0
let UltrasonicDistance = 0
let RemoteButtonPressed = 0
let SensorRawLeft = 0
let NewMove = 0
let LastMove = 0
let MotorSpeed = 0
MotorSpeed = 30
irRemote.connectInfrared(DigitalPin.P1)
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
