import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageSlider } from './ImageSlider';

import hublotVideo from '../videos/hublotgta5.mp4';
import mydrosVideo from '../videos/mydros ads.mp4';
import mydrosImg from '../videos/mydros ads.jpg';
import cokeVideo from '../videos/cokeads.mp4';
import cokeImg from '../videos/cokeads.jpg';

const projects: Project[] = [
  {
    id: 1,
    title: "3D Project 1",
    description: "GTA 5 için yapılmış bir harita eklentisi.",
    tags: ["3ds Max", "Adobe Photoshop", ".Lua", "Adobe Premiere Pro"],
    link: "https://youtu.be/aM6YkqnxAGs",
    image: "https://img.youtube.com/vi/aM6YkqnxAGs/maxresdefault.jpg",
    videoUrl: hublotVideo,
  },
  {
    id: 2,
    title: "Ads",
    description: "Basit bir reklam çalışması.",
    tags: ["Adobe After Effects", "Adobe Photoshop"],
    link: mydrosVideo,
    image: mydrosImg,
    videoUrl: mydrosVideo,
  },
  {
    id: 3,
    title: "Ads",
    description: "Basit bir reklam çalışması.",
    tags: ["Adobe After Effects", "Adobe Photoshop"],
    link: cokeVideo,
    image: cokeImg,
    videoUrl: cokeVideo,
  },
];


const Projects: React.FC = () => {
  const [globalMuted, setGlobalMuted] = useState(true);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-24">
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
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              globalMuted={globalMuted}
              setGlobalMuted={setGlobalMuted}
            />
          ))}
        </div>
      </div>

      {/* New Visual Slider Section */}
      <ImageSlider />

    </section>
  );
};

const ProjectCard: React.FC<{
  project: any;
  idx: number;
  globalMuted: boolean;
  setGlobalMuted: (val: boolean) => void
}> = ({ project, idx, globalMuted, setGlobalMuted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.muted = globalMuted;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
            }
          });
        }
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, globalMuted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transform transition-all duration-700 ${isHovered ? 'opacity-0 scale-110' : 'opacity-80'}`}
        />

        <video
          ref={videoRef}
          src={project.videoUrl}
          loop
          playsInline
          preload="auto"
          muted={globalMuted}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {isHovered && (
          <button
            onClick={(e) => { e.stopPropagation(); setGlobalMuted(!globalMuted); }}
            className="absolute top-3 right-3 z-30 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 backdrop-blur-md transition-all"
          >
            {globalMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" /><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" /><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" /></svg>
            )}
          </button>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className={`transform transition-all duration-300 ${isHovered ? '-translate-y-8 opacity-0' : 'translate-y-4'}`}>
          <div className="flex gap-2 mb-3">
            {project.tags.map((tag: any) => (
              <span key={tag} className="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/20 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        </div>

        <div className={`absolute bottom-6 left-6 right-6 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-300 text-sm line-clamp-2 flex-1">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-3 bg-white text-black rounded-full hover:bg-purple-400 transition-colors shadow-lg"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
