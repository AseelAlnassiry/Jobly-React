import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Companies from './pages/Companies';
import Jobs from './pages/Jobs';
import CompanyPage from './pages/CompanyPage';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

function App() {
  const { authUser } = useAuth();
  console.log(authUser);
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Landing />} />
          {!authUser && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          {authUser && (
            <>
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:handle" element={<CompanyPage />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route path="/*" element={<Navigate to={'/'} />} />
        </Routes>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
