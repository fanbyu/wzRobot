#pragma once

#include <Arduino.h>

class RgbUltrasonic {
private:
    int ioPin;
    int rgbPin;
    
public:
    RgbUltrasonic(int io, int rgb);
    
    // 超声波测距，返回距离(cm)
    float GetUltrasonicDistance();
    
    // 设置RGB颜色 (R/G/B: 0~255)
    void SetRgbColor(uint8_t r, uint8_t g, uint8_t b);
    
    // 设置灯效 (position: 0=全部 1=左 2=右, color: RGB整数值, effect: 0关闭 1常亮 2呼吸 3闪烁 4流水 5彩虹)
    void SetRgbEffect(int position, unsigned long color, int effect);
    
    // 关闭RGB灯光
    void RgbOff();
};
