import React, {useEffect, useState} from "react";
import './signUp.css';
import '../auth/authentication.css';
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import {FaIdCard, FaMobileAlt, FaUser} from "react-icons/fa";
import commonConfig from '../../config/commonConfig.json';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = ({goToSignIn}) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);


    const [fullName, setFullName] = useState("");
    const [nic, setNic] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleNumberChange = (e) => {
        setMobileNumber("+94" + e.target.value);
        setUsername("@user" + e.target.value);
    }
    const handleNameChange = (e) => {
        setFullName(e.target.value);
    }
    const handleNicChange = (e) => {
        setNic(e.target.value);
    }

    let postData = {
        "Username": username,
        "Mobile_Number": mobileNumber,
        "Full_Name": fullName,
        "NIC": nic,
    };

    const handleButtonClick = async () => {
        try {
            const url = 'https://govi-sewana-back-end-final-3yc5uvvuza-uc.a.run.app/signup/register_details/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            alert(postData["Mobile_Number"])
            if (response.ok) {
                console.log(response.status)
                console.log("response ok,user is not registered")
                console.log("OTP sent successfully!");
                navigate('/otp', {replace: true, state: {postData: postData}});
            } else {
                console.log(response.status)
                alert('user is already registered, goto sign in')
                console.log('user is already registered, goto sign in')
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

    const signUpFunction = () => {

        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const nicRegex = /^(\d{9}[vVxX]|\d{4}[\s-]?\d{4}[\s-]?\d{4})$/;
        const mobileNumberRegex = /^(?:\+?94)?(?:0|94)?[1-9]\d{8}$/;

        if (nameRegex.test(fullName)) {
            if (nicRegex.test(nic)) {
                if (mobileNumberRegex.test(mobileNumber)) {
                    handleButtonClick()
                } else {
                    Swal.fire({
                        title: "Invalid Field",
                        text: "please enter valid mobile number",
                        icon: "question"
                    });
                }
            } else {
                Swal.fire({
                    title: "Invalid Field",
                    text: "please enter valid nic",
                    icon: "question"
                });
            }
        } else {
            Swal.fire({
                title: "Invalid Field",
                text: "please enter valid full name",
                icon: "question"
            });
        }
    }

    return (
        <div className={"container sign_main_section flex_col"}>
            <h1>  {commonConfig[selectedLanguage].SIGNUP_TITLE} </h1>

            <div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].FULL_NAME}
                             PLACEHOLDER={commonConfig[selectedLanguage].ENTER_NAME} icon={FaUser}
                             ON_CHANGE={handleNameChange}/>
            </div>

            <div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].NIC}
                             PLACEHOLDER={commonConfig[selectedLanguage].NIC} icon={FaIdCard}
                             ON_CHANGE={handleNicChange}/>
            </div>

            <div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].MOBILE_NO}
                             PLACEHOLDER={commonConfig[selectedLanguage].ENTER_NO} icon={FaMobileAlt}
                             ON_CHANGE={handleNumberChange}/>
            </div>

            <div className={"signUp_button_section"}>
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_SIGNUP} CLASS_NAME={"customButton"}
                              ON_CLICK={signUpFunction}/>
            </div>

            <p className={"sign_p"}>{commonConfig[selectedLanguage].HAVE_ACC}
                <span onClick={goToSignIn} className={"sign_span"}>  {commonConfig[selectedLanguage].BTN_SIGNIN} </span>
            </p>

        </div>
    )
}

export default SignUp;

