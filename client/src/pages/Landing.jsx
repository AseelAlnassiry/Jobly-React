import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Landing = () => {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <div className="hero flex-1 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Jobly</h1>
          <p className="py-6">All the jobs you ever wanted, right here in one place</p>
          <div className="flex justify-center gap-10">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
