#include "RgbUltrasonic.h"

RgbUltrasonic::RgbUltrasonic(int io, int rgb) {
    ioPin = io;
    rgbPin = rgb;
    
    pinMode(ioPin, OUTPUT);
    pinMode(rgbPin, OUTPUT);
    digitalWrite(rgbPin, LOW); // 默认关闭
}

void RgbUltrasonic::SetRgbColor(uint8_t r, uint8_t g, uint8_t b) {
    // 使用 SetRgbEffect 设置全部灯为指定颜色常亮
    unsigned long color = ((unsigned long)r << 16) | ((unsigned long)g << 8) | (unsigned long)b;
    SetRgbEffect(0, color, 1); // position=0(全部), effect=1(常亮)
}

void RgbUltrasonic::SetRgbEffect(int position, unsigned long color, int effect) {
    if (effect == 0) { // 关闭
        RgbOff();
        return;
    }
    
    // TODO: 完整实现RGB LED控制逻辑
    // position: 0=ALL, 1=LEFT, 2=RIGHT
    // color: RGB packed value
    // effect: 1=BREATHING 2=FLASH 3=FLOW 4=RAINBOW
    
    if (effect == 1) { // 常亮
        analogWrite(rgbPin, (color >> 16) & 0xFF); // 简化：只取R通道亮度
    } else if (effect == 3) { // 闪烁
        digitalWrite(rgbPin, !digitalRead(rgbPin));
    }
    // 其他效果待完善
}

void RgbUltrasonic::RgbOff() {
    digitalWrite(rgbPin, LOW);
}

float RgbUltrasonic::GetUltrasonicDistance() {
    digitalWrite(ioPin, LOW);
    delayMicroseconds(2);
    digitalWrite(ioPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(ioPin, LOW);
    
    float duration = pulseIn(ioPin, HIGH);
    float distance = duration * 0.034 / 2.0;
    
    return distance;
}
