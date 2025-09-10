import Layout from "@/components/Layout/Layout";
import { CheckCircle, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const Hire = () => {
  const packages = [
    {
      name: "Starter",
      price: "Nu.2,500",
      duration: "2-3 weeks",
      description: "Perfect for small businesses and startups",
      features: [
        "Responsive website (up to 5 pages)",
        "Modern UI/UX design",
        "Mobile optimization",
        "Basic SEO setup",
        "Contact form integration",
        "2 rounds of revisions",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "Nu.5,000",
      duration: "4-6 weeks",
      description: "Ideal for growing businesses",
      features: [
        "Custom web application",
        "Admin dashboard",
        "Database integration",
        "User authentication",
        "Payment integration",
        "API development",
        "3 rounds of revisions",
        "30 days support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Nu.10,000+",
      duration: "8-12 weeks",
      description: "For complex, large-scale projects",
      features: [
        "Full-stack application",
        "Microservices architecture",
        "Cloud deployment (AWS/GCP)",
        "Advanced security features",
        "Performance optimization",
        "Testing & documentation",
        "Team collaboration tools",
        "90 days support & maintenance",
      ],
      popular: false,
    },
  ];

  const workProcess = [
    {
      step: "1",
      title: "Discovery & Planning",
      description:
        "We discuss your requirements, goals, and create a detailed project plan.",
    },
    {
      step: "2",
      title: "Design & Prototyping",
      description:
        "Create wireframes, mockups, and interactive prototypes for your approval.",
    },
    {
      step: "3",
      title: "Development",
      description:
        "Build your application using modern technologies and best practices.",
    },
    {
      step: "4",
      title: "Testing & Launch",
      description: "Thorough testing, deployment, and post-launch support.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ready to transform your ideas into reality? Choose from our flexible
            packages or let's discuss a custom solution for your unique needs.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Choose Your Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative shadow-card hover:shadow-elegant transition-all duration-300 ${pkg.popular ? "ring-2 ring-primary transform scale-105" : ""
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="hero-gradient px-4 py-1 rounded-full text-white text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {pkg.price}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                  </div>
                  <CardDescription className="text-center">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.popular ? "hero" : "outline"}
                    className="w-full"
                  >
                    <Link to="/hire-form">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            How We Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-white font-bold text-lg">
                    {process.step}
                  </div>
                  <CardTitle className="text-lg">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+975 77123456"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Project Budget</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under Nu.5,000</SelectItem>
                        <SelectItem value="5k-10k">Nu.5,000 - Nu.10,000</SelectItem>
                        <SelectItem value="10k-25k">
                          Nu.10,000 - Nu,25,000
                        </SelectItem>
                        <SelectItem value="25k-plus">Nu.25,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What type of project do you need?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">
                        Website Development
                      </SelectItem>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="mobile-app">
                        Mobile Application
                      </SelectItem>
                      <SelectItem value="ecommerce">
                        E-commerce Platform
                      </SelectItem>
                      <SelectItem value="consulting">
                        Technical Consulting
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="When do you need this completed?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-plus-months">3+ months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    className="min-h-32"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Project Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "How do you handle payments?",
                answer:
                  "I typically work with a 50% upfront payment to begin the project, with the remaining 50% due upon completion. For larger projects, we can discuss milestone-based payments.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes! All packages include post-launch support. The duration varies by package, and I also offer ongoing maintenance contracts for long-term partnerships.",
              },
              {
                question: "Can you work with my existing team?",
                answer:
                  "Absolutely! I frequently collaborate with in-house teams, agencies, and other developers. I'm experienced in both leading projects and integrating into existing workflows.",
              },
              {
                question:
                  "What if I need changes after the project is complete?",
                answer:
                  "All packages include revision rounds during development. Post-launch changes can be handled through our support period or as separate enhancement projects.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Hire;
