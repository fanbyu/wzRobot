enum PIN_IO {
    //% block="1"
    PIN_1 = 1,
    //% block="2"
    PIN_2 = 2,
    //% block="3"
    PIN_3 = 3,
    //% block="4"
    PIN_4 = 4,
    //% block="5"
    PIN_5 = 5,
    //% block="6"
    PIN_6 = 6,
    //% block="7"
    PIN_7 = 7,
    //% block="8"
    PIN_8 = 8,
    //% block="9"
    PIN_9 = 9,
    //% block="10"
    PIN_10 = 10,
    //% block="11"
    PIN_11 = 11,
    //% block="12"
    PIN_12 = 12,
    //% block="13"
    PIN_13 = 13,
    //% block="A0"
    PIN_A0 = 14,
    //% block="A1"
    PIN_A1 = 15,
    //% block="A2"
    PIN_A2 = 16,
    //% block="A3"
    PIN_A3 = 17,
    //% block="A4"
    PIN_A4 = 18,
    //% block="A5"
    PIN_A5 = 19
}

enum PIN_RGB {
    //% block="1"
    PIN_1 = 1,
    //% block="2"
    PIN_2 = 2,
    //% block="3"
    PIN_3 = 3,
    //% block="4"
    PIN_4 = 4,
    //% block="5"
    PIN_5 = 5,
    //% block="6"
    PIN_6 = 6,
    //% block="7"
    PIN_7 = 7,
    //% block="8"
    PIN_8 = 8,
    //% block="9"
    PIN_9 = 9,
    //% block="10"
    PIN_10 = 10,
    //% block="11"
    PIN_11 = 11,
    //% block="12"
    PIN_12 = 12,
    //% block="13"
    PIN_13 = 13,
    //% block="A0"
    PIN_A0 = 14,
    //% block="A1"
    PIN_A1 = 15,
    //% block="A2"
    PIN_A2 = 16,
    //% block="A3"
    PIN_A3 = 17,
    //% block="A4"
    PIN_A4 = 18,
    //% block="A5"
    PIN_A5 = 19
}

enum RGB_POSITION {
    //% block="全部"
    ALL = 0,
    //% block="左边"
    LEFT = 1,
    //% block="右边"
    RIGHT = 2
}

enum RGB_COLOR {
    //% block="红色"
    RED = 0xFF0000,
    //% block="绿色"
    GREEN = 0x00FF00,
    //% block="蓝色"
    BLUE = 0x0000FF,
    //% block="黄色"
    YELLOW = 0xFFFF00,
    //% block="紫色"
    PURPLE = 0xFF00FF,
    //% block="橙色"
    ORANGE = 0xFFA500,
    //% block="靛蓝色"
    INDIGO = 0x4B0082,
    //% block="紫罗兰"
    VIOLET = 0x8A2BE2,
    //% block="白色"
    WHITE = 0xFFFFFF,
    //% block="熄灭"
    BLACK = 0x000000
}

enum RGB_EFFECT {
    //% block="无"
    NONE = 0,
    //% block="呼吸"
    BREATHING = 1,
    //% block="旋转"
    ROTATE = 2,
    //% block="闪烁"
    FLASH = 3
}

//% color="#71BE1E" iconWidth=50 iconHeight=40
namespace ext_rgb_ultrasound {

    //% block="RGB超声波模块引脚初始化 IO %1 RGB %2" blockType="command"
    //% io.shadow="dropdown" io.options="PIN_IO" io.defl="PIN_IO.PIN_3"
    //% rgb.shadow="dropdown" rgb.options="PIN_RGB" rgb.defl="PIN_RGB.PIN_4"
    export function init(parameter: any, block: any) {
        let io = parameter.io.code;
        let rgb = parameter.rgb.code;
        
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRUS04(${io}, ${rgb})`);
        Generator.addCode(``);
    }

    //% block="RGB超声波模块 %1 灯亮颜色 %2 样式 %3" blockType="command"
    //% position.shadow="dropdown" position.options="RGB_POSITION" position.defl="RGB_POSITION.ALL"
    //% color.shadow="colorPicker" color.defl="#ff0000"
    //% effect.shadow="dropdown" effect.options="RGB_EFFECT" effect.defl="RGB_EFFECT.NONE"
    export function setColor(parameter: any, block: any) {
        let position = parameter.position.code;
        let color = parameter.color.code;
        let effect = parameter.effect.code;
        
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRUS04(3, 4)`);
        
        let colorCode = color.replace("#", "0x");
        Generator.addCode(`mRUS04.SetRgbEffect(${position}, ${colorCode}, ${effect});`);
    }

    //% block="RGB超声波模块读取超声波距离" blockType="reporter"
    export function readDistance(parameter: any, block: any) {
        Generator.addInclude("rgb_ultrasound_include", `#include "RgbUltrasonic.h"`);
        Generator.addObject("rgb_ultrasound_object", "RgbUltrasonic", `mRUS04(3, 4)`);
        
        Generator.addCode([`mRUS04.GetUltrasonicDistance()`, Blockly.Arduino.ORDER_ATOMIC]);
    }
}
