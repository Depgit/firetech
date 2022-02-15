import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
import "bootstrap-icons/font/bootstrap-icons.css";
import './votes.css';
import Votemanage from './Votesmanage';

export default function Votes() {
    const { state, dispatch } = useContext(UserContext);
    const history = useNavigate('')
    
    return (
        <div className="container">
            <div className='mt-4'>
                <Votemanage />
            </div>
            <div className='mt-4'>
                <Votemanage />
            </div>
            <div className='mt-4'>
                <Votemanage />
            </div>
            <div className='mt-4'>
                <Votemanage />
            </div>
        </div>
    )
}