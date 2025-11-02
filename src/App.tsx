import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Theme } from '@radix-ui/themes';
import { RealTimeTab } from './components/RealTimeTab';
import { HistoricalRecordsTab } from './components/HistoricalRecordsTab';
import { EquipmentTab } from './components/EquipmentTab';
import { Eye, Activity, Calendar, Users, LucideIcon } from 'lucide-react';
import '@radix-ui/themes/styles.css';

interface Tab {
  path: string;
  label: string;
  icon: LucideIcon;
}

function Layout() {
  const location = useLocation();

  const tabs: Tab[] = [
    { path: '/', label: 'Real-time', icon: Activity },
    { path: '/historical', label: 'Historical Records', icon: Calendar },
    { path: '/equipment', label: 'Equipment', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white text-base md:text-lg">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50  bg-[#0B0F19]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-5 md:py-6">
          <div className="flex items-center justify-between md:grid md:grid-cols-3">
            {/* Logo - Left */}
            <div className="flex items-center gap-4 justify-start">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg md:text-2xl font-semibold tracking-tight text-white">SafeDrive</h1>
                <p className="text-sm md:text-base text-white/50">Fatigue & Drowsiness Monitoring</p>
              </div>
            </div>

            {/* Navigation Tabs - Center */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location.pathname === tab.path;
                return (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    className="relative group"
                  >
                    <motion.div
                      className={`relative px-5 py-3 md:px-6 md:py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-blue-400'
                          : 'text-white hover:text-white'
                      }`}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon
                        className="w-6 h-6 md:w-7 md:h-7 relative z-10 transition-colors duration-300"
                        strokeWidth={isActive ? 2.5 : 2.0}
                      />

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        />
                      )}

                      {/* Tooltip */}
                      <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg hidden sm:block"
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {tab.label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                      </motion.div>
                    </motion.div>
                  </NavLink>
                );
              })}
            </div>

            {/* Right side - Empty for balance */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
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
