import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import './home.css'
import PostCard from '../PostCard/PostCard';
import Grid from '../Grid/Grid';
import { useNavigate } from 'react-router-dom'


export default function Home(props) {
    const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState([]);
    const history = useNavigate();
    const url = window.location.href;

    console.log("home page running .... ", url);

    useEffect(() => {
        fetch('api/posts/allposts', {
            method: "get",
            headers: {
                "x-access-token": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.posts);
            })
    }, [])

    console.log("data", data);
    
    return (
        <>
            <div className='row p-top m-1'>
                <Grid data={data} />
            </div>
        </>
    )
}
