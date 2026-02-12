import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import img1 from '../images/IMG-20250103-WA0003.jpg';
import img2 from '../images/IMG-20250103-WA0004.jpg';
import img3 from '../images/mockups.png';
import img4 from '../images/kurumsal.jpg';

interface SliderItem {
  image: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const sliderItems: SliderItem[] = [
  {
    image: img1,
    title: "Voleybol Sahası",
    description: "",
    tags: ["Blender", "3D"],
    link: "#"
  },
  {
    image: img2,
    title: "Voleybol Sahası",
    description: "",
    tags: ["Blender", "3D"],
    link: "#"
  },
  {
    image: img3,
    title: "Mockup çalışması.",
    description: "",
    tags: ["Mockup", "Illustrator", "Photoshop"],
    link: "#"
  },
  {
    image: img4,
    title: "Kurumsal marka, kimlik çalışması.",
    description: "",
    tags: ["Mockup", "Illustrator", "Photoshop"],
    link: "#"
  },
];

export const ImageSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Height is generous to allow for comfortable pausing
    <div ref={containerRef} className="relative h-[500vh] mt-0">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        <div className="relative w-full h-full flex items-center justify-center p-6 md:p-20">
          {sliderItems.map((item, i) => (
            <Card
              key={i}
              item={item}
              i={i}
              progress={scrollYProgress}
              total={sliderItems.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({
  item,
  i,
  progress,
  total
}: {
  item: SliderItem,
  i: number,
  progress: MotionValue<number>,
  total: number
}) => {
  // --- TIMING LOGIC ---
  // We divide the total scroll progress into segments.
  // Each card gets one segment (step).
  // Within that segment, we split time between "Waiting" (Dead Zone) and "Moving".

  const step = 1 / total;

  // Duration of the animation phase (50% of the step)
  // This implies the other 50% is the "Dead Zone" where the image sits still.
  const animDuration = step * 0.5;

  // The point where this card MUST be fully visible (y=0%)
  const end = i * step;

  // The point where this card STARTS moving up from the bottom (y=100%)
  const start = end - animDuration;

  // Y Position Transform
  // Map scroll progress to vertical position
  const y = useTransform(
    progress,
    [start, end],
    ['100%', '0%']
  );

  // --- SCALE LOGIC ---
  // We want the CURRENT card to scale down slightly when the NEXT card starts covering it.
  // The "Next Card" enters from: ((i+1)*step - animDuration) to ((i+1)*step)

  const nextCardEnd = (i + 1) * step;
  const nextCardStart = nextCardEnd - animDuration;

  const scale = useTransform(
    progress,
    [nextCardStart, nextCardEnd],
    [1, 0.95] // Scale from 100% to 95% as it gets covered
  );

  return (
    <motion.div
      className="absolute w-full md:w-[70vw] h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 group"
      style={{
        // Card 0 stays at 0, others move.
        y: i === 0 ? 0 : y,
        // All cards scale down as they are covered by the next one
        scale: scale,
        zIndex: i,
      }}
    >
      <img
        src={item.image}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        alt={item.title}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">

        {/* Top Right Counter */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 font-mono text-sm border border-white/10 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">
          0{i + 1} / 0{total}
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/20 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">
                {item.description}
              </p>
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex flex-shrink-0 p-4 bg-white text-black rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-lg group/btn items-center justify-center"
            >
              <ExternalLink size={24} className="group-hover/btn:rotate-45 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Only Button */}
          <a
            href={item.link}
            className="md:hidden mt-6 flex w-full items-center justify-center gap-2 py-3 bg-white text-black rounded-xl font-bold hover:bg-purple-400 transition-colors"
          >
            Projeyi İncele <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
