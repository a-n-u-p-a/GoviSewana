import React, {useState} from "react";
import './welcome.css';
import wel_Logo from '../../assets/images/logo.png';
import wel_Name_Logo from '../../assets/images/govisewana.png';
import CustomTitle from "../../components/customTitle";
import commonConfig from '../../config/commonConfig.json';
import CustomButton from "../../components/customButton";
import {useNavigate} from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('selectedLanguage') || 'ENG');

    const handleSelectChange = (event) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        localStorage.setItem('selectedLanguage', newLanguage);
    }

    const loadingAuth = () => {
        navigate('/auth', {replace: true})
    }

    return (
        <div className={"container  wel_main_section flex_center"}>

            {/*LEFT SITE SECTION ====================================================================================*/}
            <div className={"wel_side_section wel_img flex_center flex_col wel_bg_color1"}>

                <img src={wel_Logo} alt={wel_Logo} className={"wel_logo"}/>
                <img src={wel_Name_Logo} alt={wel_Name_Logo} className={"wel_name_logo"}/>

                <div className={"wel_space"}/>

                <CustomTitle TITLE={commonConfig.ENG.WELCOME}/>
                <CustomTitle TITLE={commonConfig.SIN.WELCOME}/>
                <CustomTitle TITLE={commonConfig.TAM.WELCOME}/>

            </div>

            {/*RIGHT SITE SECTION ===================================================================================*/}
            <div className={"wel_side_section wel_bg_color1 flex_center flex_col"}>

                <div className={"wel_select_lang flex_center"}>
                    <p>
                        {commonConfig[selectedLanguage].SELECT_LAN}
                    </p>
                    <select className={"wel_combo_box"} value={selectedLanguage} onChange={handleSelectChange}>
                        <option value="ENG">English</option>
                        <option value="SIN">Sinhala</option>
                        <option value="TAM">Tamil</option>
                    </select>
                </div>

                <h1 className={"wel_title_1"}> {commonConfig[selectedLanguage].WELCOME_TITLE} </h1>

                <p className={"wel_title_2"}>
                    {commonConfig[selectedLanguage].WELCOME_P}
                </p>

                <div className={"wel_button_section"}>
                    <CustomButton
                        BTN_NAME={commonConfig[selectedLanguage].BTN_EXP}
                        CLASS_NAME={"customButton wel_button"}
                        ON_CLICK={loadingAuth}/>
                </div>
            </div>
        </div>
    )
}

export default Welcome;
