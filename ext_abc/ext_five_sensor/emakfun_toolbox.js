
function motion() {
    const Xml =
        `
<category name="%{BKY_EXT_FIVE_INFRARED_TRACKING}" id="EXT_EXT_FIVE_INFRARED_TRACKING" colour="#28BFE6" secondaryColour="#28BFE6">
    <block type="EXT_FIVE_INFRARED_TRACKING_INIT" id="EXT_FIVE_INFRARED_TRACKING_INIT"></block>
    <block type="EXT_FIVE_INFRARED_TRACKING_SET" id="EXT_FIVE_INFRARED_TRACKING_SET">
        <value name="NUM">
            <shadow type="math_whole_number">
                <field name="NUM">500</field>
            </shadow>
        </value>
    </block>
    <block type="EXT_FIVE_INFRARED_TRACKING_GETDATA" id="EXT_FIVE_INFRARED_TRACKING_GETDATA"></block>
    <block type="EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL" id="EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL"></block>
    <block type="EXT_FIVE_INFRARED_TRACKING_READ_ANALOG" id="EXT_FIVE_INFRARED_TRACKING_READ_ANALOG"></block>
    <block type="EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL2" id="EXT_FIVE_INFRARED_TRACKING_READ_DIGITAL2"></block>
</category>
`;
    
    const categoriesXML = `
            ${Xml}`;
    return categoriesXML;
};

module.exports = motion();
