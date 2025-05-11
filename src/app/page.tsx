import Head from 'next/head';

// Placeholder components - these will be created in subsequent steps
const Navbar = () => <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 text-white flex justify-between items-center shadow-lg"><div className="text-2xl font-bold">GĒMU PRO</div><div><a href="#slayers_duel" className="mx-2 hover:text-purple-400 transition-colors">Slayers Duel</a><a href="#galaxy_war" className="mx-2 hover:text-purple-400 transition-colors">Galaxy War</a><a href="#about" className="mx-2 hover:text-purple-400 transition-colors">About</a><a href="#contact" className="mx-2 hover:text-purple-400 transition-colors">Contact</a></div></nav>;
const HeroSection = () => <section className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center text-center p-8 bg-cover bg-center" style={{backgroundImage: "url('/assets/hero_background.jpg')"}}><h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">Experience Next-Level Gaming</h1><p className="text-xl md:text-2xl mb-8 animate-fade-in-up">Powerful, Professional, Creative Games by GĒMU PRO</p><a href="#games" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 animate-bounce-slow">Explore Games</a></section>;
const GameSection = ({ id, title, description, playStoreLink, images, videoUrl, features }) => (
  <section id={id} className="py-20 bg-gray-800 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-12 text-purple-400">{title}</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          {/* Placeholder for video or main image */}
          <div className="bg-gray-700 w-full h-64 md:h-96 rounded-lg shadow-xl mb-6 flex justify-center items-center text-gray-400">Video/Main Image Placeholder</div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {images.slice(0,3).map((img, index) => (
              <img key={index} src={img} alt={`${title} screenshot ${index + 1}`} className="rounded-lg shadow-md hover:opacity-80 transition-opacity" />
            ))}
          </div>
        </div>
        <div className="text-left">
          <p className="text-lg mb-6 leading-relaxed">{description}</p>
          <h3 className="text-2xl font-semibold mb-3 text-purple-300">Key Features:</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            {features.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
          <a href={playStoreLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">View on Google Play</a>
        </div>
      </div>
    </div>
  </section>
);
const AboutSection = () => <section id="about" className="py-20 bg-gray-900 text-white"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl font-bold mb-8 text-purple-400">About GĒMU PRO</h2><p className="text-lg max-w-3xl mx-auto leading-relaxed">GĒMU PRO is dedicated to crafting high-end, immersive gaming experiences. With a passion for innovation and a commitment to quality, we strive to push the boundaries of what games can be. Our skills in development and design ensure every title is a powerful and professional creation, designed to captivate and entertain.</p></div></section>;
const ContactSection = () => <section id="contact" className="py-20 bg-gray-800 text-white"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl font-bold mb-8 text-purple-400">Get In Touch</h2><p className="text-lg mb-8">Have a question or want to collaborate? Reach out!</p><form className="max-w-xl mx-auto"><div className="mb-4"><input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500" /></div><div className="mb-4"><input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500" /></div><div className="mb-4"><textarea placeholder="Your Message" rows={4} className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-purple-500 focus:border-purple-500"></textarea></div><button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">Send Message</button></form></div></section>;
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

export default function HomePage() {
  return (
    <>
      <Head>
        <title>GĒMU PRO - High-End Game Development</title>
        <meta name="description" content="Showcasing powerful, professional, and creative games by GĒMU PRO." />
        <link rel="icon" href="/favicon.ico" /> {/* Add a favicon later */}
      </Head>
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

