import React from "react";
import Sidebar from "../../components/Sidebar";

import * as Pages from "../../shared_styles/Pages";

function Profile() {
    return (
        <Pages.Container>
            <Sidebar />
            <div>Profile</div>
        </Pages.Container>
    );
}

export default Profile;
