import { useEffect, useRef } from "react";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroSectionContainer from "@/components/ui/hero-section";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP animation will be added here after user connects Supabase
    // For now using CSS animations
  }, []);

  const stats = [
    { icon: Star, label: "Years Experience", value: "2+" },
    { icon: Users, label: "Happy Clients", value: "6+" },
    { icon: Award, label: "Projects Completed", value: "10+" },
  ];

  return (
    <HeroSectionContainer variant="gradient" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={heroRef} className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Digital Vision
                </span>{" "}
                Into Reality
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Professional freelancer specializing in cutting-edge web
                development, mobile applications, and digital solutions. Let's
                build something extraordinary together.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg" className="text-lg px-8">
                <Link to="/hire" className="flex items-center gap-2">
                  Hire Me Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                <Link to="/projects">View My Work</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center space-y-2 animate-slide-up"
                >
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-float">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Animated Background */}
              <div className="absolute inset-0 hero-gradient rounded-3xl transform rotate-6 animate-pulse opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl transform -rotate-6 animate-pulse delay-1000"></div>

              {/* Main Content Card */}
              <div className="relative card-gradient rounded-3xl p-8 shadow-elegant border border-border/50">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="hero-gradient w-16 h-16 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">A</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Available for
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        New Projects
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      Ready to start your project?
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Custom Web Applications",
                        "Mobile App Development",
                        "UI/UX Design & Consulting",
                      ].map((service, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-muted-foreground text-sm">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="gradient" className="w-full">
                    <Link to="/services">
                      Explore Services
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroSectionContainer>
  );
};

export default HeroSection;
