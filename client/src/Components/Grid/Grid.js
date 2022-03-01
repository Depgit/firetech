import React ,{useEffect, useState} from 'react'
import FullScreen from '../images/Full-screen.svg'
import './grid.css'


export default function Grid(props) {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        setItemData([...props.data]);
    }, [props.data])
    console.log("itemData", itemData,props);
    return (
        <>
            <div className='row m-1'>
                {
                    itemData.map((item, index) => {
                        return (
                            <div className='col-4 p-1'>
                                {item, index}
                                <div className='card'>
                                    <img className='card-img-top' src={item.meme} alt='Card image cap' />
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
