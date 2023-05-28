import React from "react";
import Sidebar from "../../components/Sidebar";
import ChangeProfilePicture from "../../components/Settings/ChangeProfilePicture";
import ChangePassword from "../../components/Settings/ChangePassword";
import ChangeLocation from "../../components/Settings/ChangeLocation";
import ChangeEmailPreferences from "../../components/Settings/ChangeEmailPreferences";

import * as Pages from "../../shared_styles/Pages";
import * as Styled from "./styles";

function Settings() {
    return (
        <Pages.Container>
            <Sidebar />
            <Pages.Content>
                <Pages.Section>
                    <h2>Settings</h2>
                    <Styled.Settings>
                        <h4>Change profile picture</h4>
                        <ChangeProfilePicture />
                    </Styled.Settings>
                    <Styled.Settings>
                        <h4>Change password</h4>
                        <ChangePassword />
                    </Styled.Settings>
                    <Styled.Settings>
                        <h4>Change location</h4>
                        <ChangeLocation />
                    </Styled.Settings>
                    <Styled.Settings>
                        <h4>E-mail reminders</h4>
                        <ChangeEmailPreferences />
                    </Styled.Settings>
                </Pages.Section>
            </Pages.Content>
        </Pages.Container>
    );
}

export default Settings;
