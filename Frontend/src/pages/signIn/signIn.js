import React, {useEffect, useState} from "react";
import '../auth/authentication.css';
import '../../assets/css/responsive.css';
import './signIn.css';
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import {useNavigate} from "react-router-dom";
import commonConfig from '../../config/commonConfig.json';
import {FaIdCard, FaMobileAlt, FaUser} from "react-icons/fa";
import Swal from "sweetalert2";

const SignIn = ({goToSignUp}) => {

    const [showInput1, setShowInput1] = useState(true);
    const [showInput2, setShowInput2] = useState(true);

    const handleInput1Focus = () =>{
        setShowInput2(false)
    }

    const handleInput2Focus = () =>{
        setShowInput1(false)
    }

    const handleInput1Blur = () =>{
        setShowInput2(true)
    }

    const handleInput2Blur = () =>{
        setShowInput1(true)
    }

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    const [mobileNumber, setMobileNumber] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setMobileNumber("+94" + e.target.value);
    }

    let postData = {
        "Mobile_Number": mobileNumber,
    };

    // const goToOtp = () => {
    //     handleButtonClick()
    // }

    const handleButtonClick = async () => {
        try {
            const url = 'https://govi-sewana-back-end-final-3yc5uvvuza-uc.a.run.app/login/send_otp/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            alert(postData["Mobile_Number"])

            if (response.ok) {
                const responseData = await response.json();   // Parse the JSON from the response
                console.log("OTP sent successfully!");
                localStorage.setItem('Username', responseData['Username'])
                postData = {
                    "Mobile_Number": mobileNumber,
                    "Username": responseData["Username"]
                }
                navigate('/otp', {replace: true, state: {postData: postData}});
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Is Not Registered",
                    footer: '<a href="#">Please try again?</a>'
                });
            }
        } catch (err) {
            console.error('Network error:', err);
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Network Error",
                footer: '<a href="#">Please try again?</a>'
            });
        }
    }

    const signInFunction = () => {
        const mobileNumberRegex = /^(?:\+?94)?(?:0|94)?[1-9]\d{8}$/;
        if (mobileNumberRegex.test(mobileNumber)) {
            handleButtonClick()
        } else {
            Swal.fire({
                title: "Invalid Field",
                text: "please enter valid mobile number",
                icon: "question"
            });
        }
    }

    return (
        <div className={"container sign_main_section flex_col container sign_main_section flex_col"}>
            <h1> {commonConfig[selectedLanguage].SIGNIN_TITLE}</h1>
            

            {showInput1 && (<div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].EMAIL}
                             PLACEHOLDER={commonConfig[selectedLanguage].EMAIL} icon={FaIdCard}
                             ON_CHANGE={handleInputChange}
                             ON_FOCUS={handleInput1Focus}
                             ON_BLUR={handleInput1Blur}/>
            </div>)}

            {showInput1 && (<div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].PASSWORD}
                             PLACEHOLDER={commonConfig[selectedLanguage].PASSWORD} icon={FaMobileAlt}
                             ON_CHANGE={handleInputChange}
                             ON_FOCUS={handleInput1Focus}
                             ON_BLUR={handleInput1Blur}/>
            </div>)}

            {showInput1 && showInput2 && (<p><h2>Use Email or Mobile login</h2></p>)}

            {showInput2 && (<div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].MOBILE_NO}
                             PLACEHOLDER={commonConfig[selectedLanguage].ENTER_NO} icon={FaMobileAlt}
                             ON_CHANGE={handleInputChange}
                             ON_FOCUS={handleInput2Focus}
                             ON_BLUR={handleInput2Blur}/>
            </div>)}

            <div className={"signIn_button_section flex_center"}>
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_SIGNIN} CLASS_NAME={"customButton"}
                              ON_CLICK={signInFunction}/>
            </div>

            <div className={"signUp_button_section"}>
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_SIGNUP} ON_CLICK={goToSignUp}
                              CLASS_NAME={"customButton"}/>
            </div>

            <p className={"sign_p"}>{commonConfig[selectedLanguage].NO_ACC} ?
                {/*<span onClick={goToSignUp} className={"sign_span"}>{commonConfig[selectedLanguage].BTN_SIGNUP}</span>*/}
            </p>

        </div>
    )
}

export default SignIn;
