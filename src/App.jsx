import React, { useState } from 'react'
import Anime from './Anime.jsx'
import AnimeDetail from './AnimeDetail.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anime />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
