

function addArduinoCod(Blockly) {

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_INIT'] = function (block) {
        Blockly.Arduino.definitions_['include_EXT_FIVE_INFRARED_TRACKING_INIT'] = `\n#include "InfraredTracking.h"`;
        Blockly.Arduino.definitions_['define_EXT_FIVE_INFRARED_TRACKING_INIT'] = `InfraredTracking _5line_track(INFRARED_I2C_ADDR);`;
        // Blockly.Arduino.definitions_['setup_EXT_FIVE_INFRARED_TRACKING_INIT'] = `tcs34725.begin();`;
        return `_5line_track.Init();\n`;
    }

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_SET'] = function (block) {
        var num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC) || '0';

        return `_5line_track.Sensitivity(${num});\n`;
    }

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_GETDATA'] = function (block) {
        return `_5line_track.GetRawDat();\n`;
    }

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_READ_ANALOG'] = function (block) {
        let num = this.getFieldValue('NUM');

        return [`_5line_track.ir_track${num}`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL'] = function (block) {
        let num = this.getFieldValue('NUM');
        let type = this.getFieldValue('TYPE');

        return [`(((_5line_track.GetState() >> ${num}) & 1) == ${type})`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL2'] = function (block) {
        let ch1 = parseInt(this.getFieldValue('CH1'));
        let ch2 = parseInt(this.getFieldValue('CH2'));
        let ch3 = parseInt(this.getFieldValue('CH3'));
        let ch4 = parseInt(this.getFieldValue('CH4'));
        let ch5 = parseInt(this.getFieldValue('CH5'));

        let value = ch1 + (ch2 * 2) + (ch3 * 4) + (ch4 * 8) + (ch5 * 16);

        return [`(_5line_track.GetState() == ${value})`, Blockly.Arduino.ORDER_ATOMIC];
    }

    return Blockly;
}

module.exports = addArduinoCod;

