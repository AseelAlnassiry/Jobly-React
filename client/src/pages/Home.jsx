import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const Home = () => {
  const { authUser } = useAuth();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="https://as2.ftcdn.net/v2/jpg/03/54/97/17/1000_F_354971740_AhQkp9pW9yaru5HDqTUcSwKjT1lUdApe.jpg" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Welcome Back {authUser.username}!</h1>
          <p className="py-6">Find your next adventure by finding the best jobs below!</p>
          <Link to="/jobs" className="btn btn-primary">
            Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
