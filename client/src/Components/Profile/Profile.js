import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './profile.css'
import Grid from '../Grid/Grid'
import Topcontributer from '../Topcontributer/Topcontributer'
import Topranker from '../Topcontributer/Topranker'

const profile = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'

export default function Profile() {
    const { state, dispatch } = useContext(UserContext);
    const [pic, setPics] = useState(profile);
    const [data, setdata] = useState([]);
    console.log(" my profile page running .... ");
    
    useEffect(() => {
        fetch('/api/posts/mypost', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json",
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setdata(data.posts);
            })  
    }, [])
    
    return (
        <div>
            <div className="row" style={{ marginTop: "60px" }}>
                <div className="col-2"></div>
                <div className='col-4'>
                    <h1>{state?.username}</h1>
                    <div> <strong>Email :</strong> {state?.email}  </div>
                    <div><strong>Contribution :</strong> {state?.contributions}</div>
                    <div><strong>Rating :</strong>{state?.rating}</div>

                </div>
                <div className='col-4'>
                    <img src={pic} alt="profile" className="pr-profile" />
                </div>
                <div className='col-2'></div>
            </div>
            <div className='mt-4'>
                <h3 className='text-center'>{state?.username}'s all post</h3>
            </div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <Grid data={data}/>
                </div>
                <div className='col-2'></div>
            </div>
        </div>
    )
}
