import React from 'react'
import FullScreen from '../images/Full-screen.svg'
import './grid.css'
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
];

export default function Grid() {
    return (
        <>
            <div className='row m-1'>
                {
                    itemData.map((item, index) => {
                        return (
                            <div className='col-4 p-1'>
                                <div className='card'>
                                    <img className='card-img-top' src={item.img} alt='Card image cap' />
                                    <div className='card-body d-flex justify-content-between align-items-center'>
                                        <p className='card-title'>{item.title}</p>
                                        <img src={FullScreen} className='full-screen' />
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
