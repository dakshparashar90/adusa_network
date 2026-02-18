import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Users, Globe, Briefcase } from "lucide-react";
import heroImage from "@/assets/hero-network.png";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={item} className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold text-primary bg-primary/5">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                The #1 Professional Network
              </motion.div>
              
              <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold font-heading tracking-tight leading-tight text-slate-900">
                Connect with <br/>
                <span className="text-primary">World-Class Experts</span>
              </motion.h1>
              
              <motion.p variants={item} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Find the right professionals for your needs. Collaborate, message, and grow your network in a verified community of experts.
              </motion.p>
              
              <motion.div variants={item} className="flex flex-wrap gap-4">
                <Link href="/auth">
                  <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    Browse Professionals
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={item} className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-slate-200" />
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-slate-100 flex items-center justify-center font-medium text-xs">
                    +2k
                  </div>
                </div>
                <p>Trusted by 2,000+ professionals</p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur-3xl -z-10" />
              <img 
                src={heroImage} 
                alt="Networking Illustration" 
                className="rounded-2xl shadow-2xl border bg-white/50 backdrop-blur-sm"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">Everything you need to grow</h2>
            <p className="text-muted-foreground">
              Powerful tools to help you connect, collaborate, and succeed in your professional journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Connect Instantly"
              description="Find and message professionals in real-time. Build meaningful connections that last."
            />
            <FeatureCard 
              icon={<Globe className="h-6 w-6 text-primary" />}
              title="Global Reach"
              description="Access a worldwide network of experts across various industries and domains."
            />
            <FeatureCard 
              icon={<Briefcase className="h-6 w-6 text-primary" />}
              title="Showcase Work"
              description="Create a stunning portfolio and share your achievements with the community."
            />
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Join the fastest growing professional network today.</h2>
              <ul className="space-y-4">
                {[
                  "Access to exclusive job opportunities",
                  "Mentorship from industry leaders",
                  "Premium resources and learning paths"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" size="lg">Join Now</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="10k+" label="Active Users" />
              <StatCard number="500+" label="Companies" />
              <StatCard number="50+" label="Countries" />
              <StatCard number="1M+" label="Messages Sent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="pt-6">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
      <div className="text-3xl font-bold font-heading mb-1">{number}</div>
      <div className="text-sm text-slate-300">{label}</div>
    </div>
  );
}
