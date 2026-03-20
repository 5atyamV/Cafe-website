/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Star, 
  Coffee, 
  Pizza, 
  Utensils, 
  Music, 
  Camera, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronRight,
  Wind,
  Moon,
  Zap
} from 'lucide-react';

const StarBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            '--delay': star.delay,
          } as any}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy/90 backdrop-blur-lg py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="font-heading text-3xl text-gold text-glow">
          Marvellas Cafe
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link font-medium">
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-gold hover:bg-gold/80 text-navy px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-gold/20"
          >
            Reserve
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-heading text-white hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-gold text-navy px-10 py-3 rounded-full font-bold text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserve a Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 30 }}
    viewport={{ once: true }}
    className="glass-card p-8 flex flex-col items-center text-center group"
  >
    <div className="w-16 h-16 bg-purple/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple/40 transition-colors">
      <Icon className="text-gold" size={32} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gold">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

const MenuItem = ({ title, price, description, image }: { title: string, price: string, description: string, image: string }) => (
  <motion.div 
    whileInView={{ opacity: 1, scale: 1 }}
    initial={{ opacity: 0, scale: 0.9 }}
    viewport={{ once: true }}
    className="glass-card overflow-hidden group"
  >
    <div className="h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold text-gold">{title}</h4>
        <span className="text-purple font-bold">{price}</span>
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-navy selection:bg-gold selection:text-navy">
      <StarBackground />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/40 to-navy"></div>
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070" 
            alt="Rooftop Ambience" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Tropical Elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 text-tropical/20 rotate-45 pointer-events-none">
          <Wind size={256} />
        </div>
        <div className="absolute bottom-20 -right-20 w-64 h-64 text-tropical/20 -rotate-12 pointer-events-none">
          <Wind size={256} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-script text-gold text-3xl md:text-4xl mb-4">Welcome to</h2>
            <h1 className="font-heading text-6xl md:text-9xl text-white mb-6 tracking-wider drop-shadow-2xl">
              Marvellas <span className="text-gold">Cafe</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience Fun & Chill Vibes Above the City!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="bg-gold hover:bg-gold/80 text-navy px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-gold/30"
              >
                Reserve a Table
              </a>
              <a 
                href="#menu" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
              >
                View Menu
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gold opacity-50"
        >
          <ChevronRight className="rotate-90" size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">Elevate Your Vibes</h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Perched atop Signature Plaza, Marvellas Cafe offers an unparalleled rooftop experience in the heart of Bhopal. With breathtaking views of the city and the serene Manuabhan Tekri, we provide the perfect escape from the urban hustle.
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Whether you're looking for a romantic sunset dinner, a fun hangout with friends, or a chill spot to enjoy some mocktails, our open-air lounge combines vibrant energy with a relaxed atmosphere.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-tropical/20 rounded-full flex items-center justify-center text-tropical">
                    <Wind size={20} />
                  </div>
                  <span className="font-medium">Open Air</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple/20 rounded-full flex items-center justify-center text-purple">
                    <Moon size={20} />
                  </div>
                  <span className="font-medium">City Views</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1000" 
                  alt="Cafe Ambience" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-gold mb-4">Why Choose Us?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">The best rooftop experience in Bhopal with a mix of fun, food, and feelings.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Moon} 
              title="Rooftop Seating" 
              description="Enjoy the cool breeze and open sky in our spacious rooftop lounge area."
            />
            <FeatureCard 
              icon={Camera} 
              title="City View" 
              description="Capture stunning panoramic views of Bhopal's skyline and Manuabhan Tekri."
            />
            <FeatureCard 
              icon={Music} 
              title="Chill Lounge Vibe" 
              description="Perfectly curated playlists and ambient lighting for the ultimate chill session."
            />
            <FeatureCard 
              icon={Zap} 
              title="Fun Activities" 
              description="Challenge your friends to a game of ping pong or enjoy our board game collection."
            />
            <FeatureCard 
              icon={Coffee} 
              title="Fresh Drinks" 
              description="Signature mocktails, refreshing beverages, and the finest coffee blends."
            />
            <FeatureCard 
              icon={Utensils} 
              title="Delicious Food" 
              description="From cheesy pizzas to gourmet burgers, our menu is a treat for your soul."
            />
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-gold mb-4">Menu Highlights</h2>
            <p className="text-white/60 max-w-2xl mx-auto">A glimpse into our most loved flavors.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MenuItem 
              title="Tropical Mocktail" 
              price="₹180" 
              description="Refreshing blend of pineapple, coconut, and a hint of mint."
              image="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
            />
            <MenuItem 
              title="Marvellas Special Pizza" 
              price="₹350" 
              description="Loaded with fresh veggies, olives, and premium mozzarella."
              image="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
            />
            <MenuItem 
              title="Classic Cheese Burger" 
              price="₹220" 
              description="Juicy patty with melted cheese, served with crispy fries."
              image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600"
            />
            <MenuItem 
              title="Peri Peri Fries" 
              price="₹150" 
              description="Crispy golden fries tossed in spicy peri peri seasoning."
              image="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600"
            />
          </div>
          <div className="mt-12 text-center">
            <button className="border-2 border-gold text-gold hover:bg-gold hover:text-navy px-8 py-3 rounded-full font-bold transition-all">
              Download Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-gold mb-4">Our Gallery</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Moments and memories captured at Marvellas.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800"
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">Get In Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Location</h4>
                    <p className="text-white/70">Rooftop of Signature Plaza, Opposite Manuabhan Tekri, Lalghati, Bhopal</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Phone</h4>
                    <div className="flex flex-col gap-2">
                      <a href="tel:8383826717" className="text-white/70 hover:text-gold transition-colors flex items-center gap-2">
                        8383826717 <ChevronRight size={16} />
                      </a>
                      <a href="tel:8954937722" className="text-white/70 hover:text-gold transition-colors flex items-center gap-2">
                        8954937722 <ChevronRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shrink-0">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Follow Us</h4>
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                        <Facebook size={20} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                        <Twitter size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.582444585141!2d77.3590022752697!3d23.27643507899661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c679644026367%3A0x6334654877395066!2sLalghati%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710950000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-heading text-3xl text-gold mb-4">Marvellas Cafe</h3>
          <p className="text-white/60 mb-8 italic">"Experience Fun & Chill Vibes Above the City!"</p>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#home" className="text-white/40 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-white/40 hover:text-white transition-colors">About</a>
            <a href="#menu" className="text-white/40 hover:text-white transition-colors">Menu</a>
            <a href="#contact" className="text-white/40 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Marvellas Cafe. All rights reserved. Designed for the stars.
          </p>
        </div>
      </footer>
    </div>
  );
}
