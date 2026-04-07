#pragma once

#include <Wire.h>
#include <stdint.h>

#define INFRARED_I2C_ADDR 0x50
#define INFRARED_SENSITIVITY_REG 0x10
#define INFRARED_ANALOG_REG 0x00
#define INFRARED_FIFO_LENGTH 10

class InfraredTracking {
public:
    /**
     * @brief 构造函数
     * @param addr I2C地址，默认0x50
     */
    InfraredTracking(uint8_t addr = INFRARED_I2C_ADDR);
    ~InfraredTracking();

    /**
     * @brief 初始化模块，自动检测版本
     */
    void Init();

    /**
     * @brief 设置灵敏度
     * @param threshold 阈值(0~1024)
     */
    void Sensitivity(uint16_t threshold);

    /**
     * @brief 读取FIFO数据
     * @return 是否成功
     */
    bool ReadFIFO();

    /**
     * @brief 读取原始数据，更新所有通道模拟值
     */
    void GetRawDat();

    /**
     * @brief 获取所有通道的数字状态（位掩码）
     * @return 5位状态值，bit0=CH1, bit1=CH2, ...bit4=CH5
     */
    uint8_t GetState();

private:
    uint8_t _i2c_addr;
    uint16_t local_threshold;
    uint8_t version;
    uint8_t FIFO[INFRARED_FIFO_LENGTH];
    uint8_t state;

    void WriteRegWord(uint8_t reg, uint8_t *array);
    int ReadDataArray(uint8_t reg, uint8_t *array, uint8_t len);

public:
    /**
     * @brief 各通道模拟值
     */
    uint16_t ir_track1;
    uint16_t ir_track2;
    uint16_t ir_track3;
    uint16_t ir_track4;
    uint16_t ir_track5;
};

