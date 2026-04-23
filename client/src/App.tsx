import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import PrimaryResources from "./pages/PrimaryResources";
import SecondaryResources from "./pages/SecondaryResources";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminApplications from "./pages/AdminApplications";
import AdminResources from "./pages/AdminResources";
import AdminLogin from "./pages/AdminLogin";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/academics"} component={Academics} />
      <Route path={"/admissions"} component={Admissions} />
      <Route path={"/news"} component={News} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/resources/primary"} component={PrimaryResources} />
      <Route path={"/resources/secondary"} component={SecondaryResources} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin/news"} component={AdminNews} />
      <Route path={"/admin/applications"} component={AdminApplications} />
      <Route path={"/admin/resources"} component={AdminResources} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
