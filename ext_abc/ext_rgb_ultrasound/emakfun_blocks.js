

const path = require('path');
const staticImg = path.join(__dirname, 'static');

function ArduinoUnoBlocks(Blockly) {






    Blockly.Blocks['EXT_RGB_ULTRASOUND_BLOCK_1607498782032'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032,
                "args0": [

                    {
                        "type": "field_dropdown",
                        "name": "io",
                        "options": [
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_0, '1'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_1, '2'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_2, '3'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_3, '4'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_4, '5'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_5, '6'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_6, '7'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_7, '8'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_8, '9'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_9, '10'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_10, '11'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_11, '12'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_12, '13'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_13, '14'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_14, '15'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_15, '16'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_16, '17'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_17, '18'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_18, '19'],

                        ]
                    },

                    {
                        "type": "field_dropdown",
                        "name": "rgb",
                        "options": [
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_0, '1'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_1, '2'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_2, '3'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_3, '4'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_4, '5'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_5, '6'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_6, '7'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_7, '8'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_8, '9'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_9, '10'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_10, '11'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_11, '12'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_12, '13'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_13, '14'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_14, '15'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_15, '16'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_16, '17'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_17, '18'],
                            [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782032_IO_18, '19'],

                        ]
                    },

                ],
                "colour": "#71BE1E",
                "extensions": ["shape_statement"]
            });
        }
    };



    // Blockly.Blocks['EXT_RGB_ULTRASOUND_BLOCK_1607498782142'] = {
    //     init: function () {
    //         this.jsonInit({
    //             "message0": Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142,
    //             "args0": [

    //                 {
    //                     "type": "field_dropdown",
    //                     "name": "azimuth",
    //                     "options": [
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_AZIMUTH_0, 'E_RGB_ALL'],
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_AZIMUTH_1, 'E_RGB_LEFT'],
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_AZIMUTH_2, 'E_RGB_RIGHT'],

    //                     ]
    //                 },

    //                 {
    //                     "type": "input_value",
    //                     "name": "R"
    //                 },

    //                 {
    //                     "type": "input_value",
    //                     "name": "G"
    //                 },

    //                 {
    //                     "type": "input_value",
    //                     "name": "B"
    //                 },

    //                 {
    //                     "type": "field_dropdown",
    //                     "name": "style",
    //                     "options": [
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_STYLE_0, 'E_EFFECT_NONE'],
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_STYLE_1, 'E_EFFECT_BREATHING'],
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_STYLE_2, 'E_EFFECT_ROTATE'],
    //                         [Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782142_STYLE_3, 'E_EFFECT_FLASH'],

    //                     ]
    //                 },

    //             ],
    //             "colour": "#71BE1E",
    //             "extensions": ["shape_statement"]
    //         });
    //     }
    // };

    Blockly.Blocks.EXT_RGB_ULTRASOUND_BLOCK_1607498782142 = {
        init:function(){
         this.setColour("#71BE1E");
         this.appendDummyInput("")
         //.appendField(new Blockly.FieldImage(staticImg+"/52.RGB ultrasonic Module.svg", 84, 42))
            .appendField(Blockly.Msg.PH_RGBULTRASONICSETCOLOR)
             .appendField(new Blockly.FieldDropdown([
               [Blockly.Msg.PH_ALL, "E_RGB_ALL"],
               [Blockly.Msg.PH_LEFT, "E_RGB_LEFT"],
               [Blockly.Msg.PH_RIGHT, "E_RGB_RIGHT"],
             ]),"ph_rgbultrasonicposition")
             this.appendDummyInput("")
             .appendField(Blockly.Msg.PH_RGBULTRASONICSETCOLORLED)
             this.appendValueInput("COLOR", Number)
            this.appendDummyInput("")
            .appendField(Blockly.Msg.PH_RGBULTRASONICSTYLE)
                 .appendField(new Blockly.FieldDropdown([
             [Blockly.Msg.PH_NONE, "E_EFFECT_NONE"],
               [Blockly.Msg.PH_BREATHING, "E_EFFECT_BREATHING"],
               [Blockly.Msg.PH_ROTATE, "E_EFFECT_ROTATE"],
               [Blockly.Msg.PH_FLASH, "E_EFFECT_FLASH"],
             ]),"ph_rgbultrasoniccolorstyle")
         this.setPreviousStatement(true,null);
           this.setNextStatement(true,null);
         this.setTooltip('');
        }
        };



    Blockly.Blocks['EXT_RGB_ULTRASOUND_BLOCK_1607498782246'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.EXT_RGB_ULTRASOUND_BLOCK_1607498782246,
                "args0": [

                ],
                "colour": "#71BE1E",
                "extensions": ["output_number"]
            });
        }
    };

    
    
    
    
    

    return Blockly;
}

module.exports = ArduinoUnoBlocks;

