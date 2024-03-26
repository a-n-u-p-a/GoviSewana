import React from "react";
import './cultivationTips.css';
import {useState,useEffect} from "react";
import commonConfig from '../../../config/commonConfig.json';
import potatoImg from '../../../assets/images/potato.png';
import carrotImg from '../../../assets/images/carrot.png';
import beetImg from '../../../assets/images/beetroot.png';
import CultivationCard from "../../../components/cultivationCard";

const CultivationTips = ({BTN_POTATO, BTN_CARROT, BTN_BEET}) => {

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
        <div className={"container cul_main_section flex_col"}>

            <div className={"cul_header_section flex_center"}>
                <h1> {commonConfig[selectedLanguage].CULTIVATION_TIPS} </h1>
            </div>

            <div className={"cul_content_section flex_center flex_col"}>

                <div className={"cul_content_title flex_align"}>
                    <h2> {commonConfig[selectedLanguage].TIPS_FOR_CROPS }</h2>
                </div>

                <div className={"cul_content_card_section flex_center"}>

                    <div className={"cul_card_section flex_center res_cultivation_card_section"}>
                        <CultivationCard
                            SOURCE_IMG={potatoImg}
                            ALT_IMG={potatoImg}
                            TITLE={commonConfig[selectedLanguage].POTATO}
                            BTN_READ_MORE={BTN_POTATO}
                        />
                    </div>

                    <div className={"cul_card_section flex_center"}>
                        <CultivationCard
                            SOURCE_IMG={carrotImg}
                            ALT_IMG={carrotImg}
                            TITLE={commonConfig[selectedLanguage].CARROT}
                            BTN_READ_MORE={BTN_CARROT}
                        />
                    </div>

                    <div className={"cul_card_section flex_center"}>
                        <CultivationCard
                            SOURCE_IMG={beetImg}
                            ALT_IMG={beetImg}
                            BTN_READ_MORE={BTN_BEET}
                            TITLE={commonConfig[selectedLanguage].BEETROOT}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CultivationTips;
