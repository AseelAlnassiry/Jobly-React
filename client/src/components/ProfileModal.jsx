import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileModal = () => {
  const { authUser, update } = useAuth();
  const username = authUser.username;

  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(authUser.firstName);
  const [lastName, setLastName] = useState(authUser.lastName);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      if (password) await update(username, { email, firstName, lastName, password });
      else await update(username, { email, firstName, lastName });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-secondary rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary">Jobly</h1>
        <form className="space-y-4" onSubmit={handleUpdate}>
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
              readOnly
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
            />
          </div>
          <div>
            <button className="btn btn-block bg-primary-focus">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileModal;
