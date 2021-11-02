import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { SectionIntro } from './components/SectionIntro/SectionIntro';
import { SectionInfo } from './components/SectionInfo/SectionInfo';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <SectionIntro/>
      <SectionInfo/>
      <Footer/>
    </>
    
  );
}

export default App;
