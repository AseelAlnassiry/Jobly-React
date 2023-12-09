import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterModal = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const nav = useNavigate();

  const { authUser, register } = useAuth();

  const handlRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      await register(username, password, firstName, lastName, email);
      if (authUser) nav('/');
    } catch (error) {
      toast.error('unable to signup, something went wrong :(');
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-secondary rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary">Jobly</h1>
        <form className="space-y-4" onSubmit={handlRegisterSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
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
              required
            />
          </div>
          <div>
            <button className="btn btn-block bg-primary-focus">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterModal;
