import React from "react";
import {useState,useEffect} from "react";
import commonConfig from '../config/commonConfig.json';
import CustomRecCardInput from "./customRecCardInput";
import CustomButton from "./customButton";

const RecommendCard = ({SOURCE_IMG, ALT_IMG, ITEM_NAME, CROP_TYPE, ON_CLICK_CARD}) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });
    
    // useEffect(() => {
    //     const langValue = localStorage.getItem('selectedLanguage');
    //     if (langValue !== null) {
    //         setSelectedLanguage(langValue)
    //     }
    // }, []);

    const [cropDemand, setCropDemand] = useState("");
    const [currentYield, setCurrentYield] = useState("");
    const [requiredYield, setRequiredYield] = useState("");

    let inputData = {
        "Crop_Type": CROP_TYPE
    }

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }

        fetchCropData(); // Run fetchTabeleData only once when the component mounts
    }, []);

    async function fetchCropData() {
        try {
            let url = 'https://govisewana-n5bcf5twmq-uc.a.run.app/cropRecommendation/displayCropData/';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            // 'GET' response from Back-end 
            if (response.ok) {
                let result = await response.json();
                setCropDemand(result.Crop_Demand);
                setCurrentYield(result.Current_Yield);
                setRequiredYield(result.Required_Yield);
                // console.log(result);
                
            } else {
                console.error('Error sending data:',response.status);
            }
        } catch (err) {
            console.error('Network error:',err);
        }
    }


    return (
        <div className={"container custom_rec_card_section"}>
            <div className={"custom_rec_card_mini flex_center flex_col"}>

                <div className={"custom_rec_card_img_section flex_center"}>
                    <img src={SOURCE_IMG} alt={ALT_IMG} className={"custom_rec_card_img"}/>
                </div>
                <h2> {ITEM_NAME} </h2>
                <div className={"custom_rec_card_separator"}/>
                    <CustomRecCardInput TITLE={commonConfig[selectedLanguage].MARKET_DEMAND} VALUE={cropDemand}/>
                    <CustomRecCardInput TITLE={commonConfig[selectedLanguage].CURRENT_YIELD} VALUE={currentYield}/>
                    <CustomRecCardInput TITLE={commonConfig[selectedLanguage].REQUIRED_YIELD} VALUE={requiredYield}/>
                <div className={"custom_rec_button_section"}>
                    <CustomButton
                        CLASS_NAME={"customButton"}
                        BTN_NAME={commonConfig[selectedLanguage].SELECT_BTN}
                        ON_CLICK={ON_CLICK_CARD}
                        STYLE={{backgroundColor: 'white', color: 'green'}}/>
                </div>

            </div>
        </div>
    )
}

export default RecommendCard;
