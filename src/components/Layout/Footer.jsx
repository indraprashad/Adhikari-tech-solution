import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, MessageCircle, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="hero-gradient w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                Adhikari Tech
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional freelancer providing cutting-edge technology solutions
              for businesses worldwide. Specializing in web development, mobile apps,
              and digital transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "About", path: "/profile" },
                { name: "Blog", path: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Services</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "Consulting",
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  indraprashadsharma4@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  +975 77459620
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  Remote
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {[
                { icon: Github, href: "https://github.com/indraprashad" },
                { icon: Facebook, href: "https://www.facebook.com/indra.sharma.79827" },
                { icon: MessageCircle, href: "https://wa.me/97577459620" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth flex items-center justify-center"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 adhikaritechsolution. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-smooth text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-smooth text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;