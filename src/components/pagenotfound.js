import React from 'react'
import Nav from "../components/Nav/Nav";
import Helmet from "react-helmet";
import '../styles/pagenotfound.css'
import imageUrl from "../../src/assets/images/page_not_found.svg";
export default function pagenotfound() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <Nav sticky="false" transp="false" />
            <div style={{paddingTop:"4rem"}} id="main_container">
                <img src={imageUrl} alt="404image"/>
                <span className="text">The page you were looking for does not exist</span>
            </div>
        </>
    )
}
