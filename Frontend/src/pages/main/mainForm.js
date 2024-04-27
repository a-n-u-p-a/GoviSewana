import React, {useState} from "react";
import './mainForm.css';
import NavBar from "../../components/navBar";
import YieldPrediction from "./yieldPrediction/YieldPrediction";
import RecommendedCrops from "./recommend/recommendedCrops";
import Footer from "../../components/footer";
import Prediction from "./prediction/prediction";
import CultivationTips from "./cultivationTips/cultivationTips";
import Account from "./account/account";
import PotatoesContent from "./potatoesContent/potatoesContent";
import PotatoesDetail from "./potatoesDetail/potatoesDetail";
import Welcome from "../../routes/rootRoutes";

const MainForm = () => {

    const [currentPage, setCurrentPage] = useState();

    const handleButtonClick = (page) => {
        setCurrentPage(page);
    };

    const clickCultivationTipsPot = () => {
        setCurrentPage('PotatoesContent')
        sessionStorage.setItem('cultivationContent', 'POTATOES');
    }

    const clickCultivationTipsCar = () => {
        setCurrentPage('PotatoesContent')
        sessionStorage.setItem('cultivationContent', 'CARROT');
    }

    const clickCultivationTipsBeet = () => {
        setCurrentPage('PotatoesContent')
        sessionStorage.setItem('cultivationContent', 'BEETROOT');
    }


    const renderPage = () => {
        switch (currentPage) {
            case 'Profile':
                return <Account/>;

            case 'Welcome':
                return <Welcome/>;

            case 'Prediction':
                return <Prediction/>;

            case 'RecommendedCrops':
                return <RecommendedCrops
                    ON_CLICK_CROP={() => handleButtonClick('YieldPrediction')}
                />;

            case 'PotatoesDetail':
                return <PotatoesDetail BACK_TO_CONTENT={() => handleButtonClick('PotatoesContent')}/>;

            case 'PotatoesContent':
                return <PotatoesContent onChangePage={handleButtonClick} BACK_TO_MAIN={() => handleButtonClick('CultivationTips')}/>;

            case 'CultivationTips':
                return <CultivationTips
                    BTN_POTATO={clickCultivationTipsPot}
                    BTN_CARROT={clickCultivationTipsCar}
                    BTN_BEET={clickCultivationTipsBeet}
                />;

            case 'YieldPrediction':
                return <YieldPrediction
                    ON_CLICK_1={() => handleButtonClick('RecommendedCrops')}
                    ON_CLICK_2={() => handleButtonClick('RecommendedCrops')}
                />;

            default:
                return <RecommendedCrops/>;
        }
    };

    return (
        <div className={"main_form_section"}>
            <div className={"main_form_nav_bar_section"}>
                <NavBar
                    PROFILE_ON_CLICK={() => handleButtonClick('Profile')}
                    PRE_ON_CLICK={() => handleButtonClick('YieldPrediction')}
                    PRI_ON_CLICK={() => handleButtonClick('Prediction')}
                    REC_ON_CLICK={() => handleButtonClick('RecommendedCrops')}
                    CUL_ON_CLICK={() => handleButtonClick('CultivationTips')}
                    WElCOME_ON_CLICK={() => handleButtonClick('Welcome')}
                />
            </div>
            <div className={"main_form_content_section"}>
                {renderPage()}

                <div className={"main_form_footer"}>
                    <Footer/>
                </div>

            </div>
        </div>
    )
}

export default MainForm;
