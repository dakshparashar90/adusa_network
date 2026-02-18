import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Link as LinkIcon, Calendar, Download } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header / Cover */}
      <div className="relative mb-20">
        <div className="h-64 bg-gradient-to-r from-primary/80 to-purple-600/80 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        </div>
        
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="h-32 w-32 rounded-full border-4 border-background bg-slate-200 shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mb-4 space-y-1">
            <h1 className="text-3xl font-bold font-heading text-foreground">Alex Morgan</h1>
            <p className="text-lg font-medium text-muted-foreground">Senior Full Stack Engineer</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Joined March 2021</span>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-12 right-8 flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Resume
          </Button>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold font-heading mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              I am a passionate software engineer with over 8 years of experience building scalable web applications. 
              I specialize in React, Node.js, and cloud architecture. I love solving complex problems and building 
              products that make a difference. When I'm not coding, you can find me hiking or photography.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold font-heading mb-4">Experience</h2>
            <div className="space-y-6">
              <ExperienceItem 
                role="Senior Frontend Engineer"
                company="TechCorp Inc."
                date="2021 - Present"
                description="Leading the frontend team, migrating legacy codebase to Next.js, and implementing a new design system."
              />
              <ExperienceItem 
                role="Software Developer"
                company="StartUp Studio"
                date="2018 - 2021"
                description="Developed multiple MVPs for early-stage startups using React and Firebase."
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold font-heading mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PortfolioItem 
                title="E-commerce Platform"
                description="A full-featured online store with Stripe integration."
                image="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400"
              />
              <PortfolioItem 
                title="Task Management App"
                description="Real-time collaboration tool for teams."
                image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400"
              />
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "PostgreSQL", "AWS", "Docker"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Languages</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>English</span>
                  <span className="text-muted-foreground">Native</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Spanish</span>
                  <span className="text-muted-foreground">Professional</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Social</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <LinkIcon className="h-4 w-4" /> github.com/alexmorgan
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <LinkIcon className="h-4 w-4" /> linkedin.com/in/alexmorgan
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <LinkIcon className="h-4 w-4" /> twitter.com/alexmorgan
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ role, company, date, description }: { role: string, company: string, date: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
      <div>
        <h3 className="font-bold">{role}</h3>
        <p className="text-sm text-primary mb-1">{company}</p>
        <p className="text-xs text-muted-foreground mb-2">{date}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function PortfolioItem({ title, description, image }: { title: string, description: string, image: string }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="h-32 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <CardContent className="pt-4">
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
