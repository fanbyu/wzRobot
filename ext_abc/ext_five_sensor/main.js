
        const arduino_uno_blocks =  require('./emakfun_blocks');
        const arduino_uno_code =  require('./emakfun_code');
        const xml = require('./emakfun_toolbox');
        const language = require('./language');

        const ArduinoBlcosk = {
            blocks: arduino_uno_blocks,
            blocks_code: arduino_uno_code,
            blocks_tool_xml: xml,
            blocks_language: language
        }

        module.exports = ArduinoBlcosk;
        