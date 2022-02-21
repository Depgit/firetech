import React from "react";
import Home from "../images/Home.svg";
import Profileicon from "../images/profile-icon.svg";
import './navbar.css';

export default function NevLeft(props) {
    return (
        <div>
            <div className="mobile">
                <img src={Home} className="nav-img h-50 " alt="..." />
                <img src={Profileicon} className="nav-img h-50 mx-3" alt="..." />
            </div>
            <div className="desktop">
                <div className="d-flex">
                    <a href='#' className="text-decoration-none text-dark"><h6>Home</h6></a>
                    <a href='#' className="mx-2 text-decoration-none text-dark"><h6>Profile</h6> </a>
                    <a href='#' className="mx-0 text-decoration-none text-dark"
                        onClick={() => {
                            props.setTopRender(!props.topRender)
                        }}
                    ><h6>Rankers</h6> </a>
                </div>
            </div>
        </div>
    );
}

