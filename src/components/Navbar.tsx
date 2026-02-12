import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Başlangıç', href: '#home' },
  { label: 'Projeler', href: '#projects' },
  { label: 'İletişim', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update Navbar background style
      setScrolled(currentScrollY > 50);

      // --- Active Section Logic ---
      
      // 1. Force 'home' if at the very top
      if (currentScrollY < 100) {
        setActiveSection('home');
        return;
      }

      // 2. Force 'contact' if at the very bottom
      if ((window.innerHeight + currentScrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // 3. Standard ScrollSpy: Find the last section that has passed a threshold
      // We use a threshold of 30% of the viewport height. 
      // If the top of a section is above this line, it's a candidate for being active.
      const threshold = currentScrollY + (window.innerHeight * 0.3);

      let newActive = 'home'; // Default

      navItems.forEach((item) => {
        const id = item.href.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          // If the top of the element is above our threshold line, 
          // it means we have scrolled past its start.
          // Since we loop in order, the last one to satisfy this becomes the active one.
          if (element.offsetTop <= threshold) {
            newActive = id;
          }
        }
      });

      setActiveSection(newActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Call immediately to set state on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>
        {`
          html { scroll-behavior: smooth; }
          
          /* Adjust scroll margin to account for fixed navbar height */
          section { scroll-margin-top: 0px; } 

          .nav-link {
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav-link:hover, .nav-link-active {
            transform: translateY(-3px);
            color: #a855f7 !important; /* purple-500 */
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: #a855f7;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after, .nav-link-active::after {
            width: 100%;
          }
        `}
      </style>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-display font-bold tracking-tighter text-white" onClick={(e) => {
             e.preventDefault();
             window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            Ahmet<span className="text-purple-500">Biçer</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link text-sm font-medium text-gray-300 tracking-wide ${isActive ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const id = item.href.replace('#', '');
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white hover:text-purple-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex flex-col py-8 px-6 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xl font-display font-medium transition-colors ${
                    activeSection === item.href.replace('#', '') ? 'text-purple-500' : 'text-gray-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const id = item.href.replace('#', '');
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
