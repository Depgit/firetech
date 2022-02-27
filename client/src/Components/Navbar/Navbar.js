import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import "./navbar.css"
import NavLeft from './NavLeft'
export default function Navbar( props ) {
    
    return (
        <div className="row fixed-top ">
            {/* <div className="col-2" ></div> */}
            <div className='col-12 r-flex nav-bg'>
                <div className='in-flex nulify width-auto m-1'>
                    <h5 className=''>Firetech</h5>
                    <div className='mx-1'>
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                </div>
                {/* <hr className="solid m-0"></hr> */}
                <div className='nulify d-flex align-items-center  '>
                    <NavLeft />
                </div>
            </div>
            {/* <div className="col-2"></div> */}
        </div>
    )

}
