import React from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decor Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide mb-6">
              Mevcut Durum: Projelere Açık
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Dizayn <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">Tasarım</span> <br />
              Animasyon
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-lg leading-relaxed"
          >
            abi
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                const id = "projects";
                const element = document.getElementById(id);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10 group-hover:text-purple-600 transition-colors flex items-center gap-2">
                Projelerimi Gör <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-purple-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>

            <div className="flex gap-4">
              {[Linkedin].map((Icon, i) => (
                <a key={i} href="https://www.linkedin.com/in/ahmet-emin-bicer/" target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual Element / 3D Abstract Representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden md:flex items-center justify-center"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;