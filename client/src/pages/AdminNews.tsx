import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

export default function AdminNews() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: 'news' as const,
    eventDate: '',
  });

  const { data: newsEvents, refetch } = trpc.newsEvents.list.useQuery({ limit: 100 });
  const createMutation = trpc.newsEvents.create.useMutation();
  const deleteMutation = trpc.newsEvents.delete.useMutation();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      setLocation('/admin/login');
    }
  }, [loading, setLocation, user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>;
  if (!user || user.role !== 'admin') { return null; }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        ...formData,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      });
      toast.success('News/Event created successfully');
      setFormData({ title: '', content: '', imageUrl: '', category: 'news', eventDate: '' });
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error('Failed to create news/event');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">News & Events Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add News/Event
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Create News/Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="news">News</option>
                    <option value="event">Event</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-input"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="form-label">Event Date</label>
                  <input
                    type="datetime-local"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-foreground rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {newsEvents && newsEvents.length > 0 ? (
                  newsEvents.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-foreground">{item.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.category === 'news' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'event' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Edit2 size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-gray-100 rounded"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-muted-foreground">
                      No news or events yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
