import Head from 'next/head';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

// Helper function to wrap letters for animation
const wrapLetters = (textWrapper) => {
  if (textWrapper && textWrapper.textContent) {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block; transform: translateY(1em);'>$&</span>");
  }
};

const Navbar = () => {
  const navRef = useRef(null);
  useEffect(() => {
    anime({
      targets: navRef.current,
      translateY: ['-100%', '0%'],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md p-5 flex justify-between items-center" style={{backgroundColor: 'rgba(3, 8, 21, 0.8)'}}>
      <div className="text-3xl font-bold text-cyan-400 pixelated-font">GĒMU PRO</div>
      <div className="space-x-6">
        {['Home', 'Games', 'About', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-lg text-gray-300 hover:text-cyan-400 transition-colors duration-300 uppercase pixelated-font-nav">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) wrapLetters(titleRef.current);

    const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl.add({
      targets: titleRef.current?.querySelectorAll('.letter'),
      translateY: ['1em', '0em'],
      opacity: [0,1],
      rotateZ: [10, 0],
      duration: 1000,
      delay: anime.stagger(50),
    })
    .add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    }, '-=500')
    .add({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 700,
    }, '-=400');

    // Parallax for background
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.3}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden bg-cover bg-fixed" style={{backgroundImage: "url('/assets/pirate_spaceship_hero_bg.jpg')", backgroundColor: '#030815'}}>
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay for text readability */}
      <div className="relative z-10">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 text-white pixelated-font leading-tight">GĒMU PRO</h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto modern-font">Crafting Epic Worlds &amp; Thrilling Adventures. Dive into the next generation of gaming.</p>
        <a ref={buttonRef} href="#games" className="pixelated-font text-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-10 rounded-none border-2 border-cyan-300 hover:border-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105">
          VIEW OUR GAMES
        </a>
      </div>
    </section>
  );
};

const SectionTitle = ({ title }) => {
  const titleRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) wrapLetters(titleRef.current);
          anime({
            targets: titleRef.current?.querySelectorAll('.letter'),
            translateY: ['1em', '0em'],
            opacity: [0,1],
            rotateZ: [5, 0],
            duration: 800,
            delay: anime.stagger(40),
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);
  return <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-16 text-center text-white pixelated-font">{title}</h2>;
};

const GameCard = ({ game }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.95, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: parseInt(entry.target.dataset.delay) || 0
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} data-delay={game.animationDelay} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-xl border border-cyan-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full" style={{backgroundColor: 'rgba(11, 15, 43, 0.7)'}}>
      <img src={game.images[0]} alt={`${game.title} main image`} className="w-full h-56 object-cover rounded-md mb-6 shadow-lg"/>
      <h3 className="text-3xl font-bold text-cyan-400 mb-3 pixelated-font-nav">{game.title}</h3>
      <p className="text-gray-300 modern-font mb-4 leading-relaxed flex-grow">{game.description}</p>
      <h4 className="text-xl font-semibold text-purple-400 mb-2 modern-font">Key Features:</h4>
      <ul className="list-disc list-inside text-gray-400 modern-font mb-6 space-y-1 flex-grow">
        {game.features.slice(0,3).map((feature, index) => <li key={index}>{feature}</li>)}
      </ul>
      <a href={game.playStoreLink} target="_blank" rel="noopener noreferrer" className="mt-auto pixelated-font text-lg bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-none border-2 border-purple-400 hover:border-white transition-all duration-300 text-center transform hover:scale-105">
        View on Play Store
      </a>
    </div>
  );
};

