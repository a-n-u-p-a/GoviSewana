import React, {useEffect, useState} from "react";
import '../auth/authentication.css';
import '../../assets/css/responsive.css';
import './signIn.css';
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import CustomPasswordInput from "../../components/customPasswordInput";
import {useNavigate} from "react-router-dom";
import commonConfig from '../../config/commonConfig.json';
import {FaIdCard, FaMobileAlt} from "react-icons/fa";
import Swal from "sweetalert2";

const SignIn = ({goToSignUp}) => {

    const [showInput1, setShowInput1] = useState(true);
    const [showInput2, setShowInput2] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [onbutton, setonbutton] = useState();

    // const handleInput1Focus = () =>{
    //     setShowInput2(false)
    // }

    // const handleInput2Focus = () =>{
    //     setShowInput1(false)
    // }

    // const handleInput1Blur = () =>{
    //     if(onbutton){
    //         return
    //     }else{
    //         setShowInput2(true)
    //     }
    // }

    // const handleInput2Blur = () =>{
    //     if(onbutton){
    //         return
    //     }else{
    //         setShowInput1(true)
    //     }
    // }

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
    }, []);

    const navigate = useNavigate();

    const handleInputEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handleInputPasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    // const handleInputChange = (e) => {
    //     setMobileNumber("+94" + e.target.value);
    // }

    let postData = {
        "Mobile_Number": mobileNumber,
        "Email": email,
        "Password": password,
    };

    // const goToOtp = () => {
    //     handleButtonClick()
    // }

    const handleButtonClick = async () => {
        try {
            if(showInput2){
                const url = 'https://govisewana-production.up.railway.app/login/send_otp/';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

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
                    footer: '<a>Please try again?</a>'
                });
            }
            } else {
                const url = 'https://govisewana-production.up.railway.app/login/check_email/';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

            if (response.ok) {
                const responseData = await response.json();   
                localStorage.setItem('Username', responseData['Username'])
                console.log(responseData['Username'])
                postData = {
                    "Mobile_Number": mobileNumber,
                    "Username": responseData["Username"]
                }
                navigate('/main', {replace: true, state: {postData: postData}});
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Wrong Email or Password!",
                    footer: '<a>Please try again?</a>'
                });
            }
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
        console.log('click')

        // inf none of the login methods are selected alert user

        // if(showInput1 && showInput2){
        //     Swal.fire({
        //         title: "Login",
        //         text: "please select one of the login methods",
        //         icon: "question"
        //     });
        // }else{
        //     handleButtonClick()
        // }

        if(email === "" || password === ""){
            Swal.fire({
                title: "Empty Field",
                text: "Please fill in all the required fields",
                icon: "error"
            });
        }else if(email.indexOf("@") === -1){
            Swal.fire({
                title: "Wrong Email",
                text: "Please enter a correct email",
                icon: "warning"
            });
        }else{
            handleButtonClick()
        }

        // if (mobileNumberRegex.test(mobileNumber)) {
            
        // } else {
        //     Swal.fire({
        //         title: "Invalid Field",
        //         text: "please enter valid mobile number",
        //         icon: "question"
        //     });
        // }
    }

    // const mouseEnterHandle=()=>{
    //     setonbutton(true)
    // }

    // const mouseLeaveHandle=()=>{
    //     setonbutton(false)
    // }

    return (
        <div className={"container sign_main_section flex_col container sign_main_section flex_col"}>
            <h1> {commonConfig[selectedLanguage].SIGNIN_TITLE}</h1>
            

            {showInput1 && (<div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].EMAIL}
                             PLACEHOLDER={commonConfig[selectedLanguage].EMAIL} icon={FaIdCard}
                             ON_CHANGE={handleInputEmailChange}
                            //  ON_FOCUS={handleInput1Focus}
                            //  ON_BLUR={handleInput1Blur}
                            />
            </div>)}

            {showInput1 && (<div className={"sign_text_section flex_center"}>
                <CustomPasswordInput LABEL_NAME={commonConfig[selectedLanguage].PASSWORD}
                             PLACEHOLDER={commonConfig[selectedLanguage].PASSWORD} icon={FaMobileAlt}
                             ON_CHANGE={handleInputPasswordChange}
                            //  ON_FOCUS={handleInput1Focus}
                            //  ON_BLUR={handleInput1Blur}
                             />
            </div>)}

            {/* {showInput1 && showInput2 && (<p><h2>Use Email or Mobile login</h2></p>)} */}

            {/* {showInput2 && (<div className={"sign_text_section flex_center"}>
                <CustomInput LABEL_NAME={commonConfig[selectedLanguage].MOBILE_NO}
                             PLACEHOLDER={commonConfig[selectedLanguage].ENTER_NO} icon={FaMobileAlt}
                             ON_CHANGE={handleInputChange}
                             ON_FOCUS={handleInput2Focus}
                             ON_BLUR={handleInput2Blur}/>
            </div>)} */}

            <div className={"signIn_button_section flex_center"}>
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_SIGNIN} CLASS_NAME={"customButton"}
                              ON_CLICK={signInFunction}
                            //   ON_MOUSE_ENTER={mouseEnterHandle}
                            //   ON_MOUSE_LEAVE={mouseLeaveHandle}
                              />
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
