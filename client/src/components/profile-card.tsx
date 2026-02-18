import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, MessageSquare, UserPlus } from "lucide-react";

interface Professional {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  image: string;
  bio: string;
}

export function ProfileCard({ professional }: { professional: Professional }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-primary/10 to-blue-200/20" />
      </CardHeader>
      <CardContent className="pt-0 relative px-6">
        <div className="absolute -top-12">
          <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src={professional.image} alt={professional.name} />
            <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="pt-14 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg font-heading">{professional.name}</h3>
              <p className="text-sm text-primary font-medium">{professional.title}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{professional.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{professional.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {professional.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 h-16 content-start">
            {professional.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                {skill}
              </Badge>
            ))}
            {professional.skills.length > 3 && (
              <Badge variant="secondary" className="font-normal text-xs bg-slate-100 text-slate-700">
                +{professional.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
        <Button className="flex-1 gap-2" size="sm">
          <UserPlus className="h-4 w-4" />
          Connect
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
