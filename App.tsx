import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Box, 
  Truck, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Menu, 
  X,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  FileText
} from 'lucide-react';

// --- Assets (Custom Industrial SVGs as Fallbacks) ---
const svgWire = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='gradR' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%238B0000'/%3E%3Cstop offset='100%25' stop-color='%23FF4500'/%3E%3C/linearGradient%3E%3ClinearGradient id='gradB' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%23333'/%3E%3C/linearGradient%3E%3Cfilter id='shadow'%3E%3CfeDropShadow dx='2' dy='4' stdDeviation='4' flood-opacity='0.5'/%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='90' cy='110' r='55' fill='none' stroke='url(%23gradB)' stroke-width='24' filter='url(%23shadow)'/%3E%3Ccircle cx='110' cy='90' r='55' fill='none' stroke='url(%23gradR)' stroke-width='24' filter='url(%23shadow)'/%3E%3C/svg%3E`;

const svgMount = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='metal' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23e0e0e0'/%3E%3Cstop offset='50%25' stop-color='%23999'/%3E%3Cstop offset='100%25' stop-color='%23777'/%3E%3C/linearGradient%3E%3Cfilter id='drop'%3E%3CfeDropShadow dx='4' dy='8' stdDeviation='6' flood-opacity='0.4'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M40 160 L160 160 L160 130 L100 130 L100 40 L70 40 L70 130 L40 130 Z' fill='url(%23metal)' filter='url(%23drop)' stroke='%23555' stroke-width='1'/%3E%3Ccircle cx='130' cy='145' r='6' fill='%23333'/%3E%3Ccircle cx='85' cy='60' r='6' fill='%23333'/%3E%3C/svg%3E`;

const svgBolt = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='boltGrad' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ccc'/%3E%3Cstop offset='1' stop-color='%23888'/%3E%3C/linearGradient%3E%3Cfilter id='bShadow'%3E%3CfeDropShadow dx='2' dy='4' stdDeviation='3' flood-opacity='0.5'/%3E%3C/filter%3E%3C/defs%3E%3Crect x='85' y='60' width='30' height='100' fill='url(%23boltGrad)' filter='url(%23bShadow)' rx='2'/%3E%3Cpath d='M85 60 L115 60 L115 160 L85 160 Z' fill='none' stroke='%23666' stroke-width='1' opacity='0.5' stroke-dasharray='4 2'/%3E%3Crect x='60' y='40' width='80' height='25' fill='url(%23boltGrad)' filter='url(%23bShadow)' rx='4'/%3E%3C/svg%3E`;

const svgClamp = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='clampG' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23bbb'/%3E%3Cstop offset='1' stop-color='%23888'/%3E%3C/linearGradient%3E%3Cfilter id='cShadow'%3E%3CfeDropShadow dx='3' dy='5' stdDeviation='5' flood-opacity='0.4'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M50 80 L50 140 L150 140 L150 80 L130 80 L130 120 L70 120 L70 80 Z' fill='url(%23clampG)' filter='url(%23cShadow)' stroke='%23666' stroke-width='1'/%3E%3Crect x='90' y='60' width='20' height='60' fill='%23555' rx='2'/%3E%3C/svg%3E`;

const svgRail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='railG' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23333'/%3E%3Cstop offset='50%25' stop-color='%23111'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/linearGradient%3E%3Cfilter id='rShadow'%3E%3CfeDropShadow dx='4' dy='8' stdDeviation='6' flood-opacity='0.6'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M20 80 L380 40 L380 120 L20 160 Z' fill='url(%23railG)' filter='url(%23rShadow)' stroke='%23444' stroke-width='1'/%3E%3Cpath d='M20 80 L380 40' stroke='%23555' stroke-width='2'/%3E%3Crect x='40' y='90' width='300' height='10' fill='%23000' opacity='0.5' transform='skewY(-6)'/%3E%3C/svg%3E`;

