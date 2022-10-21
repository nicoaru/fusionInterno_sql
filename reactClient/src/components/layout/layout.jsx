import React from "react";
import './layout.css'
import {Header} from "./header/header";
import {Footer} from "./footer/footer"
function Layout({children}) {
    return (
        <main>
            <Header/>
            {children}
            <Footer/>
        </main>
    )

};

export {Layout};