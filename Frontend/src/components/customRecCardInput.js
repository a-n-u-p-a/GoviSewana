import React from "react";

const CustomRecCardInput = ({TITLE, VALUE}) => {
    return (

        <div className={"custom_card_data flex_center flex_row"}>

            <div className={"custom_rec_card_data_title flex_align"}>
                <h4> {TITLE} </h4>
            </div>

            <div className={"custom_rec_card_data_set flex_align"}>
                <h4> {VALUE}T</h4>
            </div>

        </div>
    )
}

export default CustomRecCardInput;
