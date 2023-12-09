import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { authUser, logout } = useAuth();
  const nav = useNavigate();
  const handleLogout = async () => {
    logout()
    nav('/');
  };
  return (
    <div className="navbar bg-base-100 2xl:px-60 min-h-[100px]">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-primary">
          Jobly
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg">
          {authUser && (
            <>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <details>
                  <summary>{authUser.username}</summary>
                  <ul className="p-2 bg-base-100">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <button to="/logout" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
          {!authUser && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
