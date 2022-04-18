import './App.css';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

// components
import Navbar from './components/navbar';
import WeatherPage from './pages/weatherPage';
import FavoritesPage from './pages/favoritesPage';



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
          <Route path='/' element={<WeatherPage/>} />
          <Route path='/favorite' element={<FavoritesPage/> } />
        </Routes>
      </main>

    

    </div>
  );
}

export default App;
