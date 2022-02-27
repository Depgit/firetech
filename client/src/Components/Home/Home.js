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
        fetch('/allpost', {
            headers: {
                "x-access-token": localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.allpost)
            }
            )
    }, [])

    return (
        <>
            <div className='row p-top m-1'>
                <Grid />
            </div>
        </>
    )
}
