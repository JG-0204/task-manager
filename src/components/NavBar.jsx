import { NavLink } from 'react-router-dom';

import { HomeIcon, CardStackIcon } from '@radix-ui/react-icons';

import LogoSvg from '../assets/logo.svg';

import './NavBar.css';

const NavBar = () => {
  return (
    <aside className="nav-container">
      <nav className="nav">
        <img src={LogoSvg} alt="a logo" className="logo" />

        <NavLink className="navlink" to={'/'}>
          <HomeIcon width="30px" height="50px" color="#EDEEF0" />
          <span className="navlink-label">Home</span>
        </NavLink>

        <NavLink className="navlink" to={'tasks/'}>
          <CardStackIcon width="30px" height="50px" color="#EDEEF0" />
          <span className="navlink-label">Tasks</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default NavBar;
