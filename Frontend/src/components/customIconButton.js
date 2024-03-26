import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CustomIconButton = ({ICON, TITLE, ON_CLICK}) => {
    return (
        <div className={"customIconButtonSection flex_center"} onClick={ON_CLICK}>

            <div className={"customIconButtonLeft flex_center"}>
                <FontAwesomeIcon icon={ICON}/>
            </div>

            <div className={"customIconButtonRight flex_align"}>
                <p className={"customIconButtonTxt"}> {TITLE} </p>
            </div>

        </div>
    )
}

export default CustomIconButton;
