import React from "react";
import Sidebar from "../../components/Sidebar";

import * as Pages from "../../shared_styles/Pages";

function Settings() {
    return (
        <Pages.Container>
            <Sidebar />
            <div>Settings</div>
        </Pages.Container>
    );
}

export default Settings;
