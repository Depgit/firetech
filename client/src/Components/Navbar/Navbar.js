import React, { useContext, useState, useEffect, useReducer } from 'react'
import "./style.css"
import Home from '../images/Home.svg'
import Profileicon from '../images/profile-icon.svg'

export default function Navbar() {
    return (
        <div className="row">
            <div className="col-2" ></div>
            <div className="col-5 nav-bg">
                <nav className="navbar navbar-light d-flex justify-content-between">
                    <div><a className="navbar-brand pl-3">InstaGram</a></div>
                    <div>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </nav>
            </div>
            <div className='col-3 nav-bg nav-left'>
                <img src={Home} className="nav-img h-50 ml-4" alt="..."  />
                <img src={Profileicon} className="nav-img h-50 mx-3 " alt="..."  />
            </div>
            <div className="col-2" ></div>
        </div>
    )

}
