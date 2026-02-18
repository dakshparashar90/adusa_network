import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { blogPosts as initialPosts } from "@/lib/mock-data";
import { Plus, ThumbsUp, MessageSquare, Share2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost = {
      id: posts.length + 1,
      title,
      author: "Alex Morgan", // Mock current user
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      excerpt: content.substring(0, 150) + "...",
      image
    };

    setPosts([newPost, ...posts]);
    setIsDialogOpen(false);
    
    // Reset form
    setTitle("");
    setContent("");
    
    toast({
      title: "Article Published",
      description: "Your blog post has been successfully shared with the community.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Community Blog</h1>
          <p className="text-muted-foreground">Share knowledge and learn from experts.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Write Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <CardDescription>
                Share your insights and experiences with the ProConnect community.
              </CardDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a catchy title..." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Technology, Career, Design"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your article content here..." 
                  className="min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-32 rounded bg-slate-100 overflow-hidden flex items-center justify-center border">
                    {image ? <img src={image} className="h-full w-full object-cover" alt="Preview" /> : <ImageIcon className="h-6 w-6 text-slate-400" />}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setImage("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400")}>
                    Use Default
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">Publish Article</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-foreground hover:bg-white">{post.id > 3 ? "New Post" : "Technology"}</Badge>
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
                  <ThumbsUp className="h-4 w-4" /> 0
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" /> 0
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
