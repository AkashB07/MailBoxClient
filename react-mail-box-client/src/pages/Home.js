import React, { Fragment } from "react";

import Header from "../component/Layout/Header";

const HomePage = () => {
    return (
        <Fragment>
            <Header />
            <div className="row justify-content-center">
                <h1 className="text-center fw-bold"> Welcome To Mail Box</h1>
            </div>
        </Fragment>
    )

}

export default HomePage;