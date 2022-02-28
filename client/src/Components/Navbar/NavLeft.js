import React from "react";
import Home from "../images/Home.svg";
import Profileicon from "../images/profile-icon.svg";
import contest from "../images/contest.svg";
import './navbar.css';
import { Link } from "react-router-dom";
import createpost from "../Createpost/image/createpost.svg";

export default function NevLeft(props) {



    return (
        <div>
            <div className="mobile">
                <div className="row">
                    <div className="col-10 d-flex">
                        <Link to="/createpost"> <img src={createpost} alt="createpost" className="h-100 me-4" /></Link>
                        <Link to="/contests"> <img src={contest} alt="contest" className="h-100 me-4" /></Link>
                        <Link to="/"> <img src={Home} alt="Home" className="h-100 me-4" /></Link>
                        <Link to="/profile"> <img src={Profileicon} alt="profile" className="h-100 me-4" /></Link>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <div className="desktop">
                <div className="d-flex">
                    <Link to="/"> <a href='#' className="text-decoration-none text-dark"  ><>Home</></a> </Link>
                    <Link to="/profile"> <a href='#' className="text-decoration-none mx-2 text-dark"  ><>Profile</></a> </Link>
                    <Link to="/contests"> <a href='#' className="text-decoration-none text-dark"  ><>Contests</></a> </Link>
                    <Link to="/rankers"> <a href='#' className="text-decoration-none mx-2 text-dark"  ><>Rankers</></a> </Link>
                </div>
            </div>
        </div>
    );
}


