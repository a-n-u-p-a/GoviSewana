import React from "react";

const CustomButton = ({CLASS_NAME, BTN_NAME, STYLE, ON_CLICK, ON_MOUSE_ENTER, ON_MOUSE_LEAVE}) => {
    return (
        <button className={CLASS_NAME} style={STYLE} onClick={ON_CLICK} onMouseEnter={ON_MOUSE_ENTER} onMouseLeave={ON_MOUSE_LEAVE}>
            {BTN_NAME}
        </button>
    )
}

export default CustomButton;
