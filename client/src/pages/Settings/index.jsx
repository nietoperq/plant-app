import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import ChangeProfilePicture from "../../components/Settings/ChangeProfilePicture";
import ChangePassword from "../../components/Settings/ChangePassword";
import ChangeLocation from "../../components/Settings/ChangeLocation";

import * as Pages from "../../shared_styles/Pages";
import * as Styled from "./styles";

const pictures = require.context("../../../public/img/profile_pictures", true);

function Settings() {
    const [changePicture, setChangePicture] = useState(null);
    const [changePassword, setChangePassword] = useState(null);
    const [changeLocation, setChangeLocation] = useState(null);

    return (
        <Pages.Container>
            <Sidebar />
            <Pages.Section>
                <h2>Settings</h2>
                <Pages.ClickableSpan onClick={() => setChangePicture(true)}>
                    Change profile picture
                </Pages.ClickableSpan>
                <Pages.ClickableSpan onClick={() => setChangePassword(true)}>
                    Change password
                </Pages.ClickableSpan>
                <Pages.ClickableSpan onClick={() => setChangeLocation(true)}>
                    Change location
                </Pages.ClickableSpan>
            </Pages.Section>
            {changePicture && (
                <Modal handleClick={() => setChangePicture(false)}>
                    <ChangeProfilePicture />
                </Modal>
            )}
            {changePassword && (
                <Modal handleClick={() => setChangePassword(false)}>
                    <ChangePassword />
                </Modal>
            )}
            {changeLocation && (
                <Modal handleClick={() => setChangeLocation(false)}>
                    <ChangeLocation />
                </Modal>
            )}
        </Pages.Container>
    );
}

export default Settings;
