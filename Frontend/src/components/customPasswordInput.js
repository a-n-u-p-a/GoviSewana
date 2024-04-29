import React from "react";

const CustomPasswordInput = ({LABEL_NAME, PLACEHOLDER, icon, STYLE, ON_CHANGE, ON_FOCUS, ON_BLUR }) => {

    const IconComponent = icon;

    return (
        <div className={"customInput flex_center flex_col res_custom_input"}>

            <div className={"customInputLabel"}>
                <p className={"customInputLabelName"} style={STYLE}>{LABEL_NAME}</p>
            </div>

            <div className="customInputSection flex_center">
                <input required type="password" placeholder={PLACEHOLDER} className={"customInputField"} 
                onChange={ON_CHANGE} onFocus={ON_FOCUS} onBlur={ON_BLUR}/>
                <IconComponent className="customInputIcon"/>
            </div>

        </div>

    )
}

export default CustomPasswordInput;