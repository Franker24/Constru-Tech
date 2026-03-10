import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Testimonios from './components/Testimonios';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Proyectos from './components/Proyectos';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import './App.css';
import Loader from './components/Loader';

function App() {
  return (
    <Router>
      <Loader />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          {/* HOME: El punto de entrada con el Hero */}
          <Route path="/" element={
            <>
              <Hero />
              <PreguntasFrecuentes />
              <Testimonios />
            </>
          } />

          {/* PÁGINAS INDIVIDUALES */}
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;