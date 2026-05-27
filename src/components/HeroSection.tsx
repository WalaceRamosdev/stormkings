'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Activity } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-neon-glow opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-storm-blue rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-storm-blue font-display tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
            Competitive Excellence
          </h2>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-2 font-display uppercase tracking-tighter text-glow">
            Storm <span className="text-transparent bg-clip-text bg-gradient-to-r from-storm-blue to-white">Kings</span>
          </h1>

          <p className="text-storm-silver/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            A elite do FPS estratégico. Domine o campo de batalha, conquiste glória e faça parte da história.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <button className="group relative px-8 py-4 bg-storm-blue text-storm-950 font-bold font-display tracking-wider uppercase overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Participar da Guilda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-8 py-4 border border-white/20 text-white font-display tracking-wider uppercase hover:bg-white/5 hover:border-storm-blue/50 transition-all backdrop-blur-sm">
            Ver Campeonatos
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
          <StatItem icon={Users} label="Jogadores" value="1,240" />
          <StatItem icon={Trophy} label="Campeonatos" value="38" />
          <StatItem icon={Activity} label="Partidas" value="15,402" />
          <StatItem icon={Users} label="Times Ativos" value="312" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-storm-950 to-transparent" />
    </section>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <Icon className="w-6 h-6 text-storm-blue mb-2 opacity-80" />
      <span className="text-2xl font-bold text-white font-display">{value}</span>
      <span className="text-xs text-storm-silver/50 uppercase tracking-widest">{label}</span>
    </div>
  );
}
