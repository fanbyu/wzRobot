#pragma once

#include <Wire.h>
#include <stdint.h>

#define INFRARED_I2C_ADDR 0x50

class InfraredTracking {
public:
  static constexpr uint8_t kChannelCount = 5;

  /**
   * @brief 构造函数
   * @param addr I2C地址，默认0x50
   */
  explicit InfraredTracking(uint8_t addr = INFRARED_I2C_ADDR) : _addr(addr) {}

  /**
   * @brief 初始化模块
   */
  void Init() {
    Wire.begin();
  }

  /**
   * @brief 设置灵敏度
   * @param sensitivity 灵敏度值(0~1000)
   */
  void Sensitivity(uint16_t sensitivity) {
    Wire.beginTransmission(_addr);
    Wire.write(0x10);
    Wire.write(sensitivity & 0xFF);
    Wire.write((sensitivity >> 8) & 0xFF);
    Wire.endTransmission();
  }

  /**
   * @brief 读取原始数据，更新所有通道模拟值
   */
  void GetRawDat() {
    Wire.requestFrom(_addr, (uint8_t)(kChannelCount * 2));
    for (uint8_t i = 0; i < kChannelCount; i++) {
      ir_track[i + 1] = (Wire.read() << 8) | Wire.read();
    }
  }

  /**
   * @brief 获取所有通道的数字状态（位掩码）
   * @return 5位状态值，bit0=CH1, bit1=CH2, ...bit4=CH5
   */
  uint8_t GetState() {
    GetRawDat();
    // 高于阈值=白线(1)，低于阈值=黑线(0)
    // 简单实现：中间值500作为默认阈值
    uint8_t state = 0;
    for (uint8_t i = 0; i < kChannelCount; i++) {
      if (ir_track[i + 1] > 500) {
        state |= (1 << i);
      }
    }
    return state;
  }

  /**
   * @brief 各通道模拟值
   */
  uint16_t ir_track[6]; // index 1~5
};

