#include "RgbUltrasonic.h"

RgbUltrasonic::RgbUltrasonic(int io, int rgb) {
    ioPin = io;
    rgbPin = rgb;
    
    pinMode(ioPin, OUTPUT);
    pinMode(rgbPin, OUTPUT);
}

void RgbUltrasonic::SetRgbEffect(int position, unsigned long color, int effect) {
    // RGB LED control implementation
    // position: 0=ALL, 1=LEFT, 2=RIGHT
    // color: RGB color value
    // effect: 0=NONE, 1=BREATHING, 2=ROTATE, 3=FLASH
    
    // TODO: Implement RGB LED control logic
}

float RgbUltrasonic::GetUltrasonicDistance() {
    // Ultrasonic distance measurement
    // Returns distance in cm
    
    digitalWrite(ioPin, LOW);
    delayMicroseconds(2);
    digitalWrite(ioPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(ioPin, LOW);
    
    float duration = pulseIn(ioPin, HIGH);
    float distance = duration * 0.034 / 2.0;
    
    return distance;
}
