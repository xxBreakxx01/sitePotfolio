import Head from 'next/head';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

// Placeholder components - these will be created in subsequent steps
const Navbar = () => {
  const navRef = useRef(null);
  useEffect(() => {
    if (navRef.current) {
      anime({
        targets: navRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 text-white flex justify-between items-center shadow-lg opacity-0">
      <div className="text-2xl font-bold">GĒMU PRO</div>
      <div>
        <a href="#slayers_duel" className="mx-2 hover:text-purple-400 transition-colors">Slayers Duel</a>
        <a href="#galaxy_war" className="mx-2 hover:text-purple-400 transition-colors">Galaxy War</a>
        <a href="#about" className="mx-2 hover:text-purple-400 transition-colors">About</a>
        <a href="#contact" className="mx-2 hover:text-purple-400 transition-colors">Contact</a>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    if (heroTitleRef.current) {
      // Wrap letters for animation
      const textWrapper = heroTitleRef.current;
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block;'>$&</span>");
      
      tl.add({
        targets: heroTitleRef.current.querySelectorAll('.letter'),
        translateY: [-30,0],
        opacity: [0,1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(80),
      });
    }

    if (heroSubtitleRef.current) {
      tl.add({
        targets: heroSubtitleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      }, '-=600'); // Start slightly before previous animation ends
    }

    if (heroButtonRef.current) {
      tl.add({
        targets: heroButtonRef.current,
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 600
      }, '-=400');
    }
  }, []);

  return (
    <section className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center text-center p-8 bg-cover bg-center relative overflow-hidden" style={{backgroundImage: "url('/assets/hero_background.jpg')"}}>
      {/* Placeholder for particle animation - could be a separate component */}
      <div className="absolute inset-0 z-0" id="hero-particles"></div>
      <div className="relative z-10">
        <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-bold mb-6">Experience Next-Level Gaming</h1>
        <p ref={heroSubtitleRef} className="text-xl md:text-2xl mb-8 opacity-0">Powerful, Professional, Creative Games by GĒMU PRO</p>
        <a ref={heroButtonRef} href="#games" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 opacity-0">Explore Games</a>
      </div>
    </section>
  );
};

const GameSection = ({ id, title, description, playStoreLink, images, videoUrl, features }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime.timeline({ easing: 'easeOutExpo' })
            .add({
              targets: entry.target.querySelector('.game-title-animate'),
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              delay: 200
            })
            .add({
              targets: entry.target.querySelectorAll('.feature-item-animate'),
              translateX: [-30, 0],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(100, {start: 400})
            }, '-=400')
            .add({
              targets: entry.target.querySelectorAll('.game-image-animate'),
              scale: [0.8, 1],
              opacity: [0, 1],
              duration: 700,
              delay: anime.stagger(150, {start: 300})
            }, '-=600');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className="py-20 bg-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-purple-400 game-title-animate opacity-0">{title}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="opacity-0 game-image-animate">
            {/* Placeholder for video or main image */}
            <div className="bg-gray-700 w-full h-64 md:h-96 rounded-lg shadow-xl mb-6 flex justify-center items-center text-gray-400">Video/Main Image Placeholder for {title}</div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {images.slice(0,3).map((img, index) => (
                <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="rounded-lg shadow-md hover:opacity-80 transition-opacity opacity-0 game-image-animate" />
              ))}
            </div>
          </div>
          <div className="text-left">
            <p className="text-lg mb-6 leading-relaxed opacity-0 feature-item-animate">{description}</p>
            <h3 className="text-2xl font-semibold mb-3 text-purple-300 opacity-0 feature-item-animate">Key Features:</h3>
            <ul className="list-disc list-inside mb-6 space-y-2">
              {features.map((feature, index) => <li key={index} className="opacity-0 feature-item-animate">{feature}</li>)}
            </ul>
            <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 opacity-0 feature-item-animate">View on Google Play</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target.querySelectorAll('.about-animate'),
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-purple-400 about-animate opacity-0">About GĒMU PRO</h2>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed about-animate opacity-0">GĒMU PRO is dedicated to crafting high-end, immersive gaming experiences. With a passion for innovation and a commitment to quality, we strive to push the boundaries of what games can be. Our skills in development and design ensure every title is a powerful and professional creation, designed to captivate and entertain.</p>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target.querySelectorAll('.contact-animate'),
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8 text-purple-400 contact-animate opacity-0">Get In Touch</h2>
        <p className="text-lg mb-8 contact-animate opacity-0">Have a question or want to collaborate? Reach out!</p>
        <form className="max-w-xl mx-auto">
          <div className="mb-4 contact-animate opacity-0"><input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500" /></div>
          <div className="mb-4 contact-animate opacity-0"><input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500" /></div>
          <div className="mb-4 contact-animate opacity-0"><textarea placeholder="Your Message" rows={4} className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500"></textarea></div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 contact-animate opacity-0">Send Message</button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => <footer className="bg-gray-900 text-white text-center p-6"><p>&copy; {new Date().getFullYear()} GĒMU PRO. All rights reserved.</p></footer>;

const gameData = {
  slayers_duel: {
    id: "slayers_duel",
    title: "Slayers Duel : Stick Fight",
    description: "Unleash your inner warrior with Slayer Duel, the adrenaline-pumping 1v1 fighting game designed for true champions. Dive into stunning combat moves, master unique characters, and dominate the battlefield with intuitive joystick controls.",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.gemupro.slayerduel",
    images: ["/assets/slayers_duel/slayers_duel_screenshot_1.webp", "/assets/slayers_duel/slayers_duel_screenshot_2.webp", "/assets/slayers_duel/slayers_duel_screenshot_3.webp"],
    videoUrl: "", // Placeholder for video URL
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
    videoUrl: "", // Placeholder for video URL
    features: [
      "Customize your spaceship with powerful weapons, shields, and upgrades.",
      "Range of exciting missions with unique challenges and objectives.",
      "Epic boss battles against massive enemy ships.",
      "Stunning graphics and addictive gameplay.",
      "Perfect for fans of Halo, Universe Sandbox, and more."
    ]
  }
};

const Preloader = () => {
  const preloaderRef = useRef(null);
  useEffect(() => {
    if (preloaderRef.current) {
      anime({
        targets: preloaderRef.current,
        opacity: [1, 0],
        duration: 800,
        delay: 1500, // Keep preloader for a bit
        easing: 'easeInOutQuad',
        complete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
        }
      });
      // Add some animation to the preloader text/icon itself
      anime({
        targets: '.preloader-text',
        opacity: [0, 1, 0],
        loop: true,
        direction: 'alternate',
        duration: 1000,
        easing: 'easeInOutSine'
      });
    }
  }, []);

  return (
    <div ref={preloaderRef} className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center z-[100]">
      <div className="text-purple-400 text-4xl font-bold mb-4 preloader-text">GĒMU PRO</div>
      <div className="w-16 h-16 border-4 border-dashed border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-4 preloader-text">Loading Epicness...</p>
    </div>
  );
};

export default function HomePage() {
  useEffect(() => {
    // Initialize any global Anime.js settings if needed
    // e.g., anime.speed = 0.8;

    // Particle animation for hero section (example using a dummy function)
    // In a real scenario, you'd integrate a library like tsParticles here
    const initParticles = () => {
      const particleContainer = document.getElementById('hero-particles');
      if (particleContainer) {
        // Simple particle-like effect with Anime.js for demonstration
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = `${anime.random(1, 3)}px`;
          particle.style.height = particle.style.width;
          particle.style.backgroundColor = 'rgba(192, 132, 252, 0.5)'; // purple-400 with opacity
          particle.style.borderRadius = '50%';
          particle.style.left = `${anime.random(0, 100)}%`;
          particle.style.top = `${anime.random(0, 100)}%`;
          particleContainer.appendChild(particle);

          anime({
            targets: particle,
            translateX: anime.random(-100, 100),
            translateY: anime.random(-100, 100),
            scale: [1, anime.random(0.5, 1.5), 1],
            opacity: [0.5, anime.random(0.1, 0.8), 0.5],
            duration: anime.random(3000, 6000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            delay: anime.random(0, 1000)
          });
        }
      }
    };
    initParticles();

  }, []);

  return (
    <>
      <Head>
        <title>GĒMU PRO - High-End Game Development</title>
        <meta name="description" content="Showcasing powerful, professional, and creative games by GĒMU PRO." />
        <link rel="icon" href="/favicon.ico" /> {/* Add a favicon later */}
      </Head>
      <Preloader />
      <Navbar />
      <main>
        <HeroSection />
        <div id="games">
          <GameSection {...gameData.slayers_duel} />
          <GameSection {...gameData.galaxy_war} />
        </div>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

