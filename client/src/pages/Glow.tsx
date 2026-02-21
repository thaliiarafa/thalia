import { motion } from "framer-motion";
import { Sparkles, Droplets, Moon, Footprints, Flame, Timer, CheckCircle2, RefreshCw, Smartphone, Plus, Minus } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Habit } from "@shared/schema";

const HABIT_CONFIG = [
  { key: 'water', name: "Hydration", icon: Droplets, target: 8, unit: "glasses", color: "text-[#60A5FA]", bg: "bg-[#E0F2FE]", track: "bg-[#BFDBFE]", barColor: "bg-[#60A5FA]" },
  { key: 'steps', name: "Movement", icon: Footprints, target: 10000, unit: "steps", color: "text-[#FB923C]", bg: "bg-[#FFEDD5]", track: "bg-[#FED7AA]", barColor: "bg-[#FB923C]" },
  { key: 'sleep', name: "Beauty Sleep", icon: Moon, target: 8, unit: "hours", color: "text-[#818CF8]", bg: "bg-[#EDE9FE]", track: "bg-[#C7D2FE]", barColor: "bg-[#818CF8]" },
  { key: 'skincare', name: "Skincare AM/PM", icon: Sparkles, target: 2, unit: "routines", color: "text-[#F472B6]", bg: "bg-[#FCE7F3]", track: "bg-[#FBCFE8]", barColor: "bg-[#F472B6]" },
];

export default function Glow() {
  const [isSyncing, setIsSyncing] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerMode, setTimerMode] = useState<"focus" | "break">("focus");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data: habitsData = [] } = useQuery<Habit[]>({
    queryKey: ["/api/habits", { date: todayStr }],
    queryFn: async () => {
      const res = await fetch(`/api/habits?date=${todayStr}`);
      return res.json();
    },
  });

  const upsertHabit = useMutation({
    mutationFn: async (data: { habitKey: string; value: number; target: number; date: string }) => {
      const res = await apiRequest("POST", "/api/habits", data);
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/habits"] }),
  });

  const saveFocusSession = useMutation({
    mutationFn: async (data: { duration: number; date: string }) => {
      const res = await apiRequest("POST", "/api/focus-sessions", data);
      return res.json();
    },
  });

  const getHabitValue = (key: string) => {
    const found = habitsData.find(h => h.habitKey === key);
    return found ? found.value : 0;
  };

  const updateHabit = (key: string, target: number, delta: number) => {
    const currentVal = getHabitValue(key);
    const newVal = Math.max(0, currentVal + delta);
    upsertHabit.mutate({ habitKey: key, value: newVal, target, date: todayStr });
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const startTimer = useCallback(() => {
    setTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const switchMode = useCallback((mode: "focus" | "break") => {
    setTimerMode(mode);
    setTimerRunning(false);
    setTimerSeconds(mode === "focus" ? 25 * 60 : 5 * 60);
  }, []);

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      if (timerMode === "focus") {
        saveFocusSession.mutate({ duration: 25, date: todayStr });
      }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerRunning, timerSeconds]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const totalHabits = HABIT_CONFIG.length;
  const completedHabits = HABIT_CONFIG.filter(h => getHabitValue(h.key) >= h.target).length;
  const glowScore = Math.round((completedHabits / totalHabits) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2" data-testid="text-glow-title">
            Glow Tracker <Sparkles className="text-primary" size={24} />
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">Invest in yourself today.</p>
        </div>
      </header>

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
          <h2 className="text-5xl font-serif font-medium tabular-nums tracking-tight" data-testid="text-timer">{formatTime(timerSeconds)}</h2>
          <div className="flex gap-3 mt-6">
            <button 
              onClick={timerRunning ? pauseTimer : startTimer}
              data-testid="button-focus-toggle"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-lg shadow-primary/30 hover:scale-105 transition-transform active:scale-95"
            >
              {timerRunning ? "Pause" : "Start Focus"}
            </button>
            <button 
              onClick={() => switchMode(timerMode === "focus" ? "break" : "focus")}
              className="bg-white text-foreground px-6 py-3 rounded-full font-bold text-[14px] shadow-sm hover:bg-muted/50 transition-colors"
            >
              {timerMode === "focus" ? "Break" : "Focus"}
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-5">
          <h3 className="font-serif text-[22px] font-medium tracking-tight">Daily Habits</h3>
          <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20" data-testid="text-glow-score">
            <Sparkles size={12} strokeWidth={3} />
            {glowScore}% Glow
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {HABIT_CONFIG.map((habit) => {
            const val = getHabitValue(habit.key);
            const pct = Math.min((val / habit.target) * 100, 100);
            return (
              <div key={habit.key} className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col" data-testid={`habit-card-${habit.key}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-full ${habit.bg} ${habit.color} flex items-center justify-center`}>
                    <habit.icon size={20} strokeWidth={2.5} />
                  </div>
                  {val >= habit.target ? (
                    <CheckCircle2 size={20} className="text-green-400" />
                  ) : (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => updateHabit(habit.key, habit.target, habit.key === 'steps' ? -500 : -1)}
                        className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                        data-testid={`button-decrease-${habit.key}`}
                      >
                        <Minus size={12} />
                      </button>
                      <button 
                        onClick={() => updateHabit(habit.key, habit.target, habit.key === 'steps' ? 500 : 1)}
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        data-testid={`button-increase-${habit.key}`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  )}
                </div>
                
                <h4 className="font-bold text-[14px] leading-tight mb-1">{habit.name}</h4>
                <p className="text-[20px] font-serif font-medium mt-auto">
                  {val}<span className="text-[12px] font-sans font-bold text-muted-foreground ml-1">/ {habit.target} {habit.unit}</span>
                </p>
                
                <div className={`mt-3 h-2 w-full ${habit.track} rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full ${habit.barColor} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <section>
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-[24px] p-4 shadow-sm border border-white/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
              <Smartphone size={18} />
            </div>
            <div>
              <h4 className="font-bold text-[14px]">Health & Fitness App</h4>
              <p className="text-[11px] text-muted-foreground font-medium">Synced {isSyncing ? 'just now' : '5 mins ago'}</p>
            </div>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            data-testid="button-sync-health"
            className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-[11px] font-bold text-foreground shadow-sm hover:bg-muted/50 transition-colors"
          >
            <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-serif text-[22px] font-medium tracking-tight mb-4">Today's Movement</h3>
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F8] text-[#F472B6] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 11-4-4-4 4"/><path d="m16 18-4-4-4 4"/><path d="M12 2v20"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-[15px]">Pilates Flow</h4>
              <p className="text-[12px] text-muted-foreground font-medium mt-0.5">45 min - Full Body</p>
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
