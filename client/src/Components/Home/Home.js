import React, { useContext, useEffect, useState } from 'react'
import { UserContext, PostContext } from '../../App';
import './home.css'
import PostCard from '../PostCard/PostCard';
import Grid from '../Grid/Grid';
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const { state, dispatch } = useContext(UserContext);
    const { post, dispatchPost } = useContext(PostContext);
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(true);
    const history = useNavigate();
    const url = window.location.href;

    console.log("home page running .... ", post);
    useEffect(() => {
        
        if (post.length === 0) {
            fetch('api/posts/allposts', {
                method: "get",
                headers: {
                    "x-access-token": localStorage.getItem('jwt')
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    data.posts.map(allPost => {
                        dispatchPost({ type: "POSTS", payload: allPost })
                    })
                })
        }
      
    }, [])



    return (
        <>
            <div className='row p-top m-1'>
                {post.length > 0 ? <Grid data={post} /> : <h1>...Loading</h1>}
            </div>
        </>
    )
}
