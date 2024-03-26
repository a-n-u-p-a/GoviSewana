import CustomButton from "./customButton";
import commonConfig from '../config/commonConfig.json';
import React, {useEffect, useState} from "react";

const CultivationCard = ({SOURCE_IMG, ALT_IMG, TITLE, BTN_READ_MORE}) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    return (
        <div className={"custom_cultivation_main flex_center flex_col"}>

            <div className={"custom_cul_img_section flex_center"}>
                <img src={SOURCE_IMG} alt={ALT_IMG} className={"custom_cul_img"}/>
            </div>

            <h3> {TITLE} </h3>

            <div className={"custom_cul_separator"}/>

            <p className={"custom_cul_p"}>
                {commonConfig[selectedLanguage].EXPLORE_DESCRIPTION}
            </p>

            <div className={"custom_cul_button_section flex_center"}>
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].READ_MORE_BUTTON} CLASS_NAME={"customButton custom_cul_button"} ON_CLICK={BTN_READ_MORE}/>
            </div>

        </div>
    )
}

export default CultivationCard;
