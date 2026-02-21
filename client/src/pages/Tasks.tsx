import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, MoreHorizontal, X, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Task } from "@shared/schema";

export default function Tasks() {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("personal");
  const [newPriority, setNewPriority] = useState("medium");
  const [activeList, setActiveList] = useState("daily");

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const addTask = useMutation({
    mutationFn: async (task: { title: string; category: string; priority: string; list: string }) => {
      const res = await apiRequest("POST", "/api/tasks", task);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setNewTitle("");
      setShowAdd(false);
    },
  });

  const toggleTask = useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const res = await apiRequest("PATCH", `/api/tasks/${id}`, { done });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tasks"] }),
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/tasks/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/tasks"] }),
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const TaskItem = ({ task }: { task: Task }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group flex items-center gap-4 bg-white p-4 rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/60 transition-all ${task.done ? 'opacity-60' : ''}`}
      data-testid={`task-item-${task.id}`}
    >
      <button 
        onClick={() => toggleTask.mutate({ id: task.id, done: !task.done })}
        data-testid={`button-toggle-${task.id}`}
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
      
      <div className="relative">
        <button 
          onClick={() => setMenuOpen(menuOpen === task.id ? null : task.id)}
          className="w-8 h-8 rounded-full text-muted-foreground flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>
        {menuOpen === task.id && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-2xl border border-border p-1 z-50 min-w-[120px]">
            <button 
              onClick={() => { deleteTask.mutate(task.id); setMenuOpen(null); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-50 rounded-xl"
              data-testid={`button-delete-${task.id}`}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTask.mutate({ title: newTitle, category: newCategory, priority: newPriority, list: activeList });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-foreground font-semibold" data-testid="text-tasks-title">To-Do List</h1>
        <button 
          onClick={() => setShowAdd(true)}
          data-testid="button-add-task"
          className="bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
        >
          <Plus size={24} />
        </button>
      </header>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-4 overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[15px]">New Task</h3>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground"><X size={18} /></button>
            </div>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done?"
              data-testid="input-task-title"
              className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div className="flex gap-2 flex-wrap">
              {["personal", "study", "errands", "health"].map(c => (
                <button key={c} onClick={() => setNewCategory(c)} className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full transition-colors ${newCategory === c ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["high", "medium", "low"].map(p => (
                <button key={p} onClick={() => setNewPriority(p)} className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border transition-colors ${newPriority === p ? getPriorityColor(p) : 'bg-muted/30 text-muted-foreground border-transparent'}`}>
                  {p}
                </button>
              ))}
            </div>
            <button 
              onClick={handleAdd}
              disabled={!newTitle.trim() || addTask.isPending}
              data-testid="button-submit-task"
              className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-[14px] shadow-md shadow-primary/20 disabled:opacity-50"
            >
              {addTask.isPending ? "Adding..." : "Add Task"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveList}>
        <TabsList className="grid w-full grid-cols-2 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 mb-6 h-12">
          <TabsTrigger value="daily" className="rounded-xl text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Today</TabsTrigger>
          <TabsTrigger value="master" className="rounded-xl text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Master List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6 mt-0 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">Tasks for Today</h3>
            <span className="text-[12px] font-bold text-primary" data-testid="text-daily-progress">
              {tasks.filter(t => t.list === 'daily' && t.done).length} / {tasks.filter(t => t.list === 'daily').length} Done
            </span>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground text-sm">Loading tasks...</div>
          ) : tasks.filter(t => t.list === 'daily').length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm font-medium">No tasks yet. Tap + to add one!</div>
          ) : (
            <>
              <div className="space-y-3">
                <AnimatePresence>
                  {tasks.filter(t => t.list === 'daily' && !t.done).map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </AnimatePresence>
              </div>
              {tasks.filter(t => t.list === 'daily' && t.done).length > 0 && (
                <div className="pt-4 space-y-3">
                  <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px] mb-2">Completed</h3>
                  <AnimatePresence>
                    {tasks.filter(t => t.list === 'daily' && t.done).map(task => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="master" className="space-y-3 mt-0 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-[11px]">General Tasks</h3>
          </div>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground text-sm">Loading tasks...</div>
          ) : tasks.filter(t => t.list === 'master').length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm font-medium">No master tasks yet. Tap + to add one!</div>
          ) : (
            <AnimatePresence>
              {tasks.filter(t => t.list === 'master').map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
