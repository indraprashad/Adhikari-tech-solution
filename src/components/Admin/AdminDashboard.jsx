import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { BlogsManager } from './BlogsManager';
import { HireRequestsManager } from './HireRequestsManager';
import { ProfileManager } from './ProfileManager';
import { LogOut, Shield, Users, Briefcase, FileText, Mail, User, LayoutDashboard } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [statsLoading, setStatsLoading] = useState(true);
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [pendingHireCount, setPendingHireCount] = useState(0);
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'services', label: 'Services', icon: Briefcase },
    { key: 'projects', label: 'Projects', icon: FileText },
    { key: 'blogs', label: 'Blogs', icon: Users },
    { key: 'hire-requests', label: 'Hire Requests', icon: Mail },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const [servicesRes, projectsRes, blogsRes, pendingHireRes] = await Promise.all([
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('blogs').select('id', { count: 'exact', head: true }),
          supabase.from('hire_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        ]);

        if (servicesRes.error || projectsRes.error || blogsRes.error || pendingHireRes.error) {
          throw servicesRes.error || projectsRes.error || blogsRes.error || pendingHireRes.error;
        }

        setServicesCount(servicesRes.count || 0);
        setProjectsCount(projectsRes.count || 0);
        setBlogsCount(blogsRes.count || 0);
        setPendingHireCount(pendingHireRes.count || 0);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load stats',
          description: 'Could not fetch latest metrics from the server.',
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  const StatCard = ({ title, icon: Icon, value, subtitle }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {statsLoading ? (
          <>
            <Skeleton className="h-7 w-16 mb-2" />
            <Skeleton className="h-4 w-36" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <Sidebar className="bg-muted/30">
        <SidebarHeader className="pt-4 pb-2">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Admin</div>
              <div className="text-base font-semibold">Dashboard</div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="gap-1">
          <nav className="px-2 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={cn(
                    'w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'hover:bg-muted text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </SidebarContent>
        <SidebarFooter className="pb-3">
          <SidebarSeparator />
          <div className="px-2">
            <Button onClick={handleSignOut} variant="outline" className="w-full justify-start">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold tracking-tight">Admin Dashboard</h1>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Keep TabsList hidden; navigation handled by sidebar */}
            <TabsList className="hidden">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="hire-requests">Hire Requests</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Services" icon={Briefcase} value={servicesCount} subtitle="Active services offered" />
                <StatCard title="Projects" icon={FileText} value={projectsCount} subtitle="Portfolio projects" />
                <StatCard title="Blog Posts" icon={FileText} value={blogsCount} subtitle="Published articles" />
                <StatCard title="Hire Requests" icon={Mail} value={pendingHireCount} subtitle="Pending requests" />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Manage your website content and client requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button onClick={() => setActiveTab('services')} variant="outline" className="h-auto p-4">
                    <div className="text-center">
                      <Briefcase className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Manage Services</div>
                      <div className="text-sm text-muted-foreground">Add or edit services</div>
                    </div>
                  </Button>

                  <Button onClick={() => setActiveTab('projects')} variant="outline" className="h-auto p-4">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Manage Projects</div>
                      <div className="text-sm text-muted-foreground">Update portfolio</div>
                    </div>
                  </Button>

                  <Button onClick={() => setActiveTab('hire-requests')} variant="outline" className="h-auto p-4">
                    <div className="text-center">
                      <Mail className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">View Requests</div>
                      <div className="text-sm text-muted-foreground">Check hire requests</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <ServicesManager />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsManager />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogsManager />
            </TabsContent>

            <TabsContent value="hire-requests">
              <HireRequestsManager />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileManager />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};