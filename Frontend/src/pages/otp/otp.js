import React, {useEffect, useState} from "react";
import './otp.css'
import otpImage from '../../assets/images/otp_img.jpg'
import CustomOtpBox from "../../components/customOtpBox";
import CustomButton from "../../components/customButton";
import {useNavigate, useLocation} from "react-router-dom";
import commonConfig from '../../config/commonConfig.json';
import Swal from "sweetalert2";

const Otp = () => {

    // const navigate = useNavigate();

    // const navigateMainForm = () => {
    //     navigate('/main', {replace: true})
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


    const location = useLocation();
    const userRegData = location.state?.postData;
    const mobileNumber = userRegData?.Mobile_Number;
    const username = userRegData?.Username;
    const fullName = userRegData?.Full_Name;
    const nic = userRegData?.NIC;
    const navigate = useNavigate();

    localStorage.setItem("Username", username);

    // const numbers = [];
    const [input_1, setInput_1] = useState("");
    const [input_2, setInput_2] = useState("");
    const [input_3, setInput_3] = useState("");
    const [input_4, setInput_4] = useState("");

    const handleInput = (setInput, event) => {
        setInput(event.target.value);
    }

    // numbers.push(input_1.toString());
    // numbers.push(input_2.toString());
    // numbers.push(input_3.toString());
    // numbers.push(input_4.toString());

    // const numberString = numbers.join('');
    const numberString = input_1+input_2+input_3+input_4+input_4;
    const enteredOTP = {
        "Mobile_Number": mobileNumber,
        "Entered_Otp": numberString,
        "Username": username,
        "Full_Name": fullName,
        "NIC": nic,
    }

    const navigateMainForm = () => {
        alert(enteredOTP["Entered_Otp"])
        console.log(JSON.stringify(enteredOTP));
        passOTP()
    }

    // fetch function for sending otp
    const passOTP = async () => {
        try {
            const url = 'https://govisewana-3yc5uvvuza-uw.a.run.app/login/verify_otp/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enteredOTP)
            });
            if (response.ok) {
                navigate('/main', {replace: true})
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Wrong OTP",
                    icon: "error"
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Error",
                icon: "error"
            });
            console.log(err)
        }
    }

    // fetch function for resending otp
    const resendOTP = async () => {
        try {
            const url = 'https://govisewana-3yc5uvvuza-uw.a.run.app/signup/register_details/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enteredOTP)
            });
            if (response.ok) {
                console.log('resend otp successfull')
            }
        } catch (err) {
            alert('error')
            console.log(err)
        }
    }

    // State to manage resend OTP attempts (optional)
    const [resendAttempts, setResendAttempts] = useState(0);

    const handleResendOtp = async () => {
        // Prevent too many resend attempts
        if (resendAttempts >= 3) {
            Swal.fire({
                title: "Warning",
                text: "You have reached the maximum number of resend attempts.",
                icon: "question"
            });
            return;
        }
        // Increment the resend attempt counter
        setResendAttempts(resendAttempts + 1);
        console.log("Resending OTP...");
        resendOTP();
        Swal.fire({
            title: "Success",
            text: "OTP has been resent!",
            icon: "success"
        });
    };


    return (
        <div className={"container flex_col otp_main_section"}>
            <h2> {commonConfig[selectedLanguage].OTP_TITLE}</h2>

            <div className={"ot_top_section flex_center"}>

                <div className={"otp_side_section flex_center"}>
                    <img src={otpImage} alt={otpImage} className={"ot_img"}/>
                </div>

                <div className={"otp_side_section flex_col flex_center"}>
                    <p className={"otp_p"}>{commonConfig[selectedLanguage].OTP_P1} <br/>
                        {commonConfig[selectedLanguage].OTP_P2}</p>
                    <p> {mobileNumber} </p>
                    <div className={"otp_box_section flex_center"}>
                        <div className={"otp_box_sub flex_center"}>
                            <CustomOtpBox ON_CHANGE={(event) => handleInput(setInput_1, event)}/>
                        </div>
                        <div className={"otp_box_sub flex_center"}>
                            <CustomOtpBox ON_CHANGE={(event) => handleInput(setInput_2, event)}/>
                        </div>
                        <div className={"otp_box_sub flex_center"}>
                            <CustomOtpBox ON_CHANGE={(event) => handleInput(setInput_3, event)}/>
                        </div>
                        <div className={"otp_box_sub flex_center"}>
                            <CustomOtpBox ON_CHANGE={(event) => handleInput(setInput_4, event)}/>
                        </div>
                    </div>

                    <div className={"otp_button_section"}>
                        <CustomButton CLASS_NAME={"customButton"} BTN_NAME={commonConfig[selectedLanguage].BTN_VERIFY}
                                      ON_CLICK={navigateMainForm}/>
                    </div>

                    <p className={"otp_p2"}>
                        {commonConfig[selectedLanguage].NOT_RECEIVE} <span
                        className={"otp_span"} onClick={handleResendOtp}>{commonConfig[selectedLanguage].RESEND}</span>
                    </p>

                </div>
            </div>

            <div className={"otp_footer_section flex_center flex_col"}>
                <p className='otp_p1'>{commonConfig[selectedLanguage].UNABLE_OTP}</p>
                <p className='otp_call'>{commonConfig[selectedLanguage].CALL_US} <span className={"otp_span1"}>011-234 5678</span>
                </p>
            </div>
        </div>
    )
}

export default Otp;