const GamesSection = ({ games }) => {
  return (
    <section id="games" className="py-20 bg-cover bg-fixed" style={{backgroundImage: "url('/assets/pirate_spaceship_section_bg1.jpg')", backgroundColor: '#030815'}}>
      <div className="container mx-auto px-6">
        <SectionTitle title="OUR GAMES" />
        <div className="grid md:grid-cols-2 gap-10">
          {games.map((game, index) => <GameCard key={game.id} game={{...game, animationDelay: index * 200}} />)}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: textRef.current,
            opacity: [0,1],
            translateY: [30,0],
            duration: 1000,
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-cover bg-fixed" style={{backgroundImage: "url('/assets/pirate_spaceship_section_bg2.jpg')", backgroundColor: '#0B0F2B'}}>
      <div className="container mx-auto px-6 text-center">
        <SectionTitle title="ABOUT GĒMU PRO" />
        <p ref={textRef} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed modern-font">
          GĒMU PRO is dedicated to crafting high-end, immersive gaming experiences. With a passion for innovation and a commitment to quality, we strive to push the boundaries of what games can be. Our skills in development and design ensure every title is a powerful and professional creation, designed to captivate and entertain.
        </p>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: formRef.current.children,
            opacity: [0,1],
            translateY: [30,0],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-cover bg-fixed" style={{backgroundImage: "url('/assets/pirate_spaceship_contact_bg.jpg')", backgroundColor: '#030815'}}>
      <div className="container mx-auto px-6 text-center">
        <SectionTitle title="GET IN TOUCH" />
        <form ref={formRef} className="max-w-xl mx-auto space-y-6 p-8 bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-cyan-600 rounded-lg shadow-xl" style={{backgroundColor: 'rgba(11, 15, 43, 0.6)'}}>
          <div>
            <input type="text" placeholder="YOUR NAME" className="w-full p-4 bg-transparent border-2 border-purple-500 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-0 outline-none pixelated-font-nav rounded-none" />
          </div>
          <div>
            <input type="email" placeholder="YOUR EMAIL" className="w-full p-4 bg-transparent border-2 border-purple-500 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-0 outline-none pixelated-font-nav rounded-none" />
          </div>
          <div>
            <textarea placeholder="YOUR MESSAGE" rows={5} className="w-full p-4 bg-transparent border-2 border-purple-500 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-0 outline-none pixelated-font-nav rounded-none"></textarea>
          </div>
          <button type="submit" className="w-full pixelated-font text-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-10 rounded-none border-2 border-cyan-300 hover:border-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 text-center text-gray-400 modern-font border-t border-gray-700" style={{backgroundColor: '#030815'}}>
    <p>&copy; {new Date().getFullYear()} GĒMU PRO. All Rights Reserved.</p>
    <p className="text-sm">Inspired by the cosmos.</p>
  </footer>
);

const gameData = {
  slayers_duel: {
    id: "slayers_duel",
    title: "Slayers Duel : Stick Fight",
    description: "Unleash your inner warrior with Slayer Duel, the adrenaline-pumping 1v1 fighting game designed for true champions. Dive into stunning combat moves, master unique characters, and dominate the battlefield with intuitive joystick controls.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.gemupro.slayerduel",
    images: ["/assets/slayers_duel/slayers_duel_screenshot_1.webp", "/assets/slayers_duel/slayers_duel_screenshot_2.webp", "/assets/slayers_duel/slayers_duel_screenshot_3.webp"],
    features: [
      "Story Mode: Embark on a captivating journey through 9 thrilling chapters.",
      "Multiplayer Duels: Challenge players worldwide in real-time PvP matches.",
      "Diverse Fighters: Choose from a roster of unique characters.",
      "Dynamic Gameplay: Experience fluid combat mechanics.",
      "Stunning Graphics & Immersive Sound."
    ]
  },
  galaxy_war: {
    id: "galaxy_war",
    title: "Galaxy War",
    description: "Get ready for an epic space battle in Galaxy War! As an elite pilot, you'll be thrust into the heart of the action, navigating treacherous asteroid fields and engaging in intense space combat against a variety of enemy vessels.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.gemu.GalaxyWar",
    images: ["/assets/galaxy_war/galaxy_war_screenshot_1.webp", "/assets/galaxy_war/galaxy_war_screenshot_2.webp"],
    features: [
      "Customize your spaceship with powerful weapons, shields, and upgrades.",
      "Range of exciting missions with unique challenges and objectives.",
      "Epic boss battles against massive enemy ships.",
      "Stunning graphics and addictive gameplay.",
      "Perfect for fans of Halo, Universe Sandbox, and more."
    ]
  }
};

export default function HomePage() {
  const games = [gameData.slayers_duel, gameData.galaxy_war];

  return (
    <>
      <Head>
        <title>GĒMU PRO - Sci-Fi Game Development</title>
        <meta name="description" content="Explore the universe of GĒMU PRO. High-end, creative games with stunning visuals and immersive gameplay, inspired by pirate spaceships and beyond." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Using a generic pixel font from Google Fonts for now, replace with a specific one if found */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="bg-gray-900 text-white font-main" style={{backgroundColor: '#030815'}}>
        <Navbar />
        <main>
          <HeroSection />
          <GamesSection games={games} />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

