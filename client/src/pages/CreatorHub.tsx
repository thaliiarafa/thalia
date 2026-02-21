import { motion } from "framer-motion";
import { Video, Lightbulb, Calendar as CalendarIcon, Scissors, TrendingUp, Briefcase, Camera, CheckCircle2, Plus, Sparkles, LayoutGrid, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreatorHub() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [isTikTokSyncing, setIsTikTokSyncing] = useState(false);

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

  const ideas = [
    { id: 1, title: "Morning Routine (Aesthetic)", category: "Lifestyle", status: "Editing", platform: "TikTok" },
    { id: 2, title: "How I organize my Notion", category: "Student Life", status: "Filming", platform: "YouTube" },
    { id: 3, title: "5 Skincare mistakes to avoid", category: "Beauty", status: "Idea", platform: "Instagram" },
  ];

  const editTasks = [
    { id: 1, title: "Morning Routine Vlog", status: "Editing", platform: "TikTok", deadline: "Today" },
    { id: 2, title: "Study Playlist Recommendations", status: "To Edit", platform: "Instagram", deadline: "Tomorrow" },
  ];

  const brands = [
    { id: 1, name: "Glow Recipe", status: "Negotiating", amount: "$500", platform: "TikTok" },
    { id: 2, name: "Notion", status: "Pitched", amount: "-", platform: "YouTube" },
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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 pt-12 space-y-8 pb-32"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-foreground font-semibold flex items-center gap-2">
            Creator Studio <Video className="text-primary" size={24} />
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">Plan, shoot, and grow.</p>
        </div>
        <button className="bg-primary text-primary-foreground w-10 h-10 rounded-full shadow-md shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform">
          <Plus size={20} />
        </button>
      </header>

      {/* Motivation Panel */}
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 rounded-[24px] p-5 border border-white/60 relative overflow-hidden shadow-sm">
        <Sparkles className="absolute top-3 right-4 text-primary/40 w-16 h-16 rotate-12" />
        <h3 className="font-bold text-[12px] uppercase tracking-widest text-primary mb-2">Creator Motivation</h3>
        <p className="font-serif italic text-[16px] text-foreground/90 relative z-10 leading-snug">
          "{motivationQuotes[0]}"
        </p>
      </div>

      <Tabs defaultValue="ideas" className="w-full" onValueChange={setActiveTab}>
        {/* Scrollable Tabs List */}
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

        {/* IDEA VAULT */}
        <TabsContent value="ideas" className="space-y-4 mt-4 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Idea Vault</h3>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1"><LayoutGrid size={12}/> View All</span>
          </div>
          
          <div className="space-y-3">
            {ideas.map(idea => (
              <div key={idea.id} className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(idea.status)}`}>
                    {idea.status}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{idea.platform}</span>
                </div>
                <h4 className="font-bold text-[15px] mb-1.5">{idea.title}</h4>
                <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block"></span>
                  {idea.category}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* PLAN & SHOOT */}
        <TabsContent value="planner" className="space-y-6 mt-4 outline-none">
          {/* Script Mode Card */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-white/60 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#F472B6]/10 rounded-full blur-xl -mr-8 -mt-8"></div>
             <h3 className="font-serif text-[18px] font-medium tracking-tight mb-4 relative z-10 flex items-center gap-2">
               <CalendarIcon size={18} className="text-[#F472B6]"/> Script Mode: Next Video
             </h3>
             <div className="space-y-4 relative z-10">
               <div className="bg-muted/30 rounded-xl p-3 border border-muted/50">
                 <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">🎯 Hook (0-3s)</h4>
                 <p className="text-[13px] font-medium text-foreground">"Stop doing your skincare like this if you want to clear your acne..."</p>
               </div>
               <div className="bg-muted/30 rounded-xl p-3 border border-muted/50">
                 <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">🎥 Storyline</h4>
                 <p className="text-[13px] font-medium text-foreground text-muted-foreground italic">1. Show common mistake.<br/>2. Explain why it damages barrier.<br/>3. Show correct method.</p>
               </div>
               <div className="bg-muted/30 rounded-xl p-3 border border-muted/50 flex items-center justify-between">
                 <div>
                   <h4 className="text-[11px] uppercase font-bold text-muted-foreground mb-1">🎧 Audio Track</h4>
                   <p className="text-[13px] font-medium text-foreground">"Aesthetic lo-fi beat #4"</p>
                 </div>
                 <button className="text-[11px] bg-white shadow-sm border border-border px-3 py-1 rounded-full font-bold">Use Template</button>
               </div>
             </div>
          </div>

          {/* Shoot Checklist */}
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

        {/* EDIT & TRACK */}
        <TabsContent value="edit" className="space-y-6 mt-4 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Editing Board</h3>
          </div>
          <div className="space-y-3">
             {editTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60">
                  <div>
                    <h4 className="font-bold text-[14px] mb-1">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{task.platform}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full border border-red-100">Due {task.deadline}</span>
                  </div>
                </div>
             ))}
          </div>

          <div className="pt-4">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-serif text-[20px] font-medium tracking-tight">Performance</h3>
               <button 
                 onClick={handleTikTokSync}
                 disabled={isTikTokSyncing}
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

        {/* BRANDS */}
        <TabsContent value="brands" className="space-y-4 mt-4 outline-none">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-serif text-[20px] font-medium tracking-tight">Collaborations</h3>
          </div>
          <div className="space-y-3">
             {brands.map(brand => (
                <div key={brand.id} className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                     <span className="font-serif font-bold text-[16px] text-primary">{brand.amount}</span>
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
          
          <button className="w-full mt-4 bg-muted/30 border-2 border-dashed border-muted-foreground/30 text-muted-foreground font-bold py-4 rounded-3xl flex items-center justify-center gap-2 hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-colors">
            <Plus size={18} /> Add New Brand Pitch
          </button>
        </TabsContent>

      </Tabs>
    </motion.div>
  );
}