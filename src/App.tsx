import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'motion/react';
import { Theme } from '@radix-ui/themes';
import { RealTimeTab } from './components/RealTimeTab';
import { HistoricalRecordsTab } from './components/HistoricalRecordsTab';
import { EquipmentTab } from './components/EquipmentTab';
import { Activity, Calendar, Users, LucideIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import '@radix-ui/themes/styles.css';

interface Tab {
  path: string;
  label: string;
  icon: LucideIcon;
}

function Layout() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  //observer to dynamically measure header height
  const navRef = useRef<HTMLDivElement>(null);
  const [measuredNavHeight, setMeasuredNavHeight] = useState(0);

  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setMeasuredNavHeight(entry.contentRect.height);
      }
    });
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle scroll statesss
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs: Tab[] = [
    { path: '/', label: 'Tiempo Real', icon: Activity },
    { path: '/historical', label: 'Registros Históricos', icon: Calendar },
    { path: '/equipment', label: 'Equipo', icon: Users },
  ];

  // Morph animation values
  const borderRadius = useTransform(scrollY, [0, 100], ['0px', '24px']);
  const translateY = useTransform(scrollY, [0, 100], [0, 12]);
  const backdropOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const shadowIntensity = useTransform(scrollY, [0, 100], [0, 0.3]);
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '400px']);
  const navPadding = useTransform(scrollY, [0, 100], ['24px', '12px']);
  const navHeight = useTransform(scrollY, [0, 100], ['80px', '64px']);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white text-base md:text-lg">
      {/*Top navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <motion.nav
          ref={navRef}
          className="flex items-center"
          style={{
            y: translateY,
            width: navWidth,
            height: navHeight,
            paddingLeft: navPadding,
            paddingRight: navPadding,
            borderRadius,
            backgroundColor: `rgba(11, 15, 25, ${backdropOpacity})`,
            boxShadow: `0 8px 32px rgba(0, 0, 0, ${shadowIntensity})`,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
        <motion.div
          className="backdrop-blur-xl absolute inset-0 -z-10"
          style={{ borderRadius }}
        />

        <div className="flex w-full items-center justify-center gap-4">
          {/* Logo and texxxt */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 md:w-12 md:h-12 shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <img
                src="/logo.svg"
                alt="SafeDrive Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Text - hidden when scrolling */}
            <motion.div
              animate={{
                opacity: isScrolled ? 0 : 1,
                width: isScrolled ? 0 : 'auto',
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <h1 className="text-base md:text-xl font-semibold tracking-tight text-white whitespace-nowrap">
                SafeDrive
              </h1>
            </motion.div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <NavLink key={tab.path} to={tab.path} className="relative group">
                  <motion.div
                    className={`relative px-4 py-3 rounded-2xl text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-white hover:text-white'
                    }`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 relative z-10 transition-colors duration-300"
                      strokeWidth={isActive ? 2.5 : 2.0}
                    />

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"
                        transition={{
                          type: 'spring',
                          bounce: 0.25,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </motion.div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </motion.nav>
      </div>

      {/*Main content */}
      <main
        style={{ paddingTop: measuredNavHeight + 24 }}
        className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<RealTimeTab />} />
              <Route path="/historical" element={<HistoricalRecordsTab />} />
              <Route path="/equipment" element={<EquipmentTab />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Theme accentColor="blue" radius="large" scaling="110%">
      <Router>
        <Layout />
      </Router>
    </Theme>
  );
}