const svgInverter = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='invG' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23eee'/%3E%3Cstop offset='1' stop-color='%23ccc'/%3E%3C/linearGradient%3E%3Cfilter id='iShadow'%3E%3CfeDropShadow dx='0' dy='10' stdDeviation='10' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Crect x='40' y='30' width='120' height='140' rx='8' fill='url(%23invG)' filter='url(%23iShadow)'/%3E%3Crect x='50' y='50' width='100' height='60' rx='4' fill='%23111'/%3E%3Ccircle cx='100' cy='140' r='10' fill='%2322c55e'/%3E%3C/svg%3E`;

// Image Configuration
// To use real images, place files in 'public/' with these names.
const IMAGES = {
  wire: { src: '/pv-wire.png', fallback: svgWire, key: 'wire' },
  mount: { src: '/roof-mount.png', fallback: svgMount, key: 'mount' },
  bolt: { src: '/t-bolt.png', fallback: svgBolt, key: 'bolt' },
  clamp: { src: '/universal-clamp.png', fallback: svgClamp, key: 'clamp' },
  rail: { src: '/structural-rail.png', fallback: svgRail, key: 'rail' },
  inverter: { src: '/lux-inverter.png', fallback: svgInverter, key: 'inverter' },
  micro: { src: '/enphase-micro.png', fallback: svgInverter, key: 'micro' },
};

// Global state for drag-and-drop uploaded images (stored in localStorage for persistence)
const getStoredImage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`eko-image-${key}`);
  }
  return null;
};

const storeImage = (key: string, dataUrl: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`eko-image-${key}`, dataUrl);
  }
};

// --- Intersection Observer Hook ---
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { once = true, ...observerOptions } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: observerOptions.threshold || 0.1,
        rootMargin: observerOptions.rootMargin || '0px',
        ...observerOptions,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, observerOptions.threshold, observerOptions.rootMargin, once]);

  return isIntersecting && !hasAnimated;
};

