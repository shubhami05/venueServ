import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import {useState,useEffect} from 'react';
import Homepage from './pages/Homepage';
import Bookings from './pages/Bookings';
import Venues from './pages/Venues';
import Reviews from './pages/Reviews';
import AddVenue from './pages/AddVenue';
import Notfound from './pages/Notfound';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import EditVenue from './pages/EditVenue';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import fetchSessionData from './auth/authService';
// import fetchSessionData from './auth/authService';

function App() {

  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const isAuth = await fetchSessionData();
        setAuth(isAuth);
        console.log("auth:", isAuth);

      } catch (error) {
        setAuth(false);
      }
      finally {
        setLoading(false);
      }
    };

    if (!isAuth) {
      authenticateUser();
    }
    else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <div className='h-75 d-flex justify-content-center align-items-center'>
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>)
  }


  if (!isAuth) {
    toast.error("Invalid user, Please try logining again!");
    window.location.href = "http://localhost:3000/Login";
  }
  else {

    return (
      axios.defaults.withCredentials = true,
      <BrowserRouter>

        <div className='layout-wrapper layout-content-navbar'>
          <div className='layout-container'>

            <Sidebar />
            <div className='layout-page'>
              <Header />
              <Toaster />
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/bookings' element={<Bookings />} />
                <Route path='/myvenues' element={<Venues />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/addnewvenue' element={<AddVenue />} />
                <Route path='/editvenue/:id' element={<EditVenue />} />
                <Route path='/*' element={<Notfound />} />
              </Routes>
              <Footer />
            </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
