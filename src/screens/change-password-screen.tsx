import ChangePasswordForm from "../components/ChangePasswordForm";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "../components/shared/Popup/Popup";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";

const ChangePasswordScreen = () => {
    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox>
                    <ChangePasswordForm />
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
} 

export default ChangePasswordScreen