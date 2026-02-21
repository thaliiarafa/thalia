import { motion, AnimatePresence } from "framer-motion";
import { Video, Lightbulb, Calendar as CalendarIcon, Scissors, TrendingUp, Briefcase, Camera, CheckCircle2, Plus, Sparkles, LayoutGrid, RefreshCw, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CreatorIdea, EditingTask, BrandDeal } from "@shared/schema";

export default function CreatorHub() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [isTikTokSyncing, setIsTikTokSyncing] = useState(false);
  const [showAddIdea, setShowAddIdea] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddEdit, setShowAddEdit] = useState(false);

  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaCategory, setNewIdeaCategory] = useState("Lifestyle");
  const [newIdeaPlatform, setNewIdeaPlatform] = useState("TikTok");
  const [newIdeaStatus, setNewIdeaStatus] = useState("Idea");

  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandPlatform, setNewBrandPlatform] = useState("TikTok");
  const [newBrandAmount, setNewBrandAmount] = useState("");

  const [newEditTitle, setNewEditTitle] = useState("");
  const [newEditPlatform, setNewEditPlatform] = useState("TikTok");
  const [newEditDeadline, setNewEditDeadline] = useState("");

  const { data: ideas = [] } = useQuery<CreatorIdea[]>({ queryKey: ["/api/creator-ideas"] });
  const { data: editTasks = [] } = useQuery<EditingTask[]>({ queryKey: ["/api/editing-tasks"] });
  const { data: brands = [] } = useQuery<BrandDeal[]>({ queryKey: ["/api/brand-deals"] });

  const addIdea = useMutation({
    mutationFn: async (data: any) => { const res = await apiRequest("POST", "/api/creator-ideas", data); return res.json(); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/creator-ideas"] }); setNewIdeaTitle(""); setShowAddIdea(false); },
  });

  const deleteIdea = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/creator-ideas/${id}`); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/creator-ideas"] }),
  });

  const updateIdeaStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/creator-ideas/${id}`, { status });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/creator-ideas"] }),
  });

  const addEditTask = useMutation({
    mutationFn: async (data: any) => { const res = await apiRequest("POST", "/api/editing-tasks", data); return res.json(); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/editing-tasks"] }); setNewEditTitle(""); setShowAddEdit(false); },
  });

  const deleteEditTask = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/editing-tasks/${id}`); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/editing-tasks"] }),
  });

  const addBrand = useMutation({
    mutationFn: async (data: any) => { const res = await apiRequest("POST", "/api/brand-deals", data); return res.json(); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/brand-deals"] }); setNewBrandName(""); setNewBrandAmount(""); setShowAddBrand(false); },
  });

  const deleteBrand = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/brand-deals/${id}`); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/brand-deals"] }),
  });

  const handleTikTokSync = () => {
    setIsTikTokSyncing(true);
    setTimeout(() => setIsTikTokSyncing(false), 1500);
  };

  const motivationQuotes = [
    "Your consistency will build your audience. Keep showing up.",
    "Creativity is intelligence having fun.",
    "Don't compare your behind-the-scenes to someone else's highlight reel.",
    "Every viral video started with a simple idea."
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Idea': return 'bg-gray-100 text-gray-600';
      case 'Filming': return 'bg-blue-100 text-blue-600';
      case 'Editing': return 'bg-orange-100 text-orange-600';
      case 'Posted': return 'bg-green-100 text-green-600';
      case 'To Edit': return 'bg-red-100 text-red-600';
      case 'Negotiating': return 'bg-purple-100 text-purple-600';
      case 'Pitched': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const statuses = ["Idea", "Filming", "Editing", "Posted"];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2" data-testid="text-creator-title">
            Creator Studio <Video className="text-primary" size={24} />
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">Plan, shoot, and grow.</p>
        </div>
        <button 
          onClick={() => {
            if (activeTab === "ideas") setShowAddIdea(true);
            else if (activeTab === "edit") setShowAddEdit(true);
            else if (activeTab === "brands") setShowAddBrand(true);
          }}
          data-testid="button-add-creator"
          className="bg-primary text-primary-foreground w-10 h-10 rounded-full shadow-md shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Plus size={20} />
        </button>
      </header>

      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 rounded-[24px] p-5 border border-white/60 relative overflow-hidden shadow-sm">
        <Sparkles className="absolute top-3 right-4 text-primary/40 w-16 h-16 rotate-12" />
        <h3 className="font-bold text-[12px] uppercase tracking-widest text-primary mb-2">Creator Motivation</h3>
        <p className="font-serif italic text-[16px] text-foreground/90 relative z-10 leading-snug">
          "{motivationQuotes[new Date().getDate() % motivationQuotes.length]}"
        </p>
      </div>

      <Tabs defaultValue="ideas" className="w-full" onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 p-1 min-w-max">
            <TabsTrigger value="ideas" className="rounded-xl px-4 text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-1.5">
              <Lightbulb size={14} /> Vault
            </TabsTrigger>
            <TabsTrigger value="planner" className="rounded-xl px-4 text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-1.5">
              <Camera size={14} /> Plan & Shoot
            </TabsTrigger>
            <TabsTrigger value="edit" className="rounded-xl px-4 text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-1.5">
              <Scissors size={14} /> Edit & Track
            </TabsTrigger>
            <TabsTrigger value="brands" className="rounded-xl px-4 text-[13px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm flex gap-1.5">
              <Briefcase size={14} /> Brands
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ideas" className="space-y-4 mt-4 outline-none">
          <AnimatePresence>
            {showAddIdea && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-3 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[15px]">New Idea</h3>
                  <button onClick={() => setShowAddIdea(false)} className="text-muted-foreground"><X size={18} /></button>
                </div>
                <input value={newIdeaTitle} onChange={(e) => setNewIdeaTitle(e.target.value)} placeholder="Video idea title" data-testid="input-idea-title" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <div className="flex gap-2 flex-wrap">
                  {["Lifestyle", "Student Life", "Beauty", "Tech", "Fitness"].map(c => (
                    <button key={c} onClick={() => setNewIdeaCategory(c)} className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-full ${newIdeaCategory === c ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground'}`}>{c}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {["TikTok", "YouTube", "Instagram"].map(p => (
                    <button key={p} onClick={() => setNewIdeaPlatform(p)} className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-full ${newIdeaPlatform === p ? 'bg-foreground text-white' : 'bg-muted/50 text-muted-foreground'}`}>{p}</button>
                  ))}
                </div>
                <button onClick={() => { if (newIdeaTitle.trim()) addIdea.mutate({ title: newIdeaTitle, category: newIdeaCategory, platform: newIdeaPlatform, status: newIdeaStatus }); }} disabled={!newIdeaTitle.trim()} data-testid="button-submit-idea" className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-[14px] shadow-md shadow-primary/20 disabled:opacity-50">Add Idea</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Idea Vault</h3>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1"><LayoutGrid size={12}/> {ideas.length} Ideas</span>
          </div>
          
          {ideas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm font-medium">No ideas yet. Tap + to brainstorm!</div>
          ) : (
            <div className="space-y-3">
              {ideas.map(idea => (
                <div key={idea.id} className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60 group" data-testid={`idea-card-${idea.id}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2 flex-wrap">
                      {statuses.map(s => (
                        <button key={s} onClick={() => updateIdeaStatus.mutate({ id: idea.id, status: s })} className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full transition-colors ${idea.status === s ? getStatusColor(s) : 'bg-transparent text-muted-foreground/40 hover:text-muted-foreground'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => deleteIdea.mutate(idea.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all" data-testid={`button-delete-idea-${idea.id}`}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="font-bold text-[15px] mb-1.5">{idea.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block"></span>{idea.category}</span>
                    <span className="uppercase font-bold">{idea.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="planner" className="space-y-6 mt-4 outline-none">
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F472B6]/10 rounded-full blur-xl -mr-8 -mt-8"></div>
            <h3 className="font-serif text-[18px] font-medium tracking-tight mb-4 relative z-10 flex items-center gap-2">
              <CalendarIcon size={18} className="text-[#F472B6]"/> Script Mode: Next Video
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="bg-muted/30 rounded-xl p-3 border border-muted/50">
                <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">Hook (0-3s)</h4>
                <p className="text-[13px] font-medium text-foreground">"Stop doing your skincare like this if you want to clear your acne..."</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 border border-muted/50">
                <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">Storyline</h4>
                <p className="text-[13px] font-medium text-muted-foreground italic">1. Show common mistake.<br/>2. Explain why it damages barrier.<br/>3. Show correct method.</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-3 border border-muted/50 flex items-center justify-between">
                <div>
                  <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">Audio Track</h4>
                  <p className="text-[13px] font-medium text-foreground">"Aesthetic lo-fi beat #4"</p>
                </div>
                <button className="text-[11px] bg-white shadow-sm border border-border px-3 py-1 rounded-full font-bold">Use Template</button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-[20px] font-medium tracking-tight mb-3">Shoot Checklist</h3>
            <div className="bg-white rounded-[24px] p-2 shadow-sm border border-white/60">
              {['Lighting ready (Ring light / Window)', 'Camera angle & tripod set', 'Outfit & Makeup checked', 'Props organized (Serums, cleansers)'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border-b border-muted last:border-0">
                  <button className="w-5 h-5 rounded border-2 border-muted-foreground/30 flex items-center justify-center text-primary hover:border-primary transition-colors">
                    {i === 0 && <CheckCircle2 size={14} strokeWidth={3} className="text-primary"/>}
                  </button>
                  <span className={`text-[13px] font-medium ${i === 0 ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6 mt-4 outline-none">
          <AnimatePresence>
            {showAddEdit && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-3 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[15px]">New Editing Task</h3>
                  <button onClick={() => setShowAddEdit(false)} className="text-muted-foreground"><X size={18} /></button>
                </div>
                <input value={newEditTitle} onChange={(e) => setNewEditTitle(e.target.value)} placeholder="Video title" data-testid="input-edit-title" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <div className="flex gap-2">
                  {["TikTok", "YouTube", "Instagram"].map(p => (
                    <button key={p} onClick={() => setNewEditPlatform(p)} className={`text-[10px] uppercase font-bold px-2.5 py-1.5 rounded-full ${newEditPlatform === p ? 'bg-foreground text-white' : 'bg-muted/50 text-muted-foreground'}`}>{p}</button>
                  ))}
                </div>
                <input value={newEditDeadline} onChange={(e) => setNewEditDeadline(e.target.value)} placeholder="Deadline (e.g., Today, Friday)" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button onClick={() => { if (newEditTitle.trim()) addEditTask.mutate({ title: newEditTitle, platform: newEditPlatform, deadline: newEditDeadline || undefined }); }} disabled={!newEditTitle.trim()} data-testid="button-submit-edit" className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-[14px] shadow-md shadow-primary/20 disabled:opacity-50">Add Task</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Editing Board</h3>
          </div>
          {editTasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm font-medium">No editing tasks. Tap + to add one!</div>
          ) : (
            <div className="space-y-3">
              {editTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60 group" data-testid={`edit-task-${task.id}`}>
                  <div>
                    <h4 className="font-bold text-[14px] mb-1">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{task.platform}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.deadline && (
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full border border-red-100">Due {task.deadline}</span>
                    )}
                    <button onClick={() => deleteEditTask.mutate(task.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-[20px] font-medium tracking-tight">Performance</h3>
              <button 
                onClick={handleTikTokSync}
                disabled={isTikTokSyncing}
                data-testid="button-sync-tiktok"
                className="text-[10px] font-bold text-foreground bg-white border border-border shadow-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-muted/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                {isTikTokSyncing ? <RefreshCw size={12} className="animate-spin" /> : 'Sync'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 border border-blue-100 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">Total Views</span>
                <div className="text-2xl font-serif font-semibold mt-1">124.5K</div>
                <span className="text-[11px] font-bold text-green-500 flex items-center mt-1"><TrendingUp size={10} className="mr-0.5"/> +12%</span>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 border border-pink-100 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-pink-500 tracking-wider">Followers</span>
                <div className="text-2xl font-serif font-semibold mt-1">+850</div>
                <span className="text-[11px] font-bold text-green-500 flex items-center mt-1"><TrendingUp size={10} className="mr-0.5"/> +5%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="brands" className="space-y-4 mt-4 outline-none">
          <AnimatePresence>
            {showAddBrand && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-3 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[15px]">New Brand Pitch</h3>
                  <button onClick={() => setShowAddBrand(false)} className="text-muted-foreground"><X size={18} /></button>
                </div>
                <input value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} placeholder="Brand name" data-testid="input-brand-name" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <div className="flex gap-2">
                  {["TikTok", "YouTube", "Instagram"].map(p => (
                    <button key={p} onClick={() => setNewBrandPlatform(p)} className={`text-[10px] uppercase font-bold px-2.5 py-1.5 rounded-full ${newBrandPlatform === p ? 'bg-foreground text-white' : 'bg-muted/50 text-muted-foreground'}`}>{p}</button>
                  ))}
                </div>
                <input value={newBrandAmount} onChange={(e) => setNewBrandAmount(e.target.value)} placeholder="Deal amount (e.g., $500)" className="w-full bg-muted/30 border border-muted/50 rounded-2xl px-4 py-3 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button onClick={() => { if (newBrandName.trim()) addBrand.mutate({ name: newBrandName, platform: newBrandPlatform, amount: newBrandAmount || undefined }); }} disabled={!newBrandName.trim()} data-testid="button-submit-brand" className="w-full bg-primary text-white py-3 rounded-2xl font-bold text-[14px] shadow-md shadow-primary/20 disabled:opacity-50">Add Brand</button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Collaborations</h3>
          </div>
          {brands.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm font-medium">No brand deals yet. Start pitching!</div>
          ) : (
            <div className="space-y-3">
              {brands.map(brand => (
                <div key={brand.id} className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden group" data-testid={`brand-card-${brand.id}`}>
                  <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                    <span className="font-serif font-bold text-[16px] text-primary">{brand.amount || "-"}</span>
                    <button onClick={() => deleteBrand.mutate(brand.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(brand.status)}`}>
                      {brand.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-[16px] mb-1">{brand.name}</h4>
                  <p className="text-[12px] text-muted-foreground font-medium">Platform: {brand.platform}</p>
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={() => setShowAddBrand(true)}
            data-testid="button-add-brand-bottom"
            className="w-full mt-4 bg-muted/30 border-2 border-dashed border-muted-foreground/30 text-muted-foreground font-bold py-4 rounded-3xl flex items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Plus size={18} /> Add New Brand Pitch
          </button>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
