import React, { useEffect, useState } from 'react'
import FullScreen from '../images/Full-screen.svg'
import Like from "../images/like.svg";
import Dislike from "../images/dislike.svg";
import './contest.css'
import Grid from '../Grid/Grid';



export default function Contest(props) {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        fetch('/api/contest/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setItemData(result.data)
            })
    }, [])


    return (
        <>
            <div className="alert alert-success p-2 ct-label" role="alert" >
                <strong> Weekly Contest {Date.now()}</strong>
            </div>
            <div className='row m-0'>
                <div className='col-2'></div>
                <Grid data={itemData} />
            </div>
        </>
    )
}
