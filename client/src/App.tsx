import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BottomNav from "@/components/BottomNav";

import Home from "@/pages/Home";
import Planner from "@/pages/Planner";
import Tasks from "@/pages/Tasks";
import Glow from "@/pages/Glow";
import Profile from "@/pages/Profile";
import CreatorHub from "@/pages/CreatorHub";
import Inspiration from "@/pages/Inspiration";

function Router() {
  return (
    <div className="max-w-md w-full mx-auto h-[100dvh] bg-background relative shadow-2xl overflow-hidden flex flex-col font-sans sm:rounded-[2.5rem] sm:border-8 sm:border-muted/50 sm:h-[850px]">
      {/* iOS Status Bar & Notch Simulation for desktop preview */}
      <div className="hidden sm:flex justify-between items-center px-6 pt-3 pb-1 text-[11px] font-bold z-50 absolute top-0 left-0 right-0 w-full bg-background/80 backdrop-blur-md">
        <span>9:41</span>
        <div className="w-[120px] h-[30px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 -top-1"></div>
        <div className="flex gap-1.5 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-safe relative sm:pt-10">
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/planner" component={Planner}/>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/glow" component={Glow}/>
          <Route path="/studio" component={CreatorHub}/>
          <Route path="/inspo" component={Inspiration}/>
          <Route path="/profile" component={Profile}/>
          <Route component={NotFound} />
        </Switch>
      </div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-muted/40 w-full flex items-center justify-center sm:py-8 sm:px-4">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;