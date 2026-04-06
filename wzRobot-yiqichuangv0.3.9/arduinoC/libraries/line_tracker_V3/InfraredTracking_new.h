#ifndef INFRAREDTRACKING_H
#define INFRAREDTRACKING_H

#include <Arduino.h>
#include <stdint.h>
#include <Wire.h>

#define INFRARED_I2C_ADDR           0x50
#define INFRARED_SENSITIVITY_REG    0x00
#define INFRARED_ANALOG_REG         0x01
#define INFRARED_DIGITAL_REG        0x02
#define INFRARED_DATA_WIDTH         0x02
#define INFRARED_FIFO_LENGTH        0x0A

#define INFRARED_ALL 0x1F
#define INFRARED_LINE_1 0x01
#define INFRARED_LINE_2 0x02
#define INFRARED_LINE_3 0x04
#define INFRARED_LINE_4 0x08
#define INFRARED_LINE_5 0x10

class InfraredTracking 
{
    private:
        uint8_t FIFO[10], _i2c_addr;
        void WriteRegWord(uint8_t reg, uint8_t *array);
        int ReadDataArray(uint8_t reg, uint8_t *array, uint8_t len);
        uint16_t local_threshold;

    public: 
        ~InfraredTracking();

        uint8_t state;  
        uint16_t ir_track1, ir_track2, ir_track3, ir_track4, ir_track5;
        uint8_t version; 
        InfraredTracking(uint8_t addr = 0x50);
        void Init();
        void Sensitivity(uint16_t value = 500);
        uint8_t GetState();
        boolean ReadFIFO();
        void GetRawDat();
};

#endif
