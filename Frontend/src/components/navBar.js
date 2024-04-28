import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBrain,
    faDollar,
    faGaugeHigh,
    faLightbulb,
    faRightFromBracket,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import navTitleLogo from '../assets/images/govisewana.png'
import nav_accountImg from '../assets/images/account_img.png'
import CustomIconButton from "./customIconButton";
import commonConfig from '../config/commonConfig.json';


const NavBar = ({PROFILE_ON_CLICK, PRE_ON_CLICK, REC_ON_CLICK, PRI_ON_CLICK, CUL_ON_CLICK, WElCOME_ON_CLICK }) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);

    const handleLogout = () => {
        // Redirect to localhost:3000
        window.location.href = 'https://govisewana.vercel.app';
      };

    return (
        <div className={"container nav_main_section flex_col"}>

            <div className={"nav_icon_section"}>
                <FontAwesomeIcon icon={faBars}/>
            </div>

            <div className={"nav_title_section flex_center"}>
                <img src={navTitleLogo} alt={navTitleLogo} className={"nav_title_logo"}/>
            </div>

            <div className={"nav_profile_section flex_center flex_col"}>
                <img src={nav_accountImg} alt={nav_accountImg} className={"nav_profile_img"}/>
                <p className={"nav_profile_p"}> YOUR NAME <br/> 071 234 5678 </p>
            </div>

            <div className={"nav_separator"}/>
            <div className={"nav_account_section"}>

                <div className={"nav_account_button"}>
                    <CustomIconButton ICON={faUser} TITLE={commonConfig[selectedLanguage].PROFILE} ON_CLICK={PROFILE_ON_CLICK}/>
                </div>

                <div className={"nav_account_button"}>
                    <CustomIconButton ICON={faBrain} TITLE={commonConfig[selectedLanguage].PREDICTION} ON_CLICK={PRE_ON_CLICK}/>
                </div>

                <div className={"nav_account_button"}>
                    <CustomIconButton ICON={faGaugeHigh} TITLE={commonConfig[selectedLanguage].REC} ON_CLICK={REC_ON_CLICK}/>
                </div>

                <div className={"nav_account_button"}>
                    <CustomIconButton ICON={faDollar} TITLE={commonConfig[selectedLanguage].PRICE} ON_CLICK={PRI_ON_CLICK}/>
                </div>

                <div className={"nav_account_button"}>
                    <CustomIconButton ICON={faLightbulb} TITLE={commonConfig[selectedLanguage].CULT}  ON_CLICK={CUL_ON_CLICK}/>
                </div>

            </div>
            <div className={"nav_separator"}/>
            <div className={"nav_bottom_section"}>

            <br></br>
            

                <div className={"nav_account_bottom_button"}>
                    <CustomIconButton ICON={faRightFromBracket} TITLE={commonConfig[selectedLanguage].LOGOUT} ON_CLICK={handleLogout}/>
                </div>

            </div>
        </div>
    )
}

export default NavBar;
