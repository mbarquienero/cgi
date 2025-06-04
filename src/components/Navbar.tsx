import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FilmIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <FilmIcon className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            CGI Ad Generator
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600"
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/create" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600"
            }
          >
            Create Ad
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600"
            }
          >
            Gallery
          </NavLink>
        </nav>
        
        <div className="md:hidden">
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;