import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Draft Sociology paper", category: "study", priority: "high", done: false, list: "daily" },
    { id: 2, title: "Review Flashcards", category: "study", priority: "medium", done: true, list: "daily" },
    { id: 3, title: "Grocery shopping", category: "errands", priority: "low", done: false, list: "daily" },
    { id: 4, title: "Apply for summer internship", category: "personal", priority: "high", done: false, list: "master" },
    { id: 5, title: "Read 'Atomic Habits'", category: "personal", priority: "medium", done: false, list: "master" },
    { id: 6, title: "Clean out wardrobe", category: "errands", priority: "low", done: false, list: "master" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const TaskItem = ({ task }: { task: any }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex items-center gap-4 bg-white p-4 rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/60 transition-all ${task.done ? 'opacity-60' : ''}`}
    >
      <button 
        onClick={() => toggleTask(task.id)}
        className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all border-2 ${
          task.done 
            ? 'bg-primary border-primary text-white shadow-sm shadow-primary/30' 
            : 'border-muted-foreground/30 hover:border-primary'
        }`}
      >
        {task.done && <Check size={14} strokeWidth={3} />}
      </button>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-[15px] font-bold truncate transition-all ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
            {task.category}
          </span>
          <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      <button className="w-8 h-8 rounded-full text-muted-foreground flex items-center justify-center hover:bg-muted/50 transition-colors opacity-0 group-hover:opacity-100">
        <MoreHorizontal size={18} />
      </button>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-foreground font-semibold">To-Do List</h1>
        <button className="bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
          <Plus size={24} />
        </button>
      </header>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 mb-6 h-12">
          <TabsTrigger value="daily" className="rounded-xl text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Today</TabsTrigger>
          <TabsTrigger value="master" className="rounded-xl text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Master List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6 mt-0 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">Tasks for Today</h3>
            <span className="text-[12px] font-bold text-primary">
              {tasks.filter(t => t.list === 'daily' && t.done).length} / {tasks.filter(t => t.list === 'daily').length} Done
            </span>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.list === 'daily' && !t.done).map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
          
          {tasks.filter(t => t.list === 'daily' && t.done).length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px] mb-2">Completed</h3>
              {tasks.filter(t => t.list === 'daily' && t.done).map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="master" className="space-y-3 mt-0 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">General Tasks</h3>
          </div>
          {tasks.filter(t => t.list === 'master').map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}