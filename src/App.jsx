import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Favorite from './pages/favoritePage';
import Navbar from './components/navbar';

import {useSelector} from 'react-redux';

function App() {

  const darkMode = useSelector(state=>state.reducer.darkMode);  

  return (
    <div className="app">
      <header>
          <Navbar />
      </header>

      <main className={darkMode ? 'dark' : ''} >
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorite' element={<Favorite/> } />
        </Routes>
      </main>

    <footer>
      
    </footer>

    </div>
  );
}

export default App;
