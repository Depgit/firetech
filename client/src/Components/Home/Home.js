import React, { useContext } from 'react'
import { UserContext } from '../../App';
import Topcontributer from '../Topcontributer/Topcontributer';
import Topranker from '../Topcontributer/Topranker';
import './home.css'
import PostCard from '../PostCard/PostCard';
import Grid from '../Grid/Grid';


export default function Home(props) {
    const { state, dispatch } = useContext(UserContext);
    
    let val = props.topRender ? <div className='m-2'>
        <Topcontributer />
        <Topranker />
    </div> : <Grid />
    return (
        <>
            <div className='row p-top'>
                <div className='col-2'></div>
                <div className='col-5 p-0 card-over '>
                    {val}
                </div>
                <div className='col-3 mobile p-0 m-0'>
                    <Topcontributer />
                    <Topranker />
                </div>
                <div className='col-2'></div>
            </div>
        </>
    )
}
