/*!
 * MindPlus
 * uno
 *
 */
#include "InfraredTracking.h"

// 创建对象
InfraredTracking _5line_track(INFRARED_I2C_ADDR);


// 主程序开始
void setup() {
	Serial.begin(9600);
	_5line_track.Init();
}

void loop() {
	_5line_track.GetRawDat();
	
	// 正确的方式：使用数组访问
	Serial.print("Channel 1: ");
	Serial.println(_5line_track.ir_track[1]);
	
	// 或者打印所有通道
	// Serial.print("CH1:"); Serial.print(_5line_track.ir_track[1]);
	// Serial.print(" CH2:"); Serial.print(_5line_track.ir_track[2]);
	// Serial.print(" CH3:"); Serial.print(_5line_track.ir_track[3]);
	// Serial.print(" CH4:"); Serial.print(_5line_track.ir_track[4]);
	// Serial.print(" CH5:"); Serial.println(_5line_track.ir_track[5]);
	
	delay(100);
}
