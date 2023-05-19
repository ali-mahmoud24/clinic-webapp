import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);

  const { logout, isLoggedIn, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  return (
    <nav className={classes.nav}>
      <ul className={classes['nav-links']}>
        <li>
          <a class={classes['nav-link']}>home</a>
        </li>

        <li>
          <a class={classes['nav-link']}>about</a>
        </li>
        <li>
          <a class={classes['nav-link']}>services</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

// <!-- nav links -->
// <ul class="nav-links" id="nav-links">
//   <!-- single link -->
//   <li>
//     <a href="#home" class="nav-link scroll-link">home</a>
//   </li>
//   <!-- end of single link -->
//   <!-- single link -->
//   <li>
//     <a href="#about" class="nav-link scroll-link">about</a>
//   </li>
//   <!-- end of single link -->
//   <!-- single link -->
//   <li>
//     <a href="#services" class="nav-link scroll-link">services</a>
//   </li>
//   <!-- end of single link -->
// </ul>
// <!-- end of nav links -->

//   return (
//     <nav className={classes.nav}>
//       <ul className={classes['nav-links']}>

//         {isLoggedIn && (
//           <>
//             {isAdmin && (
//               <li>
//                 <NavLink
//                   className={navData =>
//                     navData.isActive ? classes.active : ''
//                   }
//                   to="/add-doctor"
//                 >
//                   Add Doctor
//                 </NavLink>
//               </li>
//             )}
//             <li>
//               <NavLink
//                 className={navData => (navData.isActive ? classes.active : '')}
//                 to="/appointments"
//               >
//                 Appointments
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 className={navData => (navData.isActive ? classes.active : '')}
//                 to="/doctors"
//               >
//                 Book Appointment
//               </NavLink>
//             </li>

//             <li>
//               <button onClick={logoutHandler}>Logout</button>
//             </li>
//           </>
//         )}

//         {!isLoggedIn && (
//           <li>
//             <div className={classes.button}>
//               <Link to="/auth">
//                 <button>Login</button>
//               </Link>
//             </div>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
