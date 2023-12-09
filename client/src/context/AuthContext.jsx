import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('user')));
  const login = async (username, password) => {
    try {
      const token = await JoblyApi.login({ username, password });
      if (!token) throw new Error('unauthorized');
      JoblyApi.token = token;
      const userData = await JoblyApi.getCurrentUser(username);
      if (!userData) throw new Error('unable to get user information');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', JSON.stringify(token));
      setAuthUser(userData);
      toast.success('Logged in Successfully');
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const register = async (username, password, firstName, lastName, email) => {
    try {
      const token = await JoblyApi.signup({ username, password, firstName, lastName, email });
      if (!token) throw new Error('something went wrong...');
      JoblyApi.token = token;
      const userData = await JoblyApi.getCurrentUser(username);
      if (!userData) throw new Error('unable to get user information');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', JSON.stringify(token));
      setAuthUser(userData);
      toast.success('Registered Successfully :)');
    } catch (error) {
      toast.error(error);
    }
  };

  const logout = () => {
    JoblyApi.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthUser(null);
    toast.success('logged out');
  };

  const update = async (username, data) => {
    const updatedUser = await JoblyApi.saveProfile(username, data);
    if (!updatedUser) throw new Error('couldnt update, something went wrong :(');
    const userData = await JoblyApi.getCurrentUser(username);
    if (!userData) throw new Error('unable to get user information');
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthUser(userData);
    toast.success('Update!');
  };

  const apply = async (username, jobId) => {
    await JoblyApi.applyToJob(username, jobId);
    const userData = await JoblyApi.getCurrentUser(username);
    if (!userData) throw new Error('unable to get user information');
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthUser(userData);
    toast.success('Applied, Good Luck!');
  };
  const value = {
    authUser,
    register,
    login,
    logout,
    update,
    apply,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
