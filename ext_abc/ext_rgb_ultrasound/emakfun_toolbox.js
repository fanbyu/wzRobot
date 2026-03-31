
function motion() {
    const Xml =
        `
            
                    
                    <category name="%{BKY_EXT_RGB_ULTRASOUND_CATE_522E50FE}" id="EXT_RGB_ULTRASOUND_CATE_522E50FE" colour="#7ED321" secondaryColour="#71BE1E">
                        
                    
                    
                     <block type="EXT_RGB_ULTRASOUND_BLOCK_1607498782032" id="EXT_RGB_ULTRASOUND_BLOCK_1607498782032">

</block>

            <block type="EXT_RGB_ULTRASOUND_BLOCK_1607498782142" id="EXT_RGB_ULTRASOUND_BLOCK_1607498782142">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value> 
            </block>

        

 <block type="EXT_RGB_ULTRASOUND_BLOCK_1607498782246" id="EXT_RGB_ULTRASOUND_BLOCK_1607498782246">

</block>


                
 

                    </category>
                
            `;
    const categoriesXML = `
            ${Xml}`;
    return categoriesXML;
};

module.exports = motion();
