import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Briefcase,
  Bell,
  Search
} from "lucide-react";
import { professionals } from "@/lib/mock-data";

const data = [
  { name: "Mon", views: 12 },
  { name: "Tue", views: 18 },
  { name: "Wed", views: 24 },
  { name: "Thu", views: 16 },
  { name: "Fri", views: 32 },
  { name: "Sat", views: 10 },
  { name: "Sun", views: 8 },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex. Here's what's happening with your network.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Profile Views" 
              value="1,234" 
              change="+12%" 
              icon={<Eye className="h-4 w-4 text-primary" />} 
            />
            <StatCard 
              title="Connections" 
              value="543" 
              change="+5%" 
              icon={<Users className="h-4 w-4 text-primary" />} 
            />
            <StatCard 
              title="Messages" 
              value="12" 
              change="+2" 
              icon={<MessageSquare className="h-4 w-4 text-primary" />} 
            />
          </div>

          {/* Chart Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      cursor={{ fill: 'hsl(var(--muted))' }}
                    />
                    <Bar 
                      dataKey="views" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: "Sarah Jenkins", action: "viewed your profile", time: "2 hours ago" },
                  { user: "David Chen", action: "endorsed your skills", time: "5 hours ago" },
                  { user: "TechFlow Inc.", action: "posted a new job matching your skills", time: "1 day ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        <span className="font-bold">{item.user}</span> {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Strength</span>
                  <span className="font-bold text-primary">85%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full" />
                </div>
              </div>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {professionals.slice(0, 3).map((pro) => (
                <div key={pro.id} className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={pro.image} />
                    <AvatarFallback>{pro.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{pro.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{pro.title}</p>
                    <Button size="sm" variant="secondary" className="mt-2 h-7 w-full text-xs">Connect</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">{value}</div>
          <span className="text-xs text-green-500 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
