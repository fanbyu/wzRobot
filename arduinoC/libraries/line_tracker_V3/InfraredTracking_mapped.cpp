/**
 * Modified version: Map analog values to 0-255 range
 */
#include "InfraredTracking.h"

InfraredTracking::InfraredTracking(uint8_t addr)
{
    _i2c_addr = addr;
    local_threshold = 512;
}

InfraredTracking::~InfraredTracking()
{
}

void InfraredTracking::Init() {
    version = 1;
    Wire.begin();
    Sensitivity(500);

    ReadFIFO();
    
    if(FIFO[0] <=3 && FIFO[1] > 3) {
        version = 2;
    } else if (FIFO[0] == 3 && FIFO[1] == 0) {
        version = 3;
    } else {
        version = 1;
    }
}

void InfraredTracking::WriteRegWord(uint8_t reg, uint8_t *array)
{
    Wire.beginTransmission(_i2c_addr);
    Wire.write(reg);
    Wire.write(array[0]);
    Wire.write(array[1]);    
    Wire.endTransmission(); 
}

int InfraredTracking::ReadDataArray(uint8_t reg, uint8_t *array, uint8_t len)
{
    int result = 0;
    Wire.beginTransmission(_i2c_addr);
    Wire.write(reg);
    Wire.endTransmission();
    Wire.requestFrom(_i2c_addr, len);
    while (Wire.available()) {
        if (result >= len) {
            return -1;
        }
        array[result] = Wire.read();
        result++;
    }
    return result;
}

void InfraredTracking::Sensitivity(uint16_t threshold)
{
    uint8_t array[2];
    array[0] = threshold & 0xFF;
    array[1] = (threshold >> 8) & 0xFF;

    if(version <= 2) {      
        WriteRegWord(INFRARED_SENSITIVITY_REG, array);
    } else {
        uint8_t tmp = 0x1c;
        for (uint8_t i = 0; i < 5; i++){
            WriteRegWord(tmp, array);
            tmp+=2;
        }
        tmp = 0x26;
        for (uint8_t i = 0; i < 5; i++){
            WriteRegWord(tmp, array);
            tmp+=2;
        }
    }

    local_threshold = threshold;
}

boolean InfraredTracking::ReadFIFO()
{
    uint8_t result;

    if(version == 1) {        
        result = ReadDataArray(INFRARED_ANALOG_REG, FIFO, INFRARED_FIFO_LENGTH);
    } else if (version == 2) {
        result = ReadDataArray(0x02, FIFO, INFRARED_FIFO_LENGTH);
    } else if (version == 3) {
        result = ReadDataArray(0x10, FIFO, INFRARED_FIFO_LENGTH);
    }
    if (result == -1) {
        return false;
    }  
    return true;
}

void InfraredTracking::GetRawDat()
{
    ReadFIFO();
    
    if(version >= 2) {
        uint16_t tmp = (FIFO[0] & 0xFF) | ((FIFO[1] & 0xFF) << 8 );
        if(tmp > 1024) {
            return;
        }
        // Map to 0-255 range
        ir_track5 = map((FIFO[0] & 0xFF) | ((FIFO[1] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track4 = map((FIFO[2] & 0xFF) | ((FIFO[3] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track3 = map((FIFO[4] & 0xFF) | ((FIFO[5] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track2 = map((FIFO[6] & 0xFF) | ((FIFO[7] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track1 = map((FIFO[8] & 0xFF) | ((FIFO[9] & 0xFF) << 8 ), 0, 1023, 0, 255);
    } else {
        // Map to 0-255 range
        ir_track1 = map((FIFO[0] & 0xFF) | ((FIFO[1] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track2 = map((FIFO[2] & 0xFF) | ((FIFO[3] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track3 = map((FIFO[4] & 0xFF) | ((FIFO[5] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track4 = map((FIFO[6] & 0xFF) | ((FIFO[7] & 0xFF) << 8 ), 0, 1023, 0, 255);
        ir_track5 = map((FIFO[8] & 0xFF) | ((FIFO[9] & 0xFF) << 8 ), 0, 1023, 0, 255);
    }

    if(version == 2) {      
        ReadDataArray(0x0c, &state, 1);
        uint8_t tmp = 0;
        tmp |= ((state >> 4) & 0x01) << 0;
        tmp |= ((state >> 3) & 0x01) << 1;
        tmp |= ((state >> 2) & 0x01) << 2;
        tmp |= ((state >> 1) & 0x01) << 3;
        tmp |= ((state >> 0) & 0x01) << 4;
        state = tmp;
    } else if (version == 3) {
        ReadDataArray(0x1a, &state, 1);
        uint8_t tmp = 0;
        tmp |= ((state >> 4) & 0x01) << 0;
        tmp |= ((state >> 3) & 0x01) << 1;
        tmp |= ((state >> 2) & 0x01) << 2;
        tmp |= ((state >> 1) & 0x01) << 3;
        tmp |= ((state >> 0) & 0x01) << 4;
        state = tmp;
    }
}

uint8_t InfraredTracking::GetState()
{
    if(version > 2) {
        return state;
    }    

    state = 0;
    if(ir_track1 < local_threshold){
        state |= 1;
    }
    if(ir_track2 < local_threshold){
        state |= 1 << 1;
    }
    if(ir_track3 < local_threshold){
        state |= 1 << 2;
    }
    if(ir_track4 < local_threshold){
        state |= 1 << 3;
    }
    if(ir_track5 < local_threshold){
        state |= 1 << 4;
    }
    return state;
}
