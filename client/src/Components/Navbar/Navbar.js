import React, { useContext, useState, useEffect, useReducer } from 'react'
import "./navbar.css"
import NavLeft from './NavLeft'
export default function Navbar() {
    return (
        <div className="row fixed-top">
            <div className="col-2" ></div>
            <div className='col-8 r-flex nav-bg'>
                <div className='in-flex nulify width-auto'>
                    <h5 className=''>Firetech</h5>
                    <div>
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </div>
                {/* <hr className="solid m-0"></hr> */}
                <div className='nulify'>
                    <NavLeft />
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    )

}
