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
                    <div>
                    <Link to={state ? '/':'/login'} className="brand-logo btn btn-outline-success">Home</Link>
                    </div>
                    <div>
                    <Link to={state ? '/votes':'/login'} className="brand-logo btn btn-outline-success">Votes</Link>
                    </div>
                </nav>
            )
        }else{
            return (
                <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                    <button class="btn btn-outline-success" type="button"><Link to="/signup">Signup</Link></button>
                    <button class="btn btn-outline-success" type="button"><Link to="/login">Login</Link></button>
                </form>
                </nav>
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper">
                {/* // navbar randerlist */}
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
