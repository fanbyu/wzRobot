enum CHANNEL {
    //% block="第1路"
    CH1 = 1,
    //% block="第2路"
    CH2 = 2,
    //% block="第3路"
    CH3 = 3,
    //% block="第4路"
    CH4 = 4,
    //% block="第5路"
    CH5 = 5
}

enum WIRE_COLOR {
    //% block="白线"
    WHITE = 1,
    //% block="黑线"
    BLACK = 0
}

//% color="#28BFE6" iconWidth=50 iconHeight=40
namespace five_infrared_tracking {

    //% block="五路循线模块初始化IIC接口" blockType="command"
    export function init(parameter: any, block: any) {
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        Generator.addCode(`_5line_track.Init();`);
    }

    //% block="五路循线模块设置检测灵敏度为 %1 (0~1000，数值越高越灵敏)" blockType="command"
    //% num.shadow="range" num.params.min=0 num.params.max=1000 num.defl=500
    export function setSensitivity(parameter: any, block: any) {
        let num = parameter.num.code;
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        Generator.addCode(`_5line_track.Sensitivity(${num});`);
    }

    //% block="五路循线模块读取数据" blockType="command"
    export function readData(parameter: any, block: any) {
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        Generator.addCode(`_5line_track.GetRawDat();`);
    }

    //% block="五路循线模块读取 %1 模拟值" blockType="reporter"
    //% channel.shadow="dropdown" channel.options="CHANNEL" channel.defl="CHANNEL.CH1"
    export function readAnalog(parameter: any, block: any) {
        let ch = parameter.channel.code;
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        Generator.addCode([`_5line_track.ir_track${ch}`, Blockly.Arduino.ORDER_ATOMIC]);
    }

    //% block="五路循线模块 %1 检测到 %2" blockType="boolean"
    //% channel.shadow="dropdown" channel.options="CHANNEL" channel.defl="CHANNEL.CH1"
    //% type.shadow="dropdown" type.options="WIRE_COLOR" type.defl="WIRE_COLOR.BLACK"
    export function readDigital(parameter: any, block: any) {
        let ch = parameter.channel.code;
        let type = parameter.type.code;
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        
        let chIndex = parseInt(ch) - 1;
        Generator.addCode([`(((_5line_track.GetState() >> ${chIndex}) & 1) == ${type})`, Blockly.Arduino.ORDER_ATOMIC]);
    }

    //% block="五路循线模块检测到 CH1:%1 CH2:%2 CH3:%3 CH4:%4 CH5:%5" blockType="boolean"
    //% ch1.shadow="dropdown" ch1.options="WIRE_COLOR" ch1.defl="WIRE_COLOR.WHITE"
    //% ch2.shadow="dropdown" ch2.options="WIRE_COLOR" ch2.defl="WIRE_COLOR.WHITE"
    //% ch3.shadow="dropdown" ch3.options="WIRE_COLOR" ch3.defl="WIRE_COLOR.WHITE"
    //% ch4.shadow="dropdown" ch4.options="WIRE_COLOR" ch4.defl="WIRE_COLOR.WHITE"
    //% ch5.shadow="dropdown" ch5.options="WIRE_COLOR" ch5.defl="WIRE_COLOR.WHITE"
    export function readMultiDigital(parameter: any, block: any) {
        let c1 = parameter.ch1.code;
        let c2 = parameter.ch2.code;
        let c3 = parameter.ch3.code;
        let c4 = parameter.ch4.code;
        let c5 = parameter.ch5.code;
        
        let value = parseInt(c1) + 
                    (parseInt(c2) * 2) + 
                    (parseInt(c3) * 4) + 
                    (parseInt(c4) * 8) + 
                    (parseInt(c5) * 16);
        
        Generator.addInclude("five_tracking_include", `#include "InfraredTracking.h"`);
        Generator.addObject("five_tracking_object", "InfraredTracking", `_5line_track(INFRARED_I2C_ADDR)`);
        Generator.addCode([`(_5line_track.GetState() == ${value})`, Blockly.Arduino.ORDER_ATOMIC]);
    }
}
