#ifndef _RGBULTRASONIC_H_
#define _RGBULTRASONIC_H_

/* Includes ------------------------------------------------------------------*/
#include <Arduino.h>
#include "RGBLed.h"

#define UL_LIMIT_MIN 5
#define UL_LIMIT_MID 10
#define UL_LIMIT_MAX 400

class RgbUltrasonic
{
  private:
    byte SignalPin, RgbPin, ServoPin;
    uint8_t ServoBaseDegree;
    uint16_t FrontDistance;
    uint16_t RightDistance;
    uint16_t LeftDistance;
    
    long _lastEnterTime;
    bool _measureFlag;
    
  public:
    RGBLed *mRgb;
	RgbUltrasonic(byte signal_pin, byte rgb_pin);
    RgbUltrasonic(byte signal_pin, byte rgb_pin, byte servo_pin);
    void ServoPIN(byte servo_pin);   
    uint16_t GetUltrasonicFrontDistance();
    uint16_t GetUltrasonicLeftDistance();
    uint16_t GetUltrasonicRightDistance();
    void SetServoBaseDegree(uint8_t base);
    void SetServoDegree(int degree);
    uint16_t GetUltrasonicDistance(void);
    void SetRgbColor(E_RGB_INDEX index, long Color);
    void SetRgbIndexColor(int start_index, int end_index, long Color);
    void SetRgbEffect(E_RGB_INDEX index, long Color, uint8_t effect = E_EFFECT_NONE);
	void SetRgbEffect(E_RGB_INDEX index, long Color_R, long Color_G, long Color_B, uint8_t effect = E_EFFECT_NONE);
};
#endif
