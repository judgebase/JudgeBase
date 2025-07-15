import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";
import Home from "@/pages/home";
import Apply from "@/pages/apply";
import Host from "@/pages/host";
import FindJudges from "@/pages/find-judges";
import Blog from "@/pages/blog";

import JudgeProfile from "@/pages/judge-profile";
import Admin from "@/pages/admin";
import JudgeGuidelines from "@/pages/judge-guidelines";
import FAQ from "@/pages/faq";
import Resources from "@/pages/resources";
import Support from "@/pages/support";
import NotFound from "@/pages/not-found";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/apply" component={Apply} />
        <Route path="/host" component={Host} />
        <Route path="/find-judges" component={FindJudges} />
        <Route path="/blog" component={Blog} />

        <Route path="/judges/:slug" component={JudgeProfile} />
        <Route path="/admin" component={Admin} />
        <Route path="/judge-guidelines" component={JudgeGuidelines} />
        <Route path="/faq" component={FAQ} />
        <Route path="/resources" component={Resources} />
        <Route path="/support" component={Support} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
