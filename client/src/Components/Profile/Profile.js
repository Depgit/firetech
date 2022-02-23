import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './profile.css'
import Grid from '../Grid/Grid'

const profile = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'

export default function Profile(props) {
    const { state, dispatch } = useContext(UserContext);
    let val = state;
    console.log("profile>> ", val);
    
    return (
        <>
            <div className='row'>
                <div className='col-6'>
                    <div className='h2'> {val?.username}</div>
                    <div >Email: {val?.email}</div>
                    <div >Contribution: {val?.contributions}</div>
                    <div >ratting: {}</div>
                    
                </div>
                <div className='col-6  p-0'>
                    <div className='pr-profile'>
                        <img src={profile} className='img-fluid ' />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='text-center' >drpzet all posts</div>
                <Grid />
            </div>
        </>
    )
}
