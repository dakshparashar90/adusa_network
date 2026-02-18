import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock-data";
import { Plus, ThumbsUp, MessageSquare, Share2 } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Community Blog</h1>
          <p className="text-muted-foreground">Share knowledge and learn from experts.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Write Article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-foreground hover:bg-white">Technology</Badge>
            </div>
            
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">{post.author} • {post.date}</span>
              </div>
              <CardTitle className="line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {post.excerpt}
              </p>
            </CardContent>
            
            <CardFooter className="border-t pt-4 text-muted-foreground text-sm flex justify-between">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <ThumbsUp className="h-4 w-4" /> 124
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" /> 18
                </button>
              </div>
              <button className="hover:text-primary transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
