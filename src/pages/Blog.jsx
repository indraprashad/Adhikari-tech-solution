import Layout from "@/components/Layout/Layout";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blogs")
          .select("id, title, excerpt, content, image, slug, published, created_at")
          .eq("published", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to load blog posts", error);
        toast({
          variant: "destructive",
          title: "Failed to load blog posts",
          description: "Could not fetch blog posts from the server.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [toast]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  const categories = ["All"]; // Placeholder; add categories if your schema supports it

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tech{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Insights & News
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated with the latest trends, tutorials, and insights in web
            development, mobile applications, and emerging technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured Article</h2>
          {loading ? (
            <Card className="overflow-hidden shadow-elegant">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-muted/50" />
                <div className="p-8 space-y-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-40" />
                </div>
              </div>
            </Card>
          ) : featuredPost ? (
            <Card className="overflow-hidden shadow-elegant">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-muted/50">
                  {featuredPost.image && (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <Badge variant="secondary">Featured</Badge>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {featuredPost.excerpt || featuredPost.content.slice(0, 200) + "..."}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Adhikari Tech
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      5 min read
                    </div>
                  </div>

                  <Button asChild variant="hero">
                    <Link to={`/blog/${featuredPost.slug}`} className="flex items-center gap-2">
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="overflow-hidden shadow-elegant">
              <CardContent className="p-8">No posts found.</CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Recent Articles</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden shadow-card">
                  <div className="aspect-video bg-muted/50" />
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video bg-muted/50">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <CardHeader className="space-y-3">
                    <Badge variant="outline" className="w-fit">
                      Article
                    </Badge>
                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt || post.content.slice(0, 150) + "..."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        4 min read
                      </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter and get the latest articles and tech
            insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="hero" className="px-8">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;