import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MouseGradient from './components/MouseGradient';
import HomeButton from './components/HomeButton';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Interactive Element */}
      <MouseGradient />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Contact />
        <HomeButton />
      </main>
    </div>
  );
};

export default App;