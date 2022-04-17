import './App.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

// components
import Navbar from './components/navbar';
import Home from './pages/homePage';
import Favorite from './pages/favoritePage';

function App() {

  const darkMode = useSelector(state=>state.settingReducer.darkMode);  

  return (
    <div className="app">
      <header>
          <Navbar />
      </header>

      <main className={darkMode ? 'dark' : 'light'} >
        <ToastContainer position="top-right" theme={darkMode ? 'colored' :'dark'}/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorite' element={<Favorite/> } />
        </Routes>
      </main>

    

    </div>
  );
}

export default App;
