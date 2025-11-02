import { motion } from 'motion/react';
import {MapPin, Briefcase } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  location: string;
  image: string;
}

export function EquipmentTab() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Ali Rada',
      role: 'Desarrollador Full-Stack',
      description: 'Especializado en desarrollo backend e integración con AWS. Responsable de la arquitectura de datos y conexiones de monitoreo en tiempo real con RDS y EC2.',
      location: 'Barranquilla, CO',
      image: 'Ali-rada.jpeg',
    },
    {
      name: 'Luciana De La Rosa',
      role: 'Desarrolladora Frontend',
      description: 'Enfocada en la experiencia de usuario y visualización de datos. Responsable del diseño de interfaz, gráficos interactivos y presentación de métricas de fatiga y somnolencia.',
      location: 'Barranquilla, CO',
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
        <h2 className="font-semibold text-2xl sm:text-3xl text-white/90 mb-2 sm:mb-3">Conoce Nuestro Equipo</h2>
        <p className="text-sm sm:text-base text-white/50">
          Desarrolladores comprometidos con la seguridad vial
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
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                <h3 className="font-semibold text-lg sm:text-xl text-white/90 mb-1">{member.name}</h3>
                <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">{member.role}</p>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4 sm:mb-6">
                  {member.description}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
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
    </div>
  );
}
