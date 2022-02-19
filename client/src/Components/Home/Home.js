import React , {useContext} from 'react'
import { UserContext } from '../../App';
import Topcontributer from '../Topcontributer/Topcontributer';
import Topranker from '../Topcontributer/Topranker';
import './home.css'
import PostCard from '../PostCard/PostCard';
import Grid from '../Grid/Grid';

export default function Home() {
    const { state, dispatch } = useContext(UserContext);
    return (
        <>
           <div className='row p-top'>
                <div className='col-2'></div>
                <div className='col-5 p-0 card-over '>
                    {/* <PostCard />
                    <PostCard />
                    <PostCard /> */}
                    <Grid />
                </div>
                <div className='col-3 p-0 m-0'>
                    <Topcontributer />
                    <Topranker />
                </div>
                <div className='col-2'></div>
            </div> 
        </>
    )
}
