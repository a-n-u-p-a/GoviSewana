import React, {useEffect, useState} from "react";
import './signUp.css';
import '../auth/authentication.css';
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomPasswordInput from "../../components/customPasswordInput";
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
    const [mobileNumber, setMobileNumber] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNumberChange = (e) => {
        setMobileNumber("+94" + e.target.value);
        setUsername("@user" + e.target.value);
    }
    const handleNameChange = (e) => {
        setFullName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let postData = {
        "Username": username,
        "Mobile_Number": mobileNumber,
        "Full_Name": fullName,
        "Email": email,
        "Password": password,
    };

    

    const handleButtonClick = async () => {
        try {
            const url = 'https://govisewana-3yc5uvvuza-uw.a.run.app/signup/register_details/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                console.log(response.status)
                console.log("response ok,user is not registered")
                // console.log("OTP sent successfully!");
                // const responseData = await response.json();   
                // localStorage.setItem('Username', responseData['Username'])
                navigate('/main', {replace: true, state: {postData: postData}});
            } else {
                console.log(response.status)
                Swal.fire({
                    title: "Already Registered",
                    text: "Please goto signin page",
                    icon: "warning"
                });
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
        // Check if any of the input fields are empty
        if (!fullName.trim() || !email.trim() || !mobileNumber.trim() || !password.trim()) {
            Swal.fire({
                title: "Empty Field",
                text: "Please fill in all the required fields",
                icon: "error"
            });
            return; // Exit the function early if any field is empty
        }
    
        // Regular expressions for validation
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileNumberRegex = /^(?:\+?94)?(?:0|94)?[1-9]\d{8}$/;
    
        // Check if full name, email, mobile number, and password formats are valid
        if (!nameRegex.test(fullName)) {
            Swal.fire({
                title: "Invalid Field",
                text: "Please enter a valid full name",
                icon: "error"
            });
        } else if (!emailRegex.test(email)) {
            Swal.fire({
                title: "Invalid Field",
                text: "Please enter a valid email address",
                icon: "error"
            });
        } else if (!mobileNumberRegex.test(mobileNumber)) {
            Swal.fire({
                title: "Invalid Field",
                text: "Please enter a valid mobile number",
                icon: "error"
            });
        } else {
            // All fields are valid, proceed with sign up
            handleButtonClick();
            localStorage.setItem("Username", username);
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
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].EMAIL}
                             PLACEHOLDER={commonConfig[selectedLanguage].EMAIL} icon={FaIdCard}
                             ON_CHANGE={handleEmailChange}/>
            </div>

            <div className={"sign_text_section flex_center"}>
                <CustomPasswordInput LABEL_NAME={commonConfig[selectedLanguage].PASSWORD}
                             PLACEHOLDER={commonConfig[selectedLanguage].PASSWORD} icon={FaMobileAlt}
                             ON_CHANGE={handlePasswordChange}/>
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

