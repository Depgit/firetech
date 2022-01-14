import React , {useContext , useState , useEffect , useReducer} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

export default function Navbar() {
    const {state, dispatch} = useContext(UserContext);
    const history = useNavigate('')

    const renderList = () => {
        if(state){
            return (
                <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <button class="btn btn-outline-success" type="button"><Link to="/userdata">New User</Link></button>
                    <button class="btn btn-outline-success" type="button"><Link to="/allusers">All users</Link></button>
                </form>
                </nav>
            )
        }else{
            return (
                <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <button class="btn btn-outline-success" type="button"><Link to="/signup">Signup</Link></button>
                    <button class="btn btn-sm btn-outline-secondary" type="button"><Link to="/login">Login</Link></button>
                </form>
                </nav>
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={state ? '/':'/login'} className="brand-logo btn btn-sm btn-outline-secondary">Home</Link>
                {/* // navbar randerlist */}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
