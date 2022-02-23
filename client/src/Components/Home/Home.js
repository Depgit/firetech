import React, { useContext } from 'react'
import { UserContext } from '../../App';
import Topcontributer from '../Topcontributer/Topcontributer';
import Topranker from '../Topcontributer/Topranker';
import './home.css'
import PostCard from '../PostCard/PostCard';
import Grid from '../Grid/Grid';
import Contest from '../Contest/Contest';
import Profile from '../Profile/Profile';


export default function Home(props) {
    const { state, dispatch } = useContext(UserContext);
    console.log("state home js>> ", state);
    return (
        <>
            <div className='row p-top m-1'>
                <div className='col-2'></div>
                <div className='col-5 p-0 card-over '>
                    {/* {
                        props.topRender ? <div className='m-2'>
                            <Topcontributer />
                            <Topranker />
                        </div> : <Grid />
                    } */}
                    {/* <Contest /> */}
                    <Profile />
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
