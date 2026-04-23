import { useAuth } from '@/_core/hooks/useAuth';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { BarChart3, FileText, Users, Upload } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: newsEvents } = trpc.newsEvents.list.useQuery({ limit: 5 });
  const { data: applications } = trpc.applications.list.useQuery(
    undefined,
    { enabled: user?.role === 'admin' }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Redirect to login if not admin
  if (!user || user.role !== 'admin') {
    setLocation('/admin/login');
    return null;
  }

  const stats = [
    {
      label: 'Total Applications',
      value: applications?.length || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'News & Events',
      value: newsEvents?.length || 0,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Applications',
      value: applications?.filter((app: any) => app.status === 'pending').length || 0,
      icon: BarChart3,
      color: 'bg-yellow-500',
    },
    {
      label: 'Resources',
      value: '0',
      icon: Upload,
      color: 'bg-purple-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Admin Panel</h1>
          <p className="text-blue-100">Manage school content, applications, and resources from here.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent News & Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent News & Events</h2>
            <div className="space-y-3">
              {newsEvents && newsEvents.length > 0 ? (
                newsEvents.slice(0, 5).map((item: any) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No news or events yet</p>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent Applications</h2>
            <div className="space-y-3">
              {applications && applications.length > 0 ? (
                applications.slice(0, 5).map((app: any) => (
                  <div key={app.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-foreground text-sm">{app.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">Grade {app.grade}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No applications yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/admin/news"
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
            >
              <FileText size={24} className="text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-blue-600">Manage News</p>
            </a>
            <a
              href="/admin/applications"
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
            >
              <Users size={24} className="text-green-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-green-600">View Applications</p>
            </a>
            <a
              href="/admin/resources"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
            >
              <Upload size={24} className="text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-purple-600">Upload Resources</p>
            </a>
            <a
              href="/"
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
            >
              <BarChart3 size={24} className="text-gray-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-600">View Website</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
