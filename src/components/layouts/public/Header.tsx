import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { Button } from '../../Elements';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Terms', path: '/terms-and-conditions' },
    { name: 'Contact', path: '/contact-us' },
    { name: 'Privacy', path: '/privacy-policy' },
  ];

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={item.path === '/dashboard'}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Button type="button" name="Register" onClick={() => navigate('auth/register')} />
        <Button type="button" name="Login" onClick={() => navigate('auth/login')} />
      </div>
    </header>
  );
};

export default Header;
