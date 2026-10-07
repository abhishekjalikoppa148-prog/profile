import { useEffect, useState, useRef } from 'react';
import { portfolioData } from './data/portfolio';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as DreiSparkles } from '@react-three/drei';
import { Mail, Code2, Database, Layout, Sparkles, Terminal, ArrowRight, ChevronDown } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);


const AnimatedObject = () => {
  const meshRef = useRef<any>(null);
  const meshRef2 = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = state.clock.getElapsedTime() * -0.1;
      meshRef2.current.rotation.y = state.clock.getElapsedTime() * -0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.3}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshPhysicalMaterial 
          color="#A89BBD" 
          roughness={0.2}
          metalness={0.9}
          transmission={0.4}
          thickness={0.5}
          emissive="#302b36"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={meshRef2} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial 
          color="#D8C3A3" 
          wireframe
          roughness={0.3}
          metalness={0.5}
          transparent
          opacity={0.15}
        />
      </mesh>
      <DreiSparkles count={40} scale={6} size={2.5} speed={0.3} opacity={0.6} color="#E6D7BE" />
      <DreiSparkles count={40} scale={6} size={1.5} speed={0.2} opacity={0.4} color="#C8BDD2" />
    </Float>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button') || target.closest('.glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div 
        className="cursor-dot w-2 h-2"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      <div 
        className={`cursor-dot-outline border ${isHovering ? 'w-16 h-16 bg-lavender/10 border-lavender' : 'w-8 h-8 border-beige'}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen relative selection:bg-lavender/30">
      <CustomCursor />
      
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-grid" />
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lavender/5 via-background to-background" />

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none px-6 py-4 bg-background/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-extrabold text-2xl tracking-tighter text-cream"
          >
            AK<span className="text-beige">.</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="hidden md:flex gap-8 text-sm font-medium"
          >
            {['Home', 'About', 'Skills', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-textSecondary hover:text-lavender transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-beige transition-all group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-beige/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-lavender mb-8 border-glassBorder">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lavender"></span>
                </span>
                {portfolioData.hero.status}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-2xl">
                <span className="block text-cream">ABHISHEK</span>
                <span className="text-gradient">JALIKOPPA</span>
              </h1>
              <p className="text-xl md:text-2xl text-textSecondary mb-8 font-light max-w-xl">
                {portfolioData.hero.subtitle}
              </p>
              <p className="text-lg text-textMuted max-w-xl mb-10 leading-relaxed">
                {portfolioData.hero.introduction}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-black/40 border border-beige/30 hover:bg-beige hover:text-background text-cream transition-colors duration-300 rounded-full font-semibold flex items-center justify-center">
                  Contact Me
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-[500px] w-full hidden lg:block relative"
            >
              <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F1E8D8" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#A89BBD" />
                <AnimatedObject />
              </Canvas>
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [-15, 15, -15] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 glass-card p-4 rounded-xl flex items-center gap-3 border-glassBorder shadow-[0_10px_30px_rgba(168,155,190,0.05)]"
              >
                <Code2 className="text-lavender" />
                <span className="font-mono text-sm text-textSecondary">Full-Stack Dev</span>
              </motion.div>
              <motion.div 
                animate={{ y: [15, -15, 15] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-10 glass-card p-4 rounded-xl flex items-center gap-3 border-glassBorder shadow-[0_10px_30px_rgba(216,195,168,0.05)]"
              >
                <Sparkles className="text-beige" />
                <span className="font-mono text-sm text-textSecondary">AI Integration</span>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-sm text-textMuted uppercase tracking-widest font-semibold">Scroll</span>
            <ChevronDown className="animate-bounce text-textMuted" />
          </motion.div>
        </section>

        {/* Section Transition Gradient */}
        <div className="h-32 bg-gradient-to-b from-transparent to-secondaryBg" />

        {/* About Section */}
        <section id="about" className="py-32 px-6 relative bg-secondaryBg">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-lavender/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cream leading-tight">
                  I build digital experiences where <br />
                  <span className="text-gradient">code meets creativity.</span>
                </h2>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-secondaryBg border border-glassBorder p-8 lg:p-12 rounded-2xl hover:shadow-[0_0_40px_rgba(168,155,190,0.08)] transition-shadow duration-500"
              >
                <p className="text-lg text-textSecondary leading-relaxed mb-8">
                  {portfolioData.about.content}
                </p>
                <div className="flex flex-wrap gap-3">
                  {portfolioData.about.interests.map(interest => (
                    <span key={interest} className="px-4 py-2 bg-darkSurface border border-glassBorder rounded-full text-sm text-textSecondary">
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Transition Gradient */}
        <div className="h-32 bg-gradient-to-b from-secondaryBg to-background" />

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold mb-4 text-cream">Technology Stack</h2>
              <p className="text-textMuted">The tools I use to bring ideas to life.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.skills.categories.map((category, idx) => (
                <motion.div 
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-darkSurface border border-glassBorder p-8 rounded-2xl group hover:bg-lavender/5 hover:border-lavender/30 hover:shadow-[0_0_30px_rgba(168,155,190,0.1)] transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-cream">
                    {idx === 0 && <Terminal className="text-beige" />}
                    {idx === 1 && <Code2 className="text-lavender" />}
                    {idx === 2 && <Layout className="text-beige" />}
                    {idx === 3 && <Database className="text-lavender" />}
                    {idx === 4 && <Sparkles className="text-beige" />}
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-background border border-glassBorder group-hover:border-lavender/20 rounded-md text-sm text-textSecondary transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 relative overflow-hidden bg-secondaryBg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lavender/10 via-transparent to-transparent opacity-50" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight drop-shadow-lg leading-tight"
            >
              <span className="block text-cream">LET'S BUILD</span>
              <span className="block text-cream">SOMETHING</span>
              <span className="text-gradient">MEANINGFUL.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-textSecondary mb-12"
            >
              Have an idea, project, or opportunity? Let's connect.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-6"
            >
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.contact.email}`} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-lavender hover:bg-beige text-background rounded-full font-bold text-lg transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(168,155,190,0.2)]">
                <span className="relative z-10">START A CONVERSATION</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background py-12 px-6">
        <div className="max-w-7xl mx-auto border-t border-glassBorder pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-extrabold text-2xl tracking-tighter text-cream">
            AK<span className="text-beige">.</span>
          </div>
          <p className="text-textMuted text-sm">
            Designed & built by Abhishek Jalikoppa. &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <a href={portfolioData.hero.socialLinks.github} className="text-textSecondary hover:text-lavender transition-colors duration-300">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={portfolioData.hero.socialLinks.linkedin} className="text-textSecondary hover:text-lavender transition-colors duration-300">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={portfolioData.hero.socialLinks.instagram} className="text-textSecondary hover:text-lavender transition-colors duration-300">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={`mailto:${portfolioData.contact.email}`} className="text-textSecondary hover:text-lavender transition-colors duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
