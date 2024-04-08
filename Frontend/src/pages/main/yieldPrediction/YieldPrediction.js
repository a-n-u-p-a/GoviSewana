import React, {useEffect, useState} from "react";
import './yieldPrediction.css';
import CropYieldPrediction from "../../../components/cropYieldPrediction";
import TableComponentCarrot from "../../../components/tableComponentCarrot";
import TableComponentPotato from "../../../components/tableComponentPotato";
import carrotImage from '../../../assets/images/carrot.png';
import potatoImage from '../../../assets/images/potato.png';
import CustomButton from "../../../components/customButton";
import commonConfig from '../../../config/commonConfig.json';


const YieldPrediction = ({ON_CLICK_1, ON_CLICK_2}) => {

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
        return localStorage.getItem('selectedLanguage') || 'ENG';
    });

    const [excessSelectCarrot, setExcessSelectCarrot] = useState(null);
    const [excessSelectPot, setExcessSelectPot] = useState(null);

    useEffect(() => {
        const langValue = localStorage.getItem('selectedLanguage');
        if (langValue !== null) {
            setSelectedLanguage(langValue)
        }
        const excess_car = sessionStorage.getItem('excess_car');
        setExcessSelectCarrot(excess_car);

        const excess_pot = sessionStorage.getItem('excess_pot');
        setExcessSelectPot(excess_pot);

    }, [excessSelectCarrot, excessSelectPot]);
    useEffect(() => {
        console.log("excessSelectCarrot " + excessSelectCarrot);
        console.log("excessSelectPot " + excessSelectPot);
    }, [excessSelectCarrot, excessSelectPot]);

    const [selectedCrop, setSelectedCrop] = useState('');

    function handleButtonClick_Yes() {
        // Load existing data from local storage
        const predictionInfoString = localStorage.getItem("predictionInfo");
        const predictionInfo = JSON.parse(predictionInfoString);

        if (predictionInfo.Predicted_Yield !== "") {
            alert("You can grow the selected crop type and extent !");
        } else {
            alert("No prediction has been detected !");
        }
    }

    const handleButtonClick_No = async () => {

        const userName = localStorage.getItem("Username");

        // Load existing data from local storage
        const cropInfoString = localStorage.getItem("cropInfo");
        const cropInfo = JSON.parse(cropInfoString);
        const {Crop_Type, Date_of_Planting, crop_Extent} = cropInfo;

        let inputData = {
            "Username": userName,
            "Crop_Type": Crop_Type,
            "Date_of_Planting": Date_of_Planting,
            "crop_Extent(Acres)": crop_Extent
        };

        // console.log("inputData", inputData);

        try {
            let url = 'https://govi-sewana-back-end-final-3yc5uvvuza-uc.a.run.app/yieldPrediction/delete/';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            // 'GET' response from Back-end 
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                console.log(result);
            } else {
                console.error('Error sending data:', response.status);
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    }

    const renderCropCarrot = () => {
        if (excessSelectCarrot === 'RED') {
            return (
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_Q2_RECCOMED}
                              CLASS_NAME={"customButton res_yie_crop_btn"}
                              ON_CLICK={ON_CLICK_2}
                              STYLE={{height: '90%', width: '80%', border: '1px solid white'}}/>
            );
        } else {
            if (excessSelectCarrot === null) {
            }
        }
    };

    const renderCropPotato = () => {
        if (excessSelectPot === 'RED') {
            return (
                <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_Q2_RECCOMED}
                              CLASS_NAME={"customButton res_yie_crop_btn"}
                              ON_CLICK={ON_CLICK_1}
                              STYLE={{height: '90%', width: '80%', border: '1px solid white'}}/>
            );
        } else {
            if (excessSelectPot === null) {
            }
        }
    };

    return (
        <div className={"container flex_col yie_main_section"}>
            <div className={"yie_sub_main flex_center flex_col"}>
                <div className={"yie_sub_section flex_justify flex_col"}>
                    <h2 className={"res_yie_h2"}> {commonConfig[selectedLanguage].CROP_YIELD_TITLE} </h2>
                    <div className={"yie_top_section flex_center"}>
                        <CropYieldPrediction onCropSelect={setSelectedCrop}/>
                    </div>
                </div>
                <div className={"yie_sub_section flex_justify flex_col"}>
                    <h2 className={"res_yie_h2"}> {commonConfig[selectedLanguage].EXCESS_TB_TITLE} </h2>
                    <div className={"yie_top_section flex_center "}>
                        <div className="crop-container res_yie_table_container">
                            <div className="tblHeader">
                                <div className="flex items-center">
                                    <p>{commonConfig[selectedLanguage].DROPDOWN_CAR}</p>
                                </div>
                                <div>
                                    <img src={carrotImage} alt="Carrot"/>
                                </div>
                            </div>
                            <div className={"yie_table_space"}/>
                            <div className={"res_table_div"}>
                                <TableComponentCarrot/>
                            </div>

                        </div>
                    </div>

                    <div className={"yie_space"}/>

                    {selectedCrop === 'Carrot' && (
                        <div className={"yie_button_section flex_center res_yie_mid_section"}>
                            <div className={"yie_yes_no_section flex_center"}>
                                <div className={"yie_text_section flex_align"}>
                                    <p className="yie_p">{commonConfig[selectedLanguage].BTN_Q1_PRED}</p>
                                </div>
                                <div className={"yie_button_sub1 flex_center"}>
                                    <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_YES}
                                                  CLASS_NAME={"customButton"}
                                                  STYLE={{height: '75%', width: '70%', border: '1px solid white'}}
                                                  ON_CLICK={handleButtonClick_Yes}/>
                                </div>
                                <div className={"yie_button_sub1 flex_center"}>
                                    <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_NO}
                                                  CLASS_NAME={"customButton"}
                                                  STYLE={{height: '75%', width: '70%', border: '1px solid white'}}
                                                  ON_CLICK={handleButtonClick_No}/>
                                </div>
                            </div>
                            <div className={"yie_crop_section flex_center"}>
                                {renderCropCarrot()}

                                {/*<CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_Q2_RECCOMED}*/}
                                {/*              CLASS_NAME={"customButton res_yie_crop_btn"}*/}
                                {/*              STYLE={{height: '90%', width: '80%', border: '1px solid white'}}/>*/}
                            </div>
                        </div>
                    )}

                    <div className={"yie_space"}/>
                    <div className={"yie_separator"}/>
                    <div className={"yie_space"}/>
                    <div className={"yie_top_section flex_center"}>
                        <div className="crop-container res_yie_table_container">
                            <div className="tblHeader">
                                <div className="flex items-center">
                                    <p>{commonConfig[selectedLanguage].DROPDOWN_POTA}</p>
                                </div>
                                <div>
                                    <img src={potatoImage} alt="potatoImage"/>
                                </div>
                            </div>
                            <div className={"yie_table_space"}/>
                            <div className={"res_table_div"}>
                                <TableComponentPotato/>
                            </div>
                        </div>
                    </div>
                    <div className={"yie_space"}/>

                    {selectedCrop === 'Potato' && (
                        <div className={"yie_button_section flex_center res_yie_mid_section"}>
                            <div className={"yie_yes_no_section flex_center"}>
                                <div className={"yie_text_section flex_align"}>
                                    <p className="yie_p">{commonConfig[selectedLanguage].BTN_Q1_PRED}</p>
                                </div>
                                <div className={"yie_button_sub1 flex_center"}>
                                    <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_YES}
                                                  CLASS_NAME={"customButton"}
                                                  STYLE={{height: '75%', width: '70%', border: '1px solid white'}}
                                                  ON_CLICK={handleButtonClick_Yes}/>
                                </div>
                                <div className={"yie_button_sub1 flex_center"}>
                                    <CustomButton BTN_NAME={commonConfig[selectedLanguage].BTN_NO}
                                                  CLASS_NAME={"customButton"}
                                                  STYLE={{height: '75%', width: '70%', border: '1px solid white'}}
                                                  ON_CLICK={handleButtonClick_No}/>
                                </div>
                            </div>
                            <div className={"yie_crop_section flex_center"}>
                                {renderCropPotato()}
                            </div>
                        </div>
                    )}

                    <div className={"yie_space"}/>
                </div>
            </div>
        </div>
    )
}

export default YieldPrediction;
