import { motion } from 'motion/react';
import { Mail, MapPin, Briefcase } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  email: string;
  location: string;
  image: string;
}

export function EquipmentTab() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Jane Doe',
      role: 'Full-Stack Developer',
      description: 'Specialized in backend development and AWS integration. Responsible for data architecture and real-time monitoring connections with RDS and EC2.',
      email: 'jane.doe@safedrive.com',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2MTk5MjExNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'John Doe',
      role: 'Frontend Developer',
      description: 'Focused on user experience and data visualization. Responsible for interface design, interactive graphics, and presentation of fatigue and drowsiness metrics.',
      email: 'john.doe@safedrive.com',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjIwMDIzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl text-white/90 mb-2 sm:mb-3">Meet Our Team</h2>
        <p className="text-sm sm:text-base text-white/50">
          Developers committed to road safety
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/2 backdrop-blur-sm p-5 sm:p-6 md:p-8 shadow-xl hover:border-white/20 transition-all">
              {/* Profile Image */}
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <div className="relative mb-4 sm:mb-5">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl text-white/90 mb-1">{member.name}</h3>
                <p className="text-xs sm:text-sm text-blue-400 mb-3 sm:mb-4">{member.role}</p>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4 sm:mb-6">
                  {member.description}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-white/30 shrink-0" />
                  <span className="text-white/50 truncate">{member.email}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-white/30 shrink-0" />
                  <span className="text-white/50">{member.location}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-blue-500/10 to-indigo-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Description */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-sm p-5 sm:p-6 md:p-8 shadow-xl max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-6">System Overview</h3>
        
        <div className="space-y-4 sm:space-y-5 text-white/60 leading-relaxed">
          <motion.div
            className="flex items-start gap-3 sm:gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 sm:mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-xs sm:text-sm">
              <span className="text-blue-400">SafeDrive Monitoring System</span> utilizes advanced computer vision
              and machine learning algorithms to detect driver fatigue and drowsiness in real-time.
            </p>
          </motion.div>

          <motion.div
            className="flex items-start gap-3 sm:gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 sm:mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-xs sm:text-sm">
              The system analyzes facial landmarks, eye closure patterns (PERCLOS), blink frequency,
              and yawn detection to determine the driver's alertness state.
            </p>
          </motion.div>

          <motion.div
            className="flex items-start gap-3 sm:gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 sm:mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-xs sm:text-sm">
              Real-time alerts are generated when dangerous fatigue levels are detected, helping prevent
              accidents caused by driver drowsiness.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
