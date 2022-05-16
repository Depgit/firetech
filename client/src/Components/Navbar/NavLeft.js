import React, { useContext } from "react";
import Home from "../images/Home.svg";
import Profileicon from "../images/profile-icon.svg";
import contest from "../images/contest.svg";
import './navbar.css';
import { Link } from "react-router-dom";
import createpost from "../Createpost/image/createpost.svg";
import { UserContext } from "../../App";
import chat from '../images/chat.svg';

export default function NevLeft(props) {
    const {state,dispatch} = useContext(UserContext);
    
    return (
        <div>
            <div className="mobile">
                <div className="row">
                    <div className="col-8 d-flex">
                        <Link to="/chat"> <img src={chat} alt="chat" className="h-100 me-4" /></Link>
                        <Link to="/createpost"> <img src={createpost} alt="createpost" className="h-100 me-4" /></Link>
                        <Link to="/contests"> <img src={contest} alt="contest" className="h-100 me-4" /></Link>
                        <Link to="/"> <img src={Home} alt="Home" className="h-100 me-4" /></Link>
                        <Link to={"/profile/"+state?.username}> <img src={Profileicon} alt="profile" className="h-100 " style={{marginRight:"50px"}} /></Link>
                    </div>
                    <div className="col-4 d-flex"></div>
                </div>
            </div>
            <div className="desktop">
                <div className="d-flex">
                    <Link to="/"> <a href='#' className="text-decoration-none text-dark me-2"  ><>Home</></a> </Link>
                    <Link to={"/profile/"+state?.username}> <a href='#' className="text-decoration-none me-2 text-dark"  ><>Profile</></a> </Link>
                    <Link to="/contests"> <a href='#' className="text-decoration-none text-dark me-2"  ><>Contests</></a> </Link>
                    <Link to="/rankers"> <a href='#' className="text-decoration-none me-2 text-dark"  ><>Rankers</></a> </Link>
                    <Link to="/createpost"><a href='#' className="text-decoration-none me-2 text-dark"  ><>CreatePost</></a></Link>
                    <Link to="/chat"> <a href='#' className="text-decoration-none text-dark me-2"  ><>chat</></a></Link>
                </div>
            </div>
        </div>
    );
}


