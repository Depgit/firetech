import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FullScreen from '../images/Full-screen.svg'
import './grid.css'


export default function Grid(props) {
    const [itemData, setItemData] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        props.data && setItemData([...props.data]);
    }, [props.data])



    return (
        <>
            <div className='row m-1' >
                {
                    itemData && itemData.map((item, index) => {
                        return (
                            <div className='col-4 p-1'>

                                <div className='card'>
                                    <img className='card-img-top' src={item?.meme} alt='Card image cap' />
                                    <div className='card-body d-flex justify-content-between align-items-center'>
                                        <Link to={"/profile/" + item?.username} className="text-decoration-none text-dark " > <p className='card-title '
                                        >{item?.username} </p>
                                        </Link>
                                        <img
                                            src={FullScreen}
                                            className='full-screen'
                                            onClick={(e) => {
                                                history(`/comment/${item._id}`)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div>
                     
                </div>
            </div>
        </>
    )
}
