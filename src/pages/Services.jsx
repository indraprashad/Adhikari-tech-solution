import Layout from "@/components/Layout/Layout";
import { Code, Smartphone, Palette, Zap, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  Code,
  Smartphone,
  Palette,
  Zap,
  Globe,
  Shield,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("services")
          .select("id, title, description, features, price, icon")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error("Failed to load services", error);
        toast({
          variant: "destructive",
          title: "Failed to load services",
          description: "Could not fetch services from the server.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [toast]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Development Services
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From concept to deployment, I provide comprehensive technology
            solutions that drive your business forward with cutting-edge
            development practices.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/hire-form">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="shadow-card">
                  <CardHeader className="space-y-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || Code;
                return (
                  <Card
                    key={service.id}
                    className="shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                  >
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-secondary font-semibold mt-2">
                          {service.price}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground">{service.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Includes:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span className="text-sm text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild variant="outline" className="w-full">
                        <Link to="/hire-form">Request Quote</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss your requirements and create a custom solution that
            exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/hire-form">Get Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;