import Layout from "@/components/Layout/Layout";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Code,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);

  const skills = [
    { name: "React/Next.js", level: 95 },
    { name: "Node.js/Express", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Python/Django", level: 85 },
    { name: "React Native", level: 80 },
    { name: "AWS/Cloud Services", level: 82 },
    { name: "MongoDB/PostgreSQL", level: 87 },
    { name: "UI/UX Design", level: 75 },
  ];

  const experience = [
    {
      title: "Senior Full-Stack Developer",
      company: "Freelance",
      period: "2020 - Present",
      description:
        "Leading end-to-end development of web and mobile applications for clients worldwide.",
      achievements: [
        "Delivered 50+ successful projects across various industries",
        "Maintained 98% client satisfaction rate",
        "Specialized in scalable architecture and performance optimization",
      ],
    },
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2018 - 2020",
      description:
        "Developed enterprise-level applications and mentored junior developers.",
      achievements: [
        "Led development of core platform features",
        "Reduced application load time by 40%",
        "Implemented CI/CD pipelines and testing frameworks",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2016 - 2018",
      description:
        "Created responsive web applications and improved user experience.",
      achievements: [
        "Built 20+ responsive websites and web applications",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Optimized websites for SEO and accessibility",
      ],
    },
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
    "Certified Scrum Master (CSM)",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Stats are public, can load regardless of auth
        const [servicesRes, projectsRes, blogsRes] = await Promise.all([
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("blogs").select("id", { count: "exact", head: true }).eq("published", true),
        ]);
        setServicesCount(servicesRes.count ?? 0);
        setProjectsCount(projectsRes.count ?? 0);
        setBlogsCount(blogsRes.count ?? 0);

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, user_id, full_name, email, bio, avatar_url")
            .eq("user_id", user.id)
            .single();
          if (!error) setProfile(data);
        } else {
          // Public: show the first available profile
          const { data } = await supabase
            .from("profiles")
            .select("id, user_id, full_name, email, bio, avatar_url")
            .order("created_at", { ascending: true })
            .limit(1)
            .maybeSingle();
          if (data) setProfile(data);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {loading ? (
                  <>
                    <Skeleton className="h-10 w-72" />
                    <Skeleton className="h-6 w-96" />
                    <Skeleton className="h-16 w-full" />
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                      {profile?.full_name || "Indra Prashad Sharma"}
                    </h1>
                    <p className="text-xl text-secondary font-semibold">
                      Senior Full-Stack Developer & Technology Consultant
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {profile?.bio ||
                        "Passionate software engineer building scalable web and mobile applications. Specializing in modern JavaScript frameworks, cloud architecture, and delivering high-quality solutions that drive business growth."}
                    </p>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  {loading ? (
                    <Skeleton className="h-4 w-48" />
                  ) : (
                    <span className="text-muted-foreground">
                      {profile?.email || "email@example.com"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Available on request</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Remote</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Profile Image & Stats */}
            <div className="space-y-6">
              <div className="relative mx-auto w-64 h-64">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-3xl bg-muted/50 flex items-center justify-center overflow-hidden">
                    {loading ? (
                      <Skeleton className="w-24 h-24 rounded-full" />
                    ) : profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.full_name || "Profile"}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    ) : (
                      <div className="text-6xl font-bold text-primary">
                        {(profile?.full_name || "A").charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardContent className="p-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-7 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-primary">
                          {projectsCount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Projects
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-7 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-primary">
                          {servicesCount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Services
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                <Card className="text-center col-span-2">
                  <CardContent className="p-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-7 w-12 mx-auto mb-1" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-primary">
                          {blogsCount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Blog Posts
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Technical Skills</h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground font-medium">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{cert}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">About Me</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.bio ||
                    "I'm passionate about creating digital solutions that make a real impact. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring upcoming developers. I believe in continuous learning and staying ahead of industry trends."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-primary font-semibold">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;