// --- Enhanced Scroll-Triggered Section Component ---
interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const ScrollSection = React.forwardRef<HTMLDivElement, ScrollSectionProps>(({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  rootMargin = '-100px',
  once = true,
}, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const elementRef = (ref && typeof ref === 'object' && 'current' in ref) ? ref : internalRef;
  const isInView = useInView(elementRef as React.RefObject<HTMLElement>, { 
    once, 
    amount: threshold,
    margin: rootMargin as any
  });

  const animationVariants = {
    fadeIn: { opacity: 0 },
    fadeInUp: { opacity: 0, y: 60 },
    fadeInDown: { opacity: 0, y: -60 },
    fadeInLeft: { opacity: 0, x: -60 },
    fadeInRight: { opacity: 0, x: 60 },
    scaleIn: { opacity: 0, scale: 0.8 },
    slideIn: { opacity: 0, x: 80 },
  };

  const variant = animationVariants[animationType] || animationVariants.fadeInUp;

  return (
    <motion.div
      ref={elementRef}
      initial={variant}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : variant}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

ScrollSection.displayName = 'ScrollSection';

// Keep AnimatedSection for backward compatibility
const AnimatedSection = ScrollSection;

// --- Components ---

// Wrapper component to handle image loading errors gracefully with drag-and-drop support
const ImageWithFallback = ({ src, fallback, alt, className, style, imageKey, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(() => {
    // Check for stored image first, then use src
    if (imageKey) {
      const stored = getStoredImage(imageKey);
      if (stored) return stored;
    }
    return src;
  });
  const [isDragging, setIsDragging] = useState(false);
  
  // Reset if prop changes
  useEffect(() => {
    if (imageKey) {
      const stored = getStoredImage(imageKey);
      if (stored) {
        setImgSrc(stored);
        return;
      }
    }
    setImgSrc(src);
  }, [src, imageKey]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImgSrc(dataUrl);
        // Store in localStorage for persistence
        if (imageKey) {
          storeImage(imageKey, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <motion.img 
        {...props}
        src={imgSrc}
        alt={alt}
        className={`${className} ${isDragging ? 'ring-4 ring-industrial-accent ring-opacity-50' : ''} transition-all`}
        style={style}
        onError={() => {
          if (imgSrc !== fallback && !imgSrc.startsWith('data:')) {
            setImgSrc(fallback);
          }
        }}
      />
      {isDragging && (
        <div className="absolute inset-0 bg-industrial-accent/20 border-2 border-dashed border-industrial-accent flex items-center justify-center pointer-events-none z-50">
          <div className="bg-black/80 text-white px-4 py-2 rounded font-bold text-sm">
            DROP IMAGE HERE
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-industrial-900/90 backdrop-blur-md border-zinc-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-white">SOCON<span className="text-zinc-500"> DISTRIBUTORS</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#products" className="hover:text-white transition-colors">INVENTORY</a>
          <a href="#benefits" className="hover:text-white transition-colors">LOGISTICS</a>
          <button className="bg-white text-black px-5 py-2 font-bold hover:bg-zinc-200 transition-colors skew-x-[-6deg]">
            <span className="skew-x-[6deg] inline-block">PORTAL LOGIN</span>
          </button>
        </div>
        
        <button className="md:hidden text-white">
          <Menu />
        </button>
      </div>
    </nav>
  );
};

// Product Slideshow Component
const ProductSlideshow = ({ style, className }: { style?: any; className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Product images to cycle through
  const products = [
    { ...IMAGES.rail, alt: 'Structural Rail' },
    { ...IMAGES.inverter, alt: 'LuxPower Inverter' },
    { ...IMAGES.mount, alt: 'Roof Mount' },
    { ...IMAGES.wire, alt: 'PV Wire' },
    { ...IMAGES.bolt, alt: 'T-Bolt' },
    { ...IMAGES.clamp, alt: 'Universal Clamp' },
    { ...IMAGES.micro, alt: 'Enphase Microinverter' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className={`relative ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-20 left-0 w-[800px] drop-shadow-2xl z-0 opacity-30"
        >
          <motion.img
            src={products[currentIndex].src}
            alt={products[currentIndex].alt}
            className="w-full h-auto grayscale transition-all duration-500"
            onError={(e) => {
              // Fallback to SVG if image fails to load
              const target = e.target as HTMLImageElement;
              const fallbackSrc = products[currentIndex].fallback;
              if (target.src !== fallbackSrc && !target.src.includes('data:image/svg+xml')) {
                target.src = fallbackSrc;
              }
            }}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {products.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-industrial-accent w-8' : 'bg-zinc-600 w-1.5'
            }`}
            initial={false}
            animate={{
              width: index === currentIndex ? 32 : 6,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);
  
  // Fade out hero as user scrolls - ensure visible on load
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.98, 0.95]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-industrial-900"
      initial={{ opacity: 1 }}
      style={{ opacity, scale }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.05]" />
      
      {/* Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-industrial-accent/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1 border border-industrial-accent/30 text-industrial-accent text-xs font-mono mb-6 bg-industrial-accent/5 backdrop-blur-sm">
            REGIONAL DISTRIBUTION • SOCAL
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-6">
            BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">FASTER.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
            Stop waiting on shipping. We stock Tier-1 racking, wire, and mounting hardware locally. Same-day will-call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-industrial-accent text-white px-8 py-4 font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all group">
              OPEN ACCOUNT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-zinc-700 text-white px-8 py-4 font-bold hover:bg-zinc-800 transition-all">
              VIEW INVENTORY
            </button>
          </div>
        </motion.div>

        <div className="relative h-[600px] hidden md:block select-none z-0">
           {/* Animated Product Slideshow - Background */}
           <ProductSlideshow 
             style={{ y: y1, rotate: rotate }}
             className="h-full"
           />
        </div>
      </div>
    </motion.section>
  );
};

// --- ENHANCED PRODUCT CARD ---
const ProductCard = ({ 
  title, 
  desc, 
  imgConfig, 
  specs = [], 
  size = "normal", 
  index 
}: { 
  title: string, 
  desc: string, 
  imgConfig: { src: string, fallback: string, key: string }, 
  specs?: string[], 
  size?: "normal" | "wide" | "tall", 
  index: number 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform spring values to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Parallax sheen effect
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "200%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`relative group perspective-[1000px] z-0 hover:z-10 ${
        size === "wide" ? "md:col-span-2" : size === "tall" ? "md:row-span-2" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="relative h-full w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-industrial-accent/50 transition-all duration-500 shadow-xl"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Dynamic Sheen/Glare */}
        <motion.div 
            style={{ left: sheenX, opacity: useTransform(x, [-0.5, 0, 0.5], [0.3, 0, 0.3]) }}
            className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-10 pointer-events-none"
        />

        {/* Stock Badge */}
        <div className="absolute top-4 left-4 z-20" style={{ transform: "translateZ(30px)" }}>
          <div className="bg-industrial-accent/90 backdrop-blur-sm text-black text-[10px] font-black px-2 py-1 uppercase tracking-widest flex items-center gap-1.5 rounded-sm shadow-lg">
             <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" /> IN STOCK
          </div>
        </div>

        {/* Image Area */}
        <div className="h-64 md:h-[300px] w-full p-8 flex items-center justify-center relative z-10" style={{ transformStyle: "preserve-3d" }}>
            {/* Ambient Glow */}
            <motion.div 
              className="absolute w-40 h-40 bg-industrial-accent/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ 
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]), 
                y: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
                transform: "translateZ(-20px)" 
              }}
            />
            
            <ImageWithFallback 
              src={imgConfig.src} 
              fallback={imgConfig.fallback}
              imageKey={imgConfig.key}
              alt={title} 
              className="max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl relative z-20 will-change-transform"
              style={{ 
                transform: "translateZ(50px)",
                scale: useTransform(mouseYSpring, [-0.5, 0.5], [1.1, 1.1]) 
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
        </div>

        {/* Info Area */}
        <div 
          className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-zinc-950 via-zinc-900/90 to-transparent pt-12"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-industrial-accent transition-colors">
                    {title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-3 max-w-[90%]">
                    {desc}
                </p>
            </div>
            <div className="bg-zinc-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Tech Specs */}
          <div className="flex flex-wrap gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
             {specs.map((s, i) => (
                <span key={i} className="text-[10px] font-mono border border-zinc-700 bg-zinc-900/50 px-2 py-1 rounded text-zinc-400">
                    {s}
                </span>
             ))}
          </div>
        </div>

        {/* Industrial Accents */}
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-8 h-8 border-t-2 border-r-2 border-industrial-accent rounded-tr-lg" />
        </div>
        <div className="absolute bottom-0 left-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-8 h-8 border-b-2 border-l-2 border-industrial-accent rounded-bl-lg" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const InventorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineVisible = useIntersectionObserver(lineRef, { threshold: 0.2 });
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Only apply subtle scroll effects, ensure visibility
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30]);

  return (
    <motion.section 
      ref={sectionRef}
      id="products" 
      className="py-24 bg-industrial-900"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ y }}
    >
      <div className="max-w-7xl mx-auto px-2">
        <div className="mb-16">
          <div 
            ref={lineRef}
            className="h-1 bg-industrial-accent mb-6 transition-all duration-1000 ease-out"
            style={{ width: isLineVisible ? '96px' : '0px' }}
          />
          <AnimatedSection
            ref={titleRef}
            animationType="fadeInLeft"
            delay={0.2}
            duration={0.8}
            threshold={0.2}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            <h2>CORE INVENTORY</h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[350px] gap-6">
          {/* Featured Inverter - Takes 2x2 space on Desktop */}
          <ProductCard 
            index={0}
            title="LuxPower 6000XP" 
            desc="Hybrid 6kW Inverter. Split-phase output, 8kW MPPT, and battery ready. The new standard for off-grid power." 
            imgConfig={IMAGES.inverter}
            specs={["6kW Output", "48V Battery", "IP65 Rated"]}
            size="wide"
          />
          
          <ProductCard 
            index={1}
            title="Enphase IQ8AC" 
            desc="Microinverter for high-powered 72-cell modules. Grid-forming capable with sunlight backup." 
            imgConfig={IMAGES.micro}
            specs={["366VA Peak", "240V/208V", "25-Year Warranty"]}
          />

           <ProductCard 
            index={2}
            title="Structural Rail" 
            desc="6061-T6 Aluminum. 14ft & 20ft lengths available for immediate pickup." 
            imgConfig={IMAGES.rail}
            specs={["6061-T6", "UL 2703", "Black/Mill"]}
          />

          <ProductCard 
            index={3}
            title="PV Wire (10 AWG)" 
            desc="UL 4703 Photovoltaic Wire. 1000V/2000V rated. Red & Black spools." 
            imgConfig={IMAGES.wire}
            specs={["10 AWG", "1000V/2000V", "UL 4703"]}
          />
          
          <ProductCard 
            index={4}
            title="Roof Attachments" 
            desc="Comp shingle flashing and tile hooks. Triple-seal waterproof technology." 
            imgConfig={IMAGES.mount}
            specs={["Waterproof", "Lag Included", "Miami-Dade"]}
          />
          
          <ProductCard 
            index={5}
            title="Universal Clamps" 
            desc="Pre-assembled mid and end clamps. Integrated grounding pins." 
            imgConfig={IMAGES.clamp}
            specs={["30-50mm", "Pre-assembled", "Integrated Bond"]}
          />

          <ProductCard 
            index={6}
            title="Hardware & Grounding" 
            desc="SS304 T-Bolts, flange nuts, and grounding lugs. Bulk kegs available." 
            imgConfig={IMAGES.bolt}
            specs={["SS304", "Corrosion Resistant", "M8/M10"]}
          />
        </div>
      </div>
    </motion.section>
  );
};


const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Only apply subtle scroll effects, ensure visibility
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  return (
    <motion.section 
      ref={sectionRef}
      id="benefits" 
      className="pt-16 pb-32 bg-industrial-900 overflow-hidden min-h-screen flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ y }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-32 items-start">
          <div className="py-12">
            <AnimatedSection
              animationType="fadeInLeft"
              delay={0.1}
              duration={0.8}
              threshold={0.2}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-24 tracking-tight">WHY PROS BUY LOCAL</h2>
            </AnimatedSection>
            
            <div className="space-y-24">
              {[
                { 
                  icon: <Truck className="w-7 h-7 text-white" />, 
                  title: "No Freight Delays", 
                  desc: "Don't let a missing pallet stop your job. Drive in, load up, and get back to the roof in under an hour." 
                },
                { 
                  icon: <ShieldCheck className="w-7 h-7 text-white" />, 
                  title: "Verified Hardware", 
                  desc: "We only stock UL-listed, code-compliant gear. No cheap knock-offs. Every bolt and rail is inspected." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-16 h-16 rounded-lg bg-industrial-accent flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="py-12 md:pt-[280px]">
            <div className="space-y-24">
              {[
                { 
                  icon: <Clock className="w-7 h-7 text-white" />, 
                  title: "6AM - 6PM Will Call", 
                  desc: "We run on contractor hours. Early pickup available so you can beat the midday sun." 
                },
                { 
                  icon: <Zap className="w-7 h-7 text-white" />, 
                  title: "Bulk Pricing Available", 
                  desc: "Volume discounts for large orders. Net-30 terms for qualified contractors. Competitive pricing on all inventory." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-16 h-16 rounded-lg bg-industrial-accent flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <AnimatedSection
          animationType="fadeInRight"
          delay={0.3}
          duration={0.8}
          threshold={0.2}
          className="relative py-12 flex items-center justify-center min-h-[600px]"
        >
          <div className="relative bg-zinc-800/50 border border-zinc-700 p-10 rounded-xl shadow-2xl w-full">
            <div className="flex justify-between items-center mb-8 pb-6">
              <span className="text-sm font-mono text-zinc-400">ORDER #4921</span>
              <span className="text-green-500 text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                READY FOR PICKUP
              </span>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-zinc-700 rounded border border-zinc-600 flex items-center justify-center p-2">
                  <ImageWithFallback src={IMAGES.rail.src} fallback={IMAGES.rail.fallback} imageKey={IMAGES.rail.key} alt="rail" className="w-full h-full object-contain opacity-70" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">14ft Rail (Black)</div>
                  <div className="text-xs text-zinc-400 mt-1">Qty: 40</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-zinc-700 rounded border border-zinc-600 flex items-center justify-center p-2">
                  <ImageWithFallback src={IMAGES.bolt.src} fallback={IMAGES.bolt.fallback} imageKey={IMAGES.bolt.key} alt="bolt" className="w-full h-full object-contain opacity-70" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">T-Bolts SS304</div>
                  <div className="text-xs text-zinc-400 mt-1">Qty: 100 (Box)</div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-zinc-700 flex justify-between items-center">
              <div className="text-zinc-400 text-base">Total Weight</div>
              <div className="text-white font-mono font-bold text-2xl">480 LBS</div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-400 text-base">Pickup Window</span>
                <span className="text-white font-bold text-base">Today 2:00 PM - 6:00 PM</span>
              </div>
              <button className="w-full mt-6 bg-industrial-accent text-black text-base font-bold px-6 py-3 hover:bg-orange-600 transition-colors">
                VIEW ORDER DETAILS
              </button>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Additional Stats Row */}
        <motion.div 
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-16 pt-20 border-t border-zinc-800"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {[
            { value: "15+", label: "YEARS ACTIVE" },
            { value: "850+", label: "CONTRACTORS" },
            { value: "4.2K", label: "SKUS IN STOCK" },
            { value: "< 2HR", label: "PICKUP TIME" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="text-4xl md:text-5xl font-black text-industrial-accent mb-3">{stat.value}</div>
              <div className="text-zinc-400 text-sm font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Only apply subtle scroll effects, ensure visibility
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, -20]);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-24 bg-industrial-accent relative overflow-hidden" 
      id="cta-section"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{ y }}
    >
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">
          READY TO SCALE?
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 font-medium max-w-2xl mx-auto">
          Join 850+ local installers who trust SOCON DISTRIBUTORS for their hardware supply chain. Apply for net-30 terms today.
        </p>
        
        {/* Action Buttons - Smaller */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-black text-base px-6 py-3 font-black hover:bg-zinc-100 transition-colors shadow-xl skew-x-[-6deg]">
            <span className="skew-x-[6deg] inline-block">OPEN CONTRACTOR ACCOUNT</span>
          </button>
          <button className="border-2 border-white text-white text-base px-6 py-3 font-bold hover:bg-white/10 transition-colors">
            VIEW PRICING
          </button>
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-black py-12 border-t border-zinc-900"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-industrial-accent skew-x-[-12deg]" />
          <span className="text-lg font-bold text-white">SOCON<span className="text-zinc-600"> DISTRIBUTORS</span></span>
        </div>
        <div className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} SOCON DISTRIBUTORS. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default function App() {
  return (
    <main className="bg-industrial-900 min-h-screen text-zinc-200">
      <Navbar />
      <Hero />
      <InventorySection />
      <BenefitsSection />
      <CTA />
      <Footer />
    </main>
  );
}
 
 
