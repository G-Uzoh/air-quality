import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <nav>
        <NavLink to='/' className='link'>Home</NavLink>
        <NavLink to='/weather' className='link'>Weather</NavLink>
        <NavLink to='/air_quality' className='link'>Air Quality</NavLink>
        <NavLink to='/about' className='link'>About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
