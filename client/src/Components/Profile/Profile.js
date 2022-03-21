import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './profile.css'
import Grid from '../Grid/Grid'
import Topcontributer from '../Topcontributer/Topcontributer'
import Topranker from '../Topcontributer/Topranker'
import { useParams } from 'react-router-dom'
import {ConverBase64} from '../../utils/convertBase64'

const profilepic = 'http://res.cloudinary.com/depimage/image/upload/w_300,h_200,c_scale/v1647680541/l1njxluwrn2k8xwuizko.jpg'

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

    const submitHandler = (e) => {
        fetch('/api/posts/profilepicupdate/'+profile._id , {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("jwt")
            },body: JSON.stringify({
                url:  pic
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                alert(data.error);
            }else{
                alert(data.message);
            }
        })
    }
    
    
    return (
        <div>
            <div className="row" style={{ marginTop: "100px" }}>
                <div className="col-2"></div>
                <div className='col-4'>
                    <h1>{profile?.username}</h1>
                    <div> <strong>Email :</strong> {profile?.email}  </div>
                    <div><strong>Contribution :</strong> {profile?.contributions}</div>
                    <div><strong>Rating :</strong>{profile?.rating}</div>

                </div>
                <div className='col-4'>
                    <div>
                        <img src={pic} alt="profile" className="pr-profile" />
                    </div>
                    <div>
                        {
                            state?.username===profile?.username?
                            <>
                                <input type="file" onChange={async (e) => setPics(await ConverBase64(e.target.files[0]))} />
                                <input type="submit" onClick={submitHandler} />
                            </>
                            :
                            ''
                        }
                    </div>
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
