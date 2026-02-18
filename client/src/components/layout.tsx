import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Search, 
  MessageSquare, 
  User, 
  LogOut,
  LayoutDashboard,
  BookOpen
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isLanding = location === "/";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl text-primary font-heading">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Network className="h-5 w-5" />
              </div>
              ProConnect
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/search">
              <a className={`hover:text-primary transition-colors flex items-center gap-1 ${location === '/search' ? 'text-primary' : ''}`}>
                <Search className="h-4 w-4" />
                Find Professionals
              </a>
            </Link>
            <Link href="/blog">
              <a className={`hover:text-primary transition-colors flex items-center gap-1 ${location === '/blog' ? 'text-primary' : ''}`}>
                <BookOpen className="h-4 w-4" />
                Blog
              </a>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isLanding ? (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
                </Link>
                <Link href="/auth">
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon" title="Dashboard">
                    <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="ghost" size="icon" title="Messages">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" size="icon" title="Profile">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="icon" title="Log Out">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-12 bg-slate-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-primary font-heading">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Network className="h-5 w-5" />
              </div>
              ProConnect
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting professionals across the globe. Build your network, share your expertise, and grow together.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/search"><a className="hover:text-primary">Find Professionals</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-primary">Articles</a></Link></li>
              <li><Link href="/auth"><a className="hover:text-primary">Sign Up</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Events</a></li>
              <li><a href="#" className="hover:text-primary">Mentorship</a></li>
              <li><a href="#" className="hover:text-primary">Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-primary">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 ProConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
