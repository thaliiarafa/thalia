import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Event } from "@shared/schema";

const EVENT_COLORS = [
  { label: "Pink", value: "#F472B6" },
  { label: "Purple", value: "#C084FC" },
  { label: "Mint", value: "#34D399" },
  { label: "Blue", value: "#60A5FA" },
  { label: "Orange", value: "#FB923C" },
];

export default function Planner() {
  const [date, setDate] = useState<Date>(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("09:00");
  const [newDuration, setNewDuration] = useState("1h");
  const [newLocation, setNewLocation] = useState("");
  const [newType, setNewType] = useState("class");
  const [newColor, setNewColor] = useState("#F472B6");

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const dateStr = format(date, "yyyy-MM-dd");

  const { data: allEvents = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const dayEvents = allEvents.filter(e => e.date === dateStr);

  const addEvent = useMutation({
    mutationFn: async (event: any) => {
      const res = await apiRequest("POST", "/api/events", event);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setNewTitle("");
      setNewLocation("");
      setShowAdd(false);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/events/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/events"] }),
  });

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const hour = parseInt(newTime.split(":")[0]);
    const min = newTime.split(":")[1];
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const timeFormatted = `${String(h12).padStart(2, '0')}:${min} ${ampm}`;
    
    addEvent.mutate({
      title: newTitle,
      date: dateStr,
      time: timeFormatted,
      duration: newDuration,
      location: newLocation || undefined,
      type: newType,
      color: newColor,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-foreground font-semibold" data-testid="text-planner-title">Planner</h1>
        <Button 
          onClick={() => setShowAdd(true)}
          variant="outline" 
          size="icon" 
          data-testid="button-add-event"
          className="rounded-full w-10 h-10 border-primary/20 text-primary shadow-sm bg-white"
        >
          <Plus size={20} />
        </Button>
      </header>

      <div className="bg-white rounded-3xl p-4 shadow-sm border border-white/60">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-[15px]">{format(date, "MMMM yyyy")}</h3>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-muted"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-muted"><ChevronRight size={16} /></button>
          </div>
        </div>
        
        <div className="flex justify-between items-center px-1">
          {weekDays.map((day, i) => {
            const isSelected = day.getDate() === date.getDate() && day.getMonth() === date.getMonth();
            const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
            const hasEvents = allEvents.some(e => e.date === format(day, "yyyy-MM-dd"));
            return (
              <button 
                key={i}
                onClick={() => setDate(day)}
                data-testid={`button-day-${i}`}
                className={`flex flex-col items-center justify-center w-11 h-[68px] rounded-[20px] transition-all relative ${
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
                {hasEvents && !isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary absolute bottom-1.5"></div>}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-4 overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[15px]">New Event</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground"><X size={18} /></button>
            </div>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Event title"
              data-testid="input-event-title"
              className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase font-bold text-muted-foreground mb-1 block">Time</label>
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full bg-muted/30 border border-muted/50 rounded-xl px-3 py-2 text-[13px] font-medium" />
              </div>
              <div>
                <label className="text-[11px] uppercase font-bold text-muted-foreground mb-1 block">Duration</label>
                <select value={newDuration} onChange={(e) => setNewDuration(e.target.value)} className="w-full bg-muted/30 border border-muted/50 rounded-xl px-3 py-2 text-[13px] font-medium">
                  <option value="30m">30m</option><option value="1h">1h</option><option value="1.5h">1.5h</option><option value="2h">2h</option><option value="3h">3h</option>
                </select>
              </div>
            </div>
            <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Location (optional)" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-2 flex-wrap">
              {["class", "study", "gym", "social", "work"].map(t => (
                <button key={t} onClick={() => setNewType(t)} className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full transition-colors ${newType === t ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {EVENT_COLORS.map(c => (
                <button key={c.value} onClick={() => setNewColor(c.value)} className={`w-8 h-8 rounded-full border-2 transition-transform ${newColor === c.value ? 'scale-110 border-foreground' : 'border-transparent'}`} style={{ backgroundColor: c.value }} />
              ))}
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newTitle.trim() || addEvent.isPending}
              data-testid="button-submit-event"
              className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-[14px] shadow-md shadow-primary/20 disabled:opacity-50"
            >
              {addEvent.isPending ? "Adding..." : "Add Event"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-serif text-[22px] font-medium tracking-tight">Schedule</h2>
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider" data-testid="text-event-count">{dayEvents.length} Events</span>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Loading schedule...</div>
        ) : dayEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm font-medium">No events for this day. Tap + to add one!</div>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {dayEvents.map((event) => (
              <div key={event.id} className="relative flex items-start gap-6 group" data-testid={`event-item-${event.id}`}>
                <div className="absolute left-5 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full border-[3px] border-background bg-foreground shadow-sm"></div>
                
                <div className="w-14 shrink-0 text-right pt-0.5 opacity-80">
                  <div className="text-[13px] font-bold text-foreground leading-none">{event.time.split(' ')[0]}</div>
                  <div className="text-[9px] font-bold uppercase text-muted-foreground">{event.time.split(' ')[1]}</div>
                </div>
                
                <div className="flex-1 bg-white rounded-3xl p-4.5 shadow-sm border border-white/60 relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <div className="absolute left-0 top-0 bottom-0 w-[5px]" style={{ backgroundColor: event.color }}></div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[16px] text-foreground leading-snug">{event.title}</h4>
                    <button 
                      onClick={() => deleteEvent.mutate(event.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all"
                      data-testid={`button-delete-event-${event.id}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex gap-4 text-[12px] text-muted-foreground font-medium mt-3">
                    {event.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="opacity-70" /> {event.duration}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="opacity-70" /> {event.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
