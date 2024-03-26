import React from "react";

const CustomOtpBox = ({NAME, VALUE, ON_CHANGE}) => {
    return(
        <div className={"container customOtpBoxMainSection"}>
            <input type="number" className={"customOtpBox"} onChange={ON_CHANGE} name={NAME} value={VALUE}/>
        </div>
    )
}

export default CustomOtpBox;
