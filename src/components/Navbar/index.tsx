import React, {useState} from 'react'
import './styles.scss'
import Home from '../Home';
import Graphs from '../Graphs';
import { Link } from 'react-router-dom';
// import AppRouter from '../../router/index';

type Props = {}

const Navbar = (props: Props) => {

    return (
        <div>
            <header className='header'>
                <nav className='navbar'>
                    {/* <BrowserRouter>
                    <Routes> */}
                    {/* <a href='/' className='nav-logo'>Home</a> */}
                    <Link to='/' className='nav-logo'>Home</Link>
                    <Link to='/graph' className='nav-logo'>Graph</Link>
                    {/* <Link to='/graph'>Graphs</Link> */}
                    
                </nav>
            </header>
            {/* <AppRouter/> */}
        </div>
    )
}

export default Navbar