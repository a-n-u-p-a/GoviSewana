import React, {useEffect, useState} from "react";
import './potatoesContent.css';
import commonConfig from '../../../config/commonConfig.json';
import CustomButton from "../../../components/customButton";
import 'remixicon/fonts/remixicon.css';

const PotatoesContent = ({onChangePage, BACK_TO_MAIN}) => {

    const [pageTitle, setPageTitle] = useState('');

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const cultivationContent = sessionStorage.getItem('cultivationContent')
        setPageTitle(cultivationContent)
    }, []);

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    const selectSoil = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'SOIL');
    }

    const selectPlanting = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'PLANTING');
    }

    const selectFer = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'FERTILIZING');
    }

    const selectRECOMMEND = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'RECOMMEND');
    }

    const selectDISEASES = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'DISEASES');
    }

    const selectHARVESTING = () => {
        onChangePage('PotatoesDetail');
        sessionStorage.setItem('selectTips', 'HARVESTING');
    }

    return (

        <div className={"container pot_content_main_section flex_col"}>

            <div className={"pot_content_container"}>
                <div className={"pot_content_button"}>
                    <CustomButton
                        ON_CLICK={BACK_TO_MAIN}
                        BTN_NAME={"BACK"}
                        CLASS_NAME={"customButton"}
                    />
                </div>
                <div className={"space_pot"}/>
                <div className={"pot_content_header flex_center"}>
                    <h1> {pageTitle} </h1>
                </div>
            </div>
        
            <div className={"pot_content_section"}>

                <h2 className={"pot_content_txt"} style={{marginTop: "2%"}}
                    onClick={selectSoil}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].SOIL} </h2> <br></br>
                <h2 className={"pot_content_txt"} 
                    onClick={selectPlanting}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].DISTANCE_PLANTS_AND_PLANTING_SEEDS} </h2><br></br>
                <h2 className={"pot_content_txt"}
                    onClick={selectFer}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].FERTILIZING}</h2><br></br>
                <h2 className={"pot_content_txt"}
                    onClick={selectRECOMMEND}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].RECOMMENDED_SPECIES}  </h2> <br></br>
                <h2 className={"pot_content_txt"}
                    onClick={selectDISEASES}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].DISEASES_AND_PESTICIDES} </h2><br></br>
                <h2 className={"pot_content_txt"}
                    onClick={selectHARVESTING}> <i class="ri-plant-line"></i>&nbsp; {commonConfig[selectedLanguage].HARVESTING} </h2><br></br>

            </div>

        </div>
    )
}

export default PotatoesContent;
