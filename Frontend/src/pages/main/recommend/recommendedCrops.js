import React, {useEffect, useState} from "react";
import './recommendedCrops.css';
import potatoImg from '../../../assets/images/potato.png';
import carrotImg from '../../../assets/images/carrot.png';
import beetRootImg from '../../../assets/images/beetroot.png';
import RecommendCard from "../../../components/recommendCard";
import commonConfig from '../../../config/commonConfig.json';

const RecommendedCrops = ({ON_CLICK_CROP}) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    const [weekNo, setWeekNo] = useState("");

    useEffect(() => {
        fetchData(); // Run fetchTabeleData only once when the component mounts
    }, []);

    async function fetchData() {
        try {
            let url = 'https://govisewana-n5bcf5twmq-uc.a.run.app/cropRecommendation/displayWeekNo/';
            let response = await fetch(url);
            let result = await response.json();
            setWeekNo(result.Week_No)
            // console.log(result);
        } catch (err) {
            console.error('Network error:', err);
        }
    }


    return (
        <div className={"container rec_main_section"}>
            <div className={"rec_sub_main_section flex_col flex_justify"}>

                <div className={"rec_top_section flex_align"}>
                    <h1>{commonConfig[selectedLanguage].RECOMMENDED} <br/> {commonConfig[selectedLanguage].CROP_DES}
                    </h1>
                </div>
                <div className={"rec_separator"}/>
                <div className={"flex_align"}>
                    <h3>{commonConfig[selectedLanguage].WEEK_NO} : </h3>
                    <h3 className={"rec_week_number"}> {weekNo} </h3>
                </div>
                <div className={"rec_card_section flex_col"}>
                    <div className={"rec_card_sub_section flex_align"}>
                        <RecommendCard
                            SOURCE_IMG={potatoImg}
                            ALT_IMG={potatoImg}
                            ON_CLICK_CARD={ON_CLICK_CROP}
                            ITEM_NAME={commonConfig[selectedLanguage].POTATO}
                            CROP_TYPE={"Potato"}
                        />
                        <RecommendCard
                            SOURCE_IMG={carrotImg}
                            ALT_IMG={carrotImg}
                            ITEM_NAME={commonConfig[selectedLanguage].CARROT}
                            CROP_TYPE={"Carrot"}
                            ON_CLICK_CARD={ON_CLICK_CROP}
                        />
                        <RecommendCard
                            SOURCE_IMG={beetRootImg}
                            ALT_IMG={beetRootImg}
                            ON_CLICK_CARD={ON_CLICK_CROP}
                            ITEM_NAME={commonConfig[selectedLanguage].BEETROOT}
                            CROP_TYPE={"BeetRoot"}/>
                    </div>
                    {/* <div className={"rec_card_sub_section flex_align"}>
                        <RecommendCard SOURCE_IMG={carrotImg} ALT_IMG={carrotImg} ITEM_NAME={"Carrot"}/>
                        <RecommendCard SOURCE_IMG={potatoImg} ALT_IMG={potatoImg} ITEM_NAME={"Potato"}/>
                        <RecommendCard SOURCE_IMG={beetRootImg} ALT_IMG={beetRootImg} ITEM_NAME={"BeetRoot"}/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default RecommendedCrops;
