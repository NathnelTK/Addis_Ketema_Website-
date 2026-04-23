import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Upload, Trash2 } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';

export default function AdminResources() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    fileName: '',
    fileUrl: '',
    fileSize: 0,
    mimeType: '',
    resourceType: 'primary' as const,
    gradeLevel: '1-4',
    subject: 'Math',
    description: '',
  });

  const { data: resources, refetch } = trpc.resources.list.useQuery(
    undefined,
    { enabled: user?.role === 'admin' }
  );
  const uploadMutation = trpc.resources.upload.useMutation();
  const deleteMutation = trpc.resources.delete.useMutation();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" /></div>;
  if (!user || user.role !== 'admin') { setLocation('/admin/login'); return null; }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadMutation.mutateAsync(formData);
      toast.success('Resource uploaded successfully');
      setFormData({
        fileName: '',
        fileUrl: '',
        fileSize: 0,
        mimeType: '',
        resourceType: 'primary',
        gradeLevel: '1-4',
        subject: 'Math',
        description: '',
      });
      refetch();
    } catch (error) {
      toast.error('Failed to upload resource');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Resource deleted successfully');
        refetch();
      } catch (error) {
        toast.error('Failed to delete resource');
      }
    }
  };

  const primaryGrades = ['1-4', '5-8'];
  const secondaryGrades = ['9-10', '11-12'];
  const subjects = {
    primary: ['Math', 'English', 'Science', 'Social Studies', 'Arts', 'Physical Education'],
    secondary: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Economics'],
  };

  const currentGrades = formData.resourceType === 'primary' ? primaryGrades : secondaryGrades;
  const currentSubjects = subjects[formData.resourceType];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground">Resource Management</h1>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Upload New Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Resource Type */}
              <div>
                <label className="form-label">Resource Type *</label>
                <select
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="primary">Primary (Grades 1-8)</option>
                  <option value="secondary">Secondary (Grades 9-12)</option>
                </select>
              </div>

              {/* Grade Level */}
              <div>
                <label className="form-label">Grade Level *</label>
                <select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  className="form-input"
                >
                  {currentGrades.map((grade) => (
                    <option key={grade} value={grade}>
                      Grades {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="form-label">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                >
                  {currentSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Name */}
              <div>
                <label className="form-label">File Name *</label>
                <input
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Math Worksheet 1"
                  required
                />
              </div>
            </div>

            {/* File URL */}
            <div>
              <label className="form-label">File URL *</label>
              <input
                type="text"
                name="fileUrl"
                value={formData.fileUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://..."
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload your file to S3 or a file hosting service and paste the URL here
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Brief description of the resource"
                rows={3}
              />
            </div>

            {/* MIME Type */}
            <div>
              <label className="form-label">MIME Type</label>
              <input
                type="text"
                name="mimeType"
                value={formData.mimeType}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., application/pdf"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Upload size={20} />
              Upload Resource
            </button>
          </form>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">File Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {resources && resources.length > 0 ? (
                  resources.map((resource: any) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{resource.fileName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          resource.resourceType === 'primary' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {resource.resourceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{resource.gradeLevel}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{resource.subject}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="p-2 hover:bg-gray-100 rounded text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                      No resources uploaded yet
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
