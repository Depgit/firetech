import React, { useEffect, useState } from 'react'
import FullScreen from '../images/Full-screen.svg'
import Like from "../images/like.svg";
import Dislike from "../images/dislike.svg";
import './contest.css'



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
                {
                    itemData.map((item, index) => {
                        return (
                            <div className='col-4 p-1'>
                                <div className='card'>
                                    <div><b>{index < 3 ? index + 1 : 'noobie'}</b></div>
                                    <img className='card-img-top' src={item.meme} alt='Card image cap' />
                                    <div className='card-body d-flex justify-content-between align-items-center'>
                                        <div className='d-flex'>
                                            <p className='card-title mx-2'>{item.title}</p>
                                            <img src={Like} className='like ' />
                                            <img src={Dislike} className='dislike' />
                                        </div>
                                        <div className='d-flex'>
                                            <img src={FullScreen} className='full-screen' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
