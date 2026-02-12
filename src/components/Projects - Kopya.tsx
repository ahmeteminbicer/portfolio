import React from 'react';
import { Project } from '../types';
import { ExternalLink} from 'lucide-react';
import { motion } from 'framer-motion';

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "Kripto para ve NFT analizi için geliştirilmiş, gerçek zamanlı veri akışı sağlayan karanlık mod dashboard.",
    tags: ["React", "D3.js", "WebSocket", "Tailwind"],
    link: "#",
    image: "https://picsum.photos/600/400?random=1",
    videoUrl: ""
  },
  {
    id: 2,
    title: "Aether E-Ticaret",
    description: "Yapay zeka destekli ürün önerileri sunan, headless CMS mimarisi üzerine kurulu e-ticaret platformu.",
    tags: ["Next.js", "GraphQL", "Stripe", "Framer Motion"],
    link: "#",
    image: "https://picsum.photos/600/400?random=2",
    videoUrl: ""
  },
  {
    id: 3,
    title: "Void Chat",
    description: "Uçtan uca şifreli, minimal tasarıma sahip anlık mesajlaşma uygulaması.",
    tags: ["TypeScript", "Firebase", "React", "PWA"],
    link: "#",
    image: "https://picsum.photos/600/400?random=3",
    videoUrl: ""
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow for section */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold mb-4"
            >
              Seçili Projeler
            </motion.h2>
            <div className="h-1 w-20 bg-purple-500 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/20 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    <button className="p-2 bg-white text-black rounded-full hover:bg-purple-400 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
