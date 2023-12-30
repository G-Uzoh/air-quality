import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link to="/" className="mt-3 ml-4">
        <h1>AIRSpy</h1>
      </Link>
      <nav className="mt-3">
        <NavLink to='/' className='mr-4'>Home</NavLink>
        <NavLink to='/air_quality'  className='mr-4'>Air Quality</NavLink>
        <NavLink to='/about'  className='mr-4'>About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
