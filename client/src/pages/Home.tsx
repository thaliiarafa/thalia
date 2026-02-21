import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "wouter";
import { Heart, Droplets, Moon, Footprints, ChevronRight, CheckCircle2, Check } from "lucide-react";
import avatarImg from "@/assets/images/avatar.png";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Task, Event, Habit } from "@shared/schema";

export default function Home() {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  
  const quotes = [
    "Today is a new opportunity to grow, glow and achieve your goals.",
    "Discipline is the bridge between goals and accomplishment.",
    "Invest in yourself. You can afford it.",
    "Make yourself a priority today."
  ];

  const quoteOfTheDay = quotes[today.getDate() % quotes.length];

  const { data: tasks = [] } = useQuery<Task[]>({ queryKey: ["/api/tasks"] });
  const { data: allEvents = [] } = useQuery<Event[]>({ queryKey: ["/api/events"] });
  const { data: habitsData = [] } = useQuery<Habit[]>({
    queryKey: ["/api/habits", { date: todayStr }],
    queryFn: async () => {
      const res = await fetch(`/api/habits?date=${todayStr}`);
      return res.json();
    },
  });

  const toggleTask = useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { done });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tasks"] }),
  });

  const todayEvents = allEvents.filter(e => e.date === todayStr);
  const dailyTasks = tasks.filter(t => t.list === "daily");
  const topTasks = dailyTasks.slice(0, 3);

  const getHabitValue = (key: string) => {
    const found = habitsData.find(h => h.habitKey === key);
    return found ? found.value : 0;
  };

  const waterVal = getHabitValue("water");
  const sleepVal = getHabitValue("sleep");
  const stepsVal = getHabitValue("steps");

  const habitTargets = { water: 8, sleep: 8, steps: 10000, skincare: 2 };
  const totalCompleted = ["water", "sleep", "steps", "skincare"].filter(k => getHabitValue(k) >= habitTargets[k as keyof typeof habitTargets]).length;
  const glowScore = Math.round((totalCompleted / 4) * 100);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1" data-testid="text-date">
            {format(today, "EEEE, MMM do")}
          </h2>
          <h1 className="text-[28px] leading-tight font-serif text-foreground font-semibold" data-testid="text-greeting">
            {getGreeting()}, Emma <span className="inline-block hover:animate-spin origin-center">🌸</span>
          </h1>
        </div>
        <div className="relative shrink-0 ml-4 hover:scale-105 transition-transform">
          <Link href="/profile">
            <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-primary/40 p-0.5 cursor-pointer">
              <img src={avatarImg} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
          <div className="absolute top-1 right-0 w-3.5 h-3.5 bg-red-400 rounded-full border-2 border-background pointer-events-none"></div>
        </div>
      </header>

      <div className="bg-primary/10 rounded-3xl p-6 border border-primary/20 relative overflow-hidden shadow-sm">
        <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/10 rotate-12" />
        <p className="text-primary-foreground font-serif italic text-[17px] leading-relaxed relative z-10" data-testid="text-quote">
          "{quoteOfTheDay}"
        </p>
      </div>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-serif text-[22px] font-medium tracking-tight">Daily Glow</h3>
          <Link href="/glow">
            <span className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer hover:text-primary/80 transition-colors">
              View Details <ChevronRight size={14} />
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/60 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="relative w-24 h-24 flex items-center justify-center z-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/50" />
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="264" strokeDashoffset={264 - (264 * glowScore / 100)} className="text-primary drop-shadow-[0_0_8px_rgba(242,189,196,0.8)]" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center mt-1">
                <span className="text-3xl font-bold text-foreground" data-testid="text-glow-score">{glowScore}</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] -mt-1">Score</span>
              </div>
            </div>
            <p className="text-[13px] font-medium text-foreground/80 z-10">
              {glowScore >= 75 ? "You're glowing today!" : glowScore >= 50 ? "Making progress!" : "Let's get started!"}
            </p>
          </div>
          
          <div className="grid grid-rows-3 gap-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-3 shadow-sm border border-white/60 flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#E0F2FE] text-[#60A5FA] flex items-center justify-center">
                <Droplets size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[11px] mb-1.5 font-bold">
                  <span className="text-foreground tracking-wide">Water</span>
                  <span className="text-[#60A5FA]">{waterVal}/8</span>
                </div>
                <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[#60A5FA] rounded-full shadow-[0_0_5px_rgba(96,165,250,0.5)] transition-all" style={{ width: `${Math.min((waterVal / 8) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-3 shadow-sm border border-white/60 flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#EDE9FE] text-[#818CF8] flex items-center justify-center">
                <Moon size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[11px] mb-1.5 font-bold">
                  <span className="text-foreground tracking-wide">Sleep</span>
                  <span className="text-[#818CF8]">{sleepVal}h</span>
                </div>
                <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[#818CF8] rounded-full shadow-[0_0_5px_rgba(129,140,248,0.5)] transition-all" style={{ width: `${Math.min((sleepVal / 8) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-3 shadow-sm border border-white/60 flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#FFEDD5] text-[#FB923C] flex items-center justify-center">
                <Footprints size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[11px] mb-1.5 font-bold">
                  <span className="text-foreground tracking-wide">Steps</span>
                  <span className="text-[#FB923C]">{stepsVal >= 1000 ? `${(stepsVal / 1000).toFixed(1)}k` : stepsVal}</span>
                </div>
                <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FB923C] rounded-full shadow-[0_0_5px_rgba(251,146,60,0.5)] transition-all" style={{ width: `${Math.min((stepsVal / 10000) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-5">
          <h3 className="font-serif text-[22px] font-medium tracking-tight">Up Next</h3>
        </div>
        {todayEvents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm font-medium">
            No events today. <Link href="/planner"><span className="text-primary cursor-pointer">Add one in Planner</span></Link>
          </div>
        ) : (
          <div className="space-y-3 relative">
            <div className="absolute left-[24px] top-4 bottom-4 w-px bg-border/80 -z-10"></div>
            {todayEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex gap-4 items-stretch group" data-testid={`home-event-${event.id}`}>
                <div className="flex flex-col items-center justify-center min-w-[50px] shrink-0">
                  <span className="text-[13px] font-bold text-foreground tracking-tight">{event.time.split(' ')[0]}</span>
                  <span className="text-[9px] text-muted-foreground font-bold uppercase">{event.time.split(' ')[1]}</span>
                </div>
                <div className="flex-1 bg-white rounded-3xl p-4 shadow-sm border border-white/60 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ backgroundColor: event.color }}></div>
                  <h4 className="font-bold text-[15px] text-foreground">{event.title}</h4>
                  {event.location && (
                    <p className="text-[13px] text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: event.color }}></span>
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-serif text-[22px] font-medium tracking-tight">Top Priorities</h3>
        </div>
        {topTasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm font-medium">
            No tasks yet. <Link href="/tasks"><span className="text-primary cursor-pointer">Add some tasks</span></Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {topTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3.5 bg-white p-3.5 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60" data-testid={`home-task-${task.id}`}>
                <button 
                  onClick={() => toggleTask.mutate({ id: task.id, done: !task.done })}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${task.done ? 'bg-primary text-white scale-105' : 'border-2 border-muted-foreground/30 hover:border-primary'}`}
                  data-testid={`button-home-toggle-${task.id}`}
                >
                  {task.done && <Check size={14} strokeWidth={3} />}
                </button>
                <span className={`text-[14px] ${task.done ? 'text-muted-foreground line-through' : 'text-foreground font-semibold'}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
