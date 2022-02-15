import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
import "bootstrap-icons/font/bootstrap-icons.css";
import thumbsup from '../images/thumbsup.svg';
import thumbsdown from '../images/thumbsdown.svg';
import './votes.css';

export default function Votesmanage(props) {
    const { state, dispatch } = useContext(UserContext);
    const history = useNavigate('')
    
    return (
        <div className="container">
            <div className="flex-col border-check  width-auto m-auto ">
                <div className="">
                    <h1>Image</h1>
                </div>
                <div className="flex-fill border-check" style={{ marginLeft: "10%" }}>
                    <div className="flex-col justify-content-between ml-4">
                        <div className=" border-check">
                            <div className='bg-primary text-white rounded'>10</div>
                            <button  onClick={(e)=>{
                                
                            }}>
                                <img src={thumbsup} alt="thumbsup" className="h-75 " />
                            </button>
                        </div>
                        <div className=" border-check">
                            <div className='bg-primary text-white rounded'>10</div>
                            <button>
                                <img src={thumbsdown} alt="thumbsdown" className="h-75" />
                            </button>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-primary">comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}