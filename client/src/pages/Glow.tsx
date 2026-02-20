import { motion } from "framer-motion";
import { Sparkles, Droplets, Moon, Footprints, Flame, Timer, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Glow() {
  const [habits, setHabits] = useState([
    { id: 'water', name: "Hydration", icon: Droplets, value: 3, target: 8, unit: "glasses", color: "text-[#60A5FA]", bg: "bg-[#E0F2FE]", track: "bg-[#BFDBFE]" },
    { id: 'steps', name: "Movement", icon: Footprints, value: 6500, target: 10000, unit: "steps", color: "text-[#FB923C]", bg: "bg-[#FFEDD5]", track: "bg-[#FED7AA]" },
    { id: 'sleep', name: "Beauty Sleep", icon: Moon, value: 7.5, target: 8, unit: "hours", color: "text-[#818CF8]", bg: "bg-[#EDE9FE]", track: "bg-[#C7D2FE]" },
    { id: 'skincare', name: "Skincare AM/PM", icon: Sparkles, value: 1, target: 2, unit: "routines", color: "text-[#F472B6]", bg: "bg-[#FCE7F3]", track: "bg-[#FBCFE8]" },
  ]);

  const toggleSkincare = () => {
    setHabits(habits.map(h => {
      if (h.id === 'skincare') return { ...h, value: h.value === 1 ? 2 : 1 };
      return h;
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2">
            Glow Tracker <Sparkles className="text-primary" size={24} />
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">Invest in yourself today.</p>
        </div>
      </header>

      {/* Focus Timer Mini App */}
      <section className="bg-gradient-to-br from-white to-primary/5 rounded-[32px] p-6 shadow-sm border border-white/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="font-bold text-[18px]">Deep Focus</h3>
            <p className="text-[12px] text-muted-foreground font-medium mt-0.5">Stay aesthetic, stay focused.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
            <Timer size={20} />
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-serif font-medium tabular-nums tracking-tight">25:00</h2>
          <div className="flex gap-3 mt-6">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-lg shadow-primary/30 hover:scale-105 transition-transform active:scale-95">
              Start Focus
            </button>
            <button className="bg-white text-foreground px-6 py-3 rounded-full font-bold text-[14px] shadow-sm hover:bg-muted/50 transition-colors">
              Break
            </button>
          </div>
        </div>
      </section>

      {/* Daily Habits */}
      <section>
        <div className="flex justify-between items-end mb-5">
          <h3 className="font-serif text-[22px] font-medium tracking-tight">Daily Habits</h3>
          <div className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
            <Flame size={12} strokeWidth={3} />
            12 Day Streak!
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-full ${habit.bg} ${habit.color} flex items-center justify-center`}>
                  <habit.icon size={20} strokeWidth={2.5} />
                </div>
                {habit.id === 'skincare' && habit.value === habit.target ? (
                  <CheckCircle2 size={20} className="text-green-400" />
                ) : null}
              </div>
              
              <h4 className="font-bold text-[14px] leading-tight mb-1">{habit.name}</h4>
              <p className="text-[20px] font-serif font-medium mt-auto">
                {habit.value}<span className="text-[12px] font-sans font-bold text-muted-foreground ml-1">/ {habit.target} {habit.unit}</span>
              </p>
              
              <div className={`mt-3 h-2 w-full ${habit.track} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${habit.color.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: `${(habit.value / habit.target) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Workout Widget */}
      <section>
        <h3 className="font-serif text-[22px] font-medium tracking-tight mb-4">Today's Movement</h3>
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F8] text-[#F472B6] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 11-4-4-4 4"/><path d="m16 18-4-4-4 4"/><path d="M12 2v20"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-[15px]">Pilates Flow</h4>
              <p className="text-[12px] text-muted-foreground font-medium mt-0.5">45 min • Full Body</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <CheckCircle2 size={20} />
          </button>
        </div>
      </section>

    </motion.div>
  );
}