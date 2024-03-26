import React, {useEffect, useState} from "react";
import '../potatoesContent/potatoesContent.css'
import './potatoesDetail.css'
import cultivationTipsConfig from '../../../config/cultivationsData.json';
import CustomButton from "../../../components/customButton";

const PotatoesDetail = ({BACK_TO_CONTENT}) => {

    const [pageTitle, setPageTitle] = useState('');
    const [pageSubTitle, setPageSubTitle] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    useEffect(() => {
        const cultivationContent = sessionStorage.getItem('cultivationContent')
        setPageTitle(cultivationContent);
        const pageSubName = sessionStorage.getItem('selectTips')
        setPageSubTitle(pageSubName);

    }, []);

    const getCultivationTipsConfigText = (title, language, subTitle) => {
        if (cultivationTipsConfig[title] && cultivationTipsConfig[title][language] && cultivationTipsConfig[title][language][subTitle]) {
            const content = cultivationTipsConfig[title][language][subTitle];

            // Split the content by newline character to get each point separately
            const points = content.split('\n');
            // Map through each point and wrap it with <p> tags
            const formattedContent = points.map((point, index) => (
                <p key={index}>{point}</p>
            ));
            return formattedContent;
        }
        return "Text not available";
    };


    return (
        <div className={"container pot_content_main_section flex_col"}>

            <div className={"pot_content_container"}>
                <div className={"pot_content_button"}>
                    <CustomButton
                        ON_CLICK={BACK_TO_CONTENT}
                        BTN_NAME={"BACK"}
                        CLASS_NAME={"customButton"}
                    />
                </div>
                <div className={"space_pot"}/>
                <div className={"pot_content_header flex_center"}>
                    <h1> {pageTitle} </h1>
                </div>
            </div>

            <div className={"pot_detail_section flex_center flex_col res_cul_detail"}>

                <div className={"flex_align "}>
                    <h1 className={"pot_detail_h1"}> {pageSubTitle} </h1>
                </div>

                <div className={"pot_detail_content flex_justify flex_col res_cul_detail_2"}>
                    <p>
                        {getCultivationTipsConfigText(pageTitle, selectedLanguage, pageSubTitle)}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default PotatoesDetail;
