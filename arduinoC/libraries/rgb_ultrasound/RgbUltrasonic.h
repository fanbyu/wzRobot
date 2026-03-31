#pragma once

#include <Arduino.h>

class RgbUltrasonic {
private:
    int ioPin;
    int rgbPin;
    
public:
    RgbUltrasonic(int io, int rgb);
    
    void SetRgbEffect(int position, unsigned long color, int effect);
    
    float GetUltrasonicDistance();
};
