

function addArduinoCod(Blockly) {






    Blockly.Arduino['EXT_RGB_ULTRASOUND_BLOCK_1607498782032'] = function (block) {
        let io = this.getFieldValue('io');
        let rgb = this.getFieldValue('rgb');

        Blockly.Arduino.definitions_['include_EXT_RGB_ULTRASOUND_BLOCK_1607498782032'] = `\n#include "RgbUltrasonic.h"`;
        Blockly.Arduino.definitions_['define_EXT_RGB_ULTRASOUND_BLOCK_1607498782032'] = `RgbUltrasonic mRUS04(${io}, ${rgb});`;
        Blockly.Arduino.definitions_['setup_EXT_RGB_ULTRASOUND_BLOCK_1607498782032'] = ``;
        return `\r\n`;
    }



    // Blockly.Arduino['EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = function (block) {
    //     let azimuth = this.getFieldValue('azimuth');
    //     let R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
    //     let G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
    //     let B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
    //     let style = this.getFieldValue('style');

    //     Blockly.Arduino.definitions_['include_EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = ``;
    //     Blockly.Arduino.definitions_['define_EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = ``;
    //     Blockly.Arduino.definitions_['setup_EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = ``;
    //     return `mRUS04.SetRgbEffect(${azimuth}, ${G}, ${R}, ${B}, ${style});\r\ndelay(1000);\r\n`;
    // }

    Blockly.Arduino['EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = function(block) {
        var rgbultrasonicposition = this.getFieldValue('ph_rgbultrasonicposition');
        var rgbultrasoniccolor = this.getFieldValue('ph_rgbultrasoniccolor');
        var rgbultrasoniccolorstyle = this.getFieldValue('ph_rgbultrasoniccolorstyle');
        var dropdown_color = block.childBlocks_[0].colour_; 
        dropdown_color = dropdown_color.replace("#","0x");
        // if(rgbultrasoniccolor == "RGB_RED") {
        //   rgbultrasoniccolor == "RGB_GREEN";
        // }else if(rgbultrasoniccolor == "RGB_GREEN") {
        //   rgbultrasoniccolor == "RGB_GREEN";
        // }
        var code = 'mRUS04.SetRgbEffect(' + rgbultrasonicposition+', ' + dropdown_color + ', ' + rgbultrasoniccolorstyle + ');\n';
        return code;
      }


    Blockly.Arduino['EXT_RGB_ULTRASOUND_BLOCK_1607498782246'] = function (block) {


        Blockly.Arduino.definitions_['include_EXT_RGB_ULTRASOUND_BLOCK_1607498782246'] = ``;
        Blockly.Arduino.definitions_['define_EXT_RGB_ULTRASOUND_BLOCK_1607498782246'] = ``;
        Blockly.Arduino.definitions_['setup_EXT_RGB_ULTRASOUND_BLOCK_1607498782246'] = ``;
        return [`mRUS04.GetUltrasonicDistance()`];
    }



 

    return Blockly;
}

module.exports = addArduinoCod;

