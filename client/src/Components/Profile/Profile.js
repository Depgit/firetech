import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './profile.css'
import Grid from '../Grid/Grid'
import Topcontributer from '../Topcontributer/Topcontributer'
import Topranker from '../Topcontributer/Topranker'
import { useParams } from 'react-router-dom'

const profilepic = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'

export default function Profile() {
    const { state, dispatch } = useContext(UserContext);
    const [pic, setPics] = useState(profilepic);
    const [data, setdata] = useState([]);
    const [profile, setProfile] = useState(null);
    console.log(" my profile page running .... ");
    
    const profileUser = useParams();

    useEffect(() => {
        fetch('/api/posts/post/'+ profileUser.username, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json",
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(data => {
                setdata(data.posts);
            })
        
        fetch('/api/auth/profile/'+ profileUser.username, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json",
                "x-access-token": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(data => {
                setProfile(data.user);
                data.user?.avatar && setPics(data.user.avatar);
            })
    }, [profileUser])

    
    
    return (
        <div>
            <div className="row" style={{ marginTop: "60px" }}>
                <div className="col-2"></div>
                <div className='col-4'>
                    <h1>{profile?.username}</h1>
                    <div> <strong>Email :</strong> {profile?.email}  </div>
                    <div><strong>Contribution :</strong> {profile?.contributions}</div>
                    <div><strong>Rating :</strong>{profile?.rating}</div>

                </div>
                <div className='col-4'>
                    <img src={pic} alt="profile" className="pr-profile" />
                </div>
                <div className='col-2'></div>
            </div>
            <div className='mt-4'>
                <h3 className='text-center'>{profile?.username}'s all post</h3>
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
