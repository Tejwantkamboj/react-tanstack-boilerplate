import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaUsers, FaTachometerAlt, FaFolderOpen } from 'react-icons/fa';

const menuItems = [
  {
    name: 'Dashboard',
    path: '',
    icon: <FaTachometerAlt />,
  },
  {
    name: 'User Management',
    path: 'user-list',
    icon: <FaUsers />,
  },
  {
    name: 'Content Management',
    path: 'content-page',
    icon: <FaFolderOpen />,
  },
];

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`h-screen bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-3">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-5">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 mx-2 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            {/* Icon */}
            <span className="text-lg">{item.icon}</span>

            {/* Text */}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
