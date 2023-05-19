import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Navigation from './Navigation';

import logo from '../../images/logo.svg';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <img className="nav-logo" src={logo} alt="backroads" />
      {/* <Link to="/welcome">morningside</Link> */}

      <button className={classes['nav-toggle']} id="nav-toggle">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <Navigation />
    </header>
  );
};

export default MainHeader;
