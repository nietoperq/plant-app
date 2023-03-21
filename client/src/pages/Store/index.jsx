import React from "react";
import Sidebar from "../../components/Sidebar";

import * as Pages from "../../shared_styles/Pages";

function Store() {
    return (
        <Pages.Container>
            <Sidebar />
            <div>Store</div>
        </Pages.Container>
    );
}

export default Store;
