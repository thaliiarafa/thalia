import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export default function Planner() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const events = [
    {
      id: 1,
      title: "Design Principles Lecture",
      time: "09:00 AM",
      duration: "1.5h",
      location: "Room 302",
      type: "class",
      color: "bg-[#F472B6]", // Pink
    },
    {
      id: 2,
      title: "Pilates Class",
      time: "12:00 PM",
      duration: "1h",
      location: "Studio Flow",
      type: "gym",
      color: "bg-[#34D399]", // Mint
    },
    {
      id: 3,
      title: "Group Study Project",
      time: "03:00 PM",
      duration: "2h",
      location: "Library Hub",
      type: "study",
      color: "bg-[#C084FC]", // Purple
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-foreground font-semibold">Planner</h1>
        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-primary/20 text-primary shadow-sm bg-white">
          <Plus size={20} />
        </Button>
      </header>

      {/* Mini Calendar Widget */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/60">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-[15px]">{format(date || new Date(), "MMMM yyyy")}</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-muted"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-muted"><ChevronRight size={16} /></button>
          </div>
        </div>
        
        {/* Weekly view instead of full calendar for better mobile fit in mockup */}
        <div className="flex justify-between items-center px-1">
          {weekDays.map((day, i) => {
            const isSelected = date && day.getDate() === date.getDate();
            const isToday = day.getDate() === today.getDate();
            return (
              <button 
                key={i}
                onClick={() => setDate(day)}
                className={`flex flex-col items-center justify-center w-11 h-[68px] rounded-[20px] transition-all ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105' 
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase mb-1.5 ${isSelected ? 'text-primary-foreground/80' : ''}`}>
                  {format(day, "E").charAt(0)}
                </span>
                <span className={`text-[16px] font-bold ${isToday && !isSelected ? 'text-primary' : ''}`}>
                  {format(day, "d")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-[22px] font-medium tracking-tight">Schedule</h2>
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{events.length} Events</span>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          
          {events.map((event, i) => (
            <div key={event.id} className="relative flex items-start gap-6 group">
              {/* Timeline Dot */}
              <div className="absolute left-5 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full border-[3px] border-background bg-foreground shadow-sm"></div>
              
              <div className="w-14 shrink-0 text-right pt-0.5 opacity-80">
                <div className="text-[13px] font-bold text-foreground leading-none">{event.time.split(' ')[0]}</div>
                <div className="text-[9px] font-bold uppercase text-muted-foreground">{event.time.split(' ')[1]}</div>
              </div>
              
              <div className="flex-1 bg-white rounded-3xl p-4.5 shadow-sm border border-white/60 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                <div className={`absolute left-0 top-0 bottom-0 w-[5px] ${event.color}`}></div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-[16px] text-foreground leading-snug">{event.title}</h4>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${event.color.replace('bg-', 'text-').replace('[', '').replace(']', '')} bg-opacity-10`} style={{ backgroundColor: `${event.color.replace('bg-', '')}20`, color: event.color.replace('bg-', '') }}>
                    {event.type}
                  </span>
                </div>
                
                <div className="flex gap-4 text-[12px] text-muted-foreground font-medium mt-3">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="opacity-70" /> {event.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="opacity-70" /> {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
}