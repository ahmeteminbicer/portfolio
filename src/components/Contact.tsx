import React, { useState } from 'react'; // useState eklendi
import { Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  // Form durumunu ve mesaj durumunu yönetmek için stateler
  const [result, setResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Gönderiliyor...");

    const formData = new FormData(event.currentTarget);
    // ÖNEMLİ: Web3Forms Access Key'inizi buraya yapıştırın
    formData.append("access_key", "31affefe-e4eb-452b-bd51-e356f8cb609a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Mesajınız başarıyla iletildi!");
      (event.target as HTMLFormElement).reset(); // Formu temizle
    } else {
      console.log("Hata:", data);
      setResult(data.message);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4 text-white">Bir Projeniz mi Var?</h2>
            <p className="text-gray-400">
              Fikirlerinizi gerçeğe dönüştürmek için hazırım. Detayları konuşmak için iletişime geçin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <a href="mailto:bicerahmetemin@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                    bicerahmetemin@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Konum</h3>
                  <p className="text-gray-400">
                    Kocaeli, Türkiye (Uzaktan Çalışmaya Uygun)
                  </p>
                </div>
              </div>
            </div>

            {/* Form OnSubmit handler eklendi */}
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <input
                  type="text"
                  name="name" // Name niteliği API için gerekli
                  placeholder="Adınız"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email" // Name niteliği API için gerekli
                  placeholder="E-posta Adresiniz"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message" // Name niteliği API için gerekli
                  placeholder="Mesajınız"
                  rows={4}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Gönderiliyor..." : "Gönder"} <Send size={18} />
              </button>

              {/* Sonuç mesajı */}
              {result && (
                <p className={`text-center text-sm mt-2 ${result.includes("başarıyla") ? "text-green-400" : "text-red-400"}`}>
                  {result}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      <footer className="mt-24 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Tüm Hakları Saklıdır. Designed by Tolgadeg35.</p>
      </footer>
    </section>
  );
};

export default Contact;