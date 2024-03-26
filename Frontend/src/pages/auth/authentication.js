import React, {useEffect, useState} from "react";
import './authentication.css';
import authLogo from '../../assets/images/logo.png';
import authImage from '../../assets/images/auth-bg.png';
import SignUp from "../signUp/signUp";
import SignIn from "../signIn/signIn";
import commonConfig from '../../config/commonConfig.json';

const Authentication = () => {

    const [showPage, setShowPage] = useState(false);

    const loadingSignInPage = () => {
        setShowPage(true);
    };

    const loadingSignUpPage = () => {
        setShowPage(false);
    };

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
        <div className={"container auth_main_section"}>
            {/*LEFT SIDE ============================================================================================*/}
            <div className={"auth_side_section flex_center flex_col auth_border"}>
                <div className={"auth_left_header flex_center"}>

                    {/*LOGO =========================================================================================*/}
                    <div className={"auth_icon_section flex_center"}>
                        <img src={authLogo} className={"auth_icon"} alt={authLogo}/>
                    </div>

                    {/*TITLE =========================================================================================*/}
                    <h2> {commonConfig[selectedLanguage].GOVI_NAME} </h2>
                </div>
                <p className={"auth_p_rev"}>{commonConfig[selectedLanguage].REV_AGRI} </p>
                <div className={"auth_image_section flex_center"}>
                    <img src={authImage} alt={authImage} className={"auth_img"}/>
                </div>
            </div>

            {/*RIGHT SIDE ============================================================================================*/}
            <div className={"auth_side_section"}>
                {!showPage ? (
                    <SignUp goToSignIn={loadingSignInPage}/>
                ) : (
                    <SignIn goToSignUp={loadingSignUpPage}/>
                )}
            </div>
        </div>
    )
}

export default Authentication;
