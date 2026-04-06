#pragma once

#include <Wire.h>
#include <stdint.h>

#define INFRARED_I2C_ADDR 0x50

class InfraredTracking {
public:
  static constexpr uint8_t kChannelCount = 5;

private:
  uint8_t _addr;

public:
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
    delay(100);  // 等待传感器稳定
    
    // 验证设备是否存在
    Wire.beginTransmission(_addr);
    byte error = Wire.endTransmission();
    
    if (error != 0) {
      // 初始化失败
      return;
    }
  }

  /**
   * @brief 设置灵敏度（阈值）
   * @param sensitivity 灵敏度值(0~1000)，实际用作高阈值
   */
  void Sensitivity(uint16_t sensitivity) {
    // 设置高阈值为 sensitivity
    Wire.beginTransmission(_addr);
    Wire.write(0x1C);  // kMemoryAddressHighThresholds
    
    // 为所有5个通道设置相同的高阈值
    for (uint8_t i = 0; i < kChannelCount; i++) {
      Wire.write(sensitivity & 0xFF);        // 低字节
      Wire.write((sensitivity >> 8) & 0xFF); // 高字节
    }
    Wire.endTransmission();
    
    // 设置低阈值为 sensitivity - 200（至少为0）
    uint16_t lowThreshold = (sensitivity > 200) ? (sensitivity - 200) : 0;
    Wire.beginTransmission(_addr);
    Wire.write(0x26);  // kMemoryAddressLowThresholds
    
    for (uint8_t i = 0; i < kChannelCount; i++) {
      Wire.write(lowThreshold & 0xFF);
      Wire.write((lowThreshold >> 8) & 0xFF);
    }
    Wire.endTransmission();
  }

  /**
   * @brief 读取原始数据，更新所有通道模拟值
   * @return true=读取成功, false=读取失败
   */
  bool GetRawDat() {
    // 先发送寄存器地址（0x10 = 模拟值起始地址）
    Wire.beginTransmission(_addr);
    Wire.write(0x10);  // kMemoryAddressAnalogValues
    Wire.endTransmission();
    
    // 请求数据（5个通道 * 2字节 = 10字节）
    uint8_t bytesRequested = kChannelCount * 2;
    uint8_t bytesReceived = Wire.requestFrom(_addr, bytesRequested);
    
    // 检查是否接收到足够的数据
    if (bytesReceived != bytesRequested) {
      return false;
    }
    
    // 读取数据（小端序：先低字节后高字节）
    for (uint8_t i = 0; i < kChannelCount; i++) {
      uint8_t lowByte = Wire.read();
      uint8_t highByte = Wire.read();
      ir_track[i + 1] = ((uint16_t)highByte << 8) | lowByte;
    }
    
    return true;
  }

  /**
   * @brief 获取所有通道的数字状态（位掩码）
   * @return 5位状态值，bit0=CH1, bit1=CH2, ...bit4=CH5
   */
  uint8_t GetState() {
    // 先发送寄存器地址（0x1A = 数字值）
    Wire.beginTransmission(_addr);
    Wire.write(0x1A);  // kMemoryAddressDigitalValues
    Wire.endTransmission();
    
    // 请求1字节数据
    uint8_t bytesReceived = Wire.requestFrom(_addr, (uint8_t)1);
    
    if (bytesReceived == 1) {
      return Wire.read();
    }
    
    return 0;
  }

  /**
   * @brief 各通道模拟值
   */
  uint16_t ir_track[6]; // index 1~5
};

