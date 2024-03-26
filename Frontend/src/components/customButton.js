import React from "react";

const CustomButton = ({CLASS_NAME, BTN_NAME, STYLE, ON_CLICK}) => {
    return (
        <button className={CLASS_NAME} style={STYLE} onClick={ON_CLICK}>
            {BTN_NAME}
        </button>
    )
}

export default CustomButton;
