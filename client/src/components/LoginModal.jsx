import { useState } from 'react';
import JoblyApi from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginModal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const { authUser, login } = useAuth();

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(username, password);
      if (authUser) nav('/');
    } catch (error) {}
  };
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-secondary rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary">Jobly</h1>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-block bg-primary-focus">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginModal;
