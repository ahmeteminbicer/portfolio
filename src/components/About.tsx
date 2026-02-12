import React from 'react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Code2 size={24} />,
    title: "Temiz Kod",
    desc: "Okunabilir, sürdürülebilir ve modern TypeScript standartlarında geliştirme."
  },
  {
    icon: <Palette size={24} />,
    title: "Modern UI/UX",
    desc: "Karanlık mod odaklı, göz yormayan ve estetik arayüz tasarımları."
  },
  {
    icon: <Zap size={24} />,
    title: "Yüksek Performans",
    desc: "Optimize edilmiş bileşenler ve hızlı yükleme süreleri."
  },
  {
    icon: <Globe size={24} />,
    title: "SEO Dostu",
    desc: "Arama motorları için optimize edilmiş semantik yapı."
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-neutral-950/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-4"
          >
            Hakkımda
          </motion.h2>
          <div className="h-1 w-20 bg-purple-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-400 text-lg leading-relaxed"
          >

            <div className="pt-8 flex gap-12 border-t border-white/10 mt-8">
              <div>
                <span className="block text-3xl font-bold text-white mb-1">3+</span>
                <span className="text-sm">Yıl Deneyim</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">50+</span>
                <span className="text-sm">Proje</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">100%</span>
                <span className="text-sm">Müşteri Memnuniyeti</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-900/30 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;