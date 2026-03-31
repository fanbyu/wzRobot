
function ArduinoUnoBlocks(Blockly) {

    const colour = '#28BFE6';

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_INIT'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块初始化IIC接口",
                "colour": colour,
                "extensions": ["shape_statement"]
            });
        }
    };

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_SET'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块设置检测灵敏度为 %1 (0 ~ 1000  数值越高越灵敏)",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "NUM",
                    }
                ],
                "colour": colour,
                "extensions": ["shape_statement"]
            });
        }
    };

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_GETDATA'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块读取数据",
                "colour": colour,
                "extensions": ["shape_statement"]
            });
        }
    };

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_READ_ANALOG'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块读取第 %1 路模拟值",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "NUM",
                        "options": [
                            ['1路', '1'],
                            ['2路', '2'],
                            ['3路', '3'],
                            ['4路', '4'],
                            ['5路', '5']
                        ]
                    }
                ],
                "colour": colour,
                "extensions": ["output_number"]
            });
        }
    };

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块第 %1 路检测到 %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "NUM",
                        "options": [
                            ['1路', '0'],
                            ['2路', '1'],
                            ['3路', '2'],
                            ['4路', '3'],
                            ['5路', '4']
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "TYPE",
                        "options": [
                            ['白线', '1'],
                            ['黑线', '0']
                        ]
                    }
                ],
                "colour": colour,
                "extensions": ["output_boolean"]
            });
        }
    };

    Blockly.Blocks['EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL2'] = {
        init: function () {
            this.jsonInit({
                "message0": "五路巡线模块检测到 CH1%1 CH2%2 CH3%3 CH4%4 CH5%5",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "CH1",
                        "options": [
                            ['白', '1'],
                            ['黑', '0']
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "CH2",
                        "options": [
                            ['白', '1'],
                            ['黑', '0']
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "CH3",
                        "options": [
                            ['白', '1'],
                            ['黑', '0']
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "CH4",
                        "options": [
                            ['白', '1'],
                            ['黑', '0']
                        ]
                    },
                    {
                        "type": "field_dropdown",
                        "name": "CH5",
                        "options": [
                            ['白', '1'],
                            ['黑', '0']
                        ]
                    },
                ],
                "colour": colour,
                "extensions": ["output_boolean"]
            });
        }
    };

    return Blockly;
}

module.exports = ArduinoUnoBlocks;

