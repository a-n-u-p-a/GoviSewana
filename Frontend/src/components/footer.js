import React, {useEffect} from "react";
import {useState} from "react";
import commonConfig from '../config/commonConfig.json';
import foLogo from '../assets/images/logo.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube} from 'react-icons/fa';

const Footer = () => {

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
        <div className="container fo_main_section flex_col">

            <div className={"fo_top_section flex_center"}>

                <div className={"fo_mid_section flex_align"}>
                    <div className={"fo_sub_section1 flex_center"}>
                        <img src={foLogo} alt={foLogo} className={"foLogo"}/>
                    </div>
                    <h2 className={"fo_p"}>{commonConfig[selectedLanguage].GOVI_TITLE}</h2>
                </div>
                <div className={"fo_mid_section fo_address"}>
                    <p className="fo_p"><FontAwesomeIcon icon={faMapMarkerAlt} className="fo_icons"/>&nbsp;&nbsp;
                        {commonConfig[selectedLanguage].ADDRESS}
                    </p>

                    <p className="fo_p">
                        <FontAwesomeIcon icon={faPhone} className="fo_icons"/>&nbsp;+94 766 760 760
                    </p>
                </div>
                <div className={"fo_mid_section flex_center flex_col"}>

                    <div className={"fo_social_section flex_center"}>

                        <div className={"fo_social_title flex_align"}>
                            <p className="">{commonConfig[selectedLanguage].SOCIAL_MEDIA}</p>
                        </div>

                        <div className={"fo_social_content flex_align"}>
                            <p className="fo_social_icon"><FaFacebookF/></p>
                            <p className="fo_social_icon"><FaTwitter/></p>
                            <p className="fo_social_icon"><FaLinkedinIn/></p>
                            <p className="fo_social_icon"><FaYoutube/></p>
                        </div>
                    </div>

                    <div className={"fo_social_section flex_center"}>

                        <div className={"fo_social_title flex_align"}>
                            <p className="">{commonConfig[selectedLanguage].EMAIL_NAME}</p>
                        </div>

                        <div className={"fo_social_content flex_align"}>
                            <p className="fo_social_icon">govisewana@gmail.com</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className={"fo_bottom_section flex_center"}>

                <div className={"fo_bottom_sub1 flex_align"}>
                    <p className={"fo_btn"}>{commonConfig[selectedLanguage].ABOUT_US}</p>
                    <p className={"fo_btn"}>{commonConfig[selectedLanguage].CONTACT_US}</p>
                    <p className={"fo_btn"}>{commonConfig[selectedLanguage].HELP}</p>
                    <p className={"fo_btn"}>{commonConfig[selectedLanguage].PRIV_POLICY}</p>
                    <p className={"fo_btn"}>{commonConfig[selectedLanguage].DISCLAIMER}</p>
                </div>
                <div className={"fo_bottom_sub2 flex_center"}>
                    <p className="fo_btn">{commonConfig[selectedLanguage].COPY_RIGHT}</p>
                </div>

            </div>
        </div>
    )
}

export default Footer;
