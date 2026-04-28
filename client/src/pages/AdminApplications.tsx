import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

export default function AdminApplications() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'reviewed' | 'accepted' | 'rejected'>('all');
  
  const { data: applications, refetch } = trpc.applications.list.useQuery(
    undefined,
    { enabled: user?.role === 'admin' }
  );
  const updateStatusMutation = trpc.applications.updateStatus.useMutation();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      setLocation('/admin/login');
    }
  }, [loading, setLocation, user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>;
  if (!user || user.role !== 'admin') { return null; }

  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications?.filter((app: any) => app.status === selectedStatus);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: newStatus as any,
      });
      toast.success('Status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const statusCounts = {
    all: applications?.length || 0,
    pending: applications?.filter((app: any) => app.status === 'pending').length || 0,
    reviewed: applications?.filter((app: any) => app.status === 'reviewed').length || 0,
    accepted: applications?.filter((app: any) => app.status === 'accepted').length || 0,
    rejected: applications?.filter((app: any) => app.status === 'rejected').length || 0,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground">Application Management</h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-foreground hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status as keyof typeof statusCounts]})
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApplications && filteredApplications.length > 0 ? (
                  filteredApplications.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{app.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{app.phone}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{app.grade}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="px-2 py-1 border border-border rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-muted-foreground">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Details */}
        {filteredApplications && filteredApplications.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Application Details</h2>
            <div className="space-y-4">
              {filteredApplications.slice(0, 1).map((app: any) => (
                <div key={app.id} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">{app.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-foreground">{app.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold text-foreground">{app.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="font-semibold text-foreground">{app.grade}</p>
                    </div>
                  </div>
                  {app.message && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Message</p>
                      <p className="text-foreground">{app.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
