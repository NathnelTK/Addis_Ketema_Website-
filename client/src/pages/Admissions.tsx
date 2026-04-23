import { useState } from 'react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';

export default function Admissions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitApplication = trpc.applications.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.grade) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication.mutateAsync(formData);
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', grade: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const requirements = [
    {
      title: 'Academic Requirements',
      items: [
        'Completion of Grade 8 or equivalent',
        'Minimum GPA of 3.0 in previous school',
        'Satisfactory performance in entrance assessment',
      ],
    },
    {
      title: 'Documentation',
      items: [
        'Birth certificate or national ID',
        'Previous school transcripts',
        'Medical examination report',
        'Character reference letter',
      ],
    },
    {
      title: 'Application Process',
      items: [
        'Complete online application form',
        'Submit required documents',
        'Attend entrance examination',
        'Participate in interview (if selected)',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-xl text-blue-100">Join our community of learners and leaders</p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Admission Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, idx) => (
              <div key={idx} className="highlight-card">
                <h3 className="text-lg font-bold text-foreground mb-4">{req.title}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-header text-center mb-12">Application Form</h2>
            <div className="highlight-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className="form-label">Applying for Grade *</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a grade</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Tell us about yourself (optional)"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Important Dates</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {[
                { label: 'Application Deadline', date: 'May 31, 2026' },
                { label: 'Entrance Examination', date: 'June 15, 2026' },
                { label: 'Interview Period', date: 'June 20-25, 2026' },
                { label: 'Admission Results', date: 'July 5, 2026' },
                { label: 'School Year Begins', date: 'August 1, 2026' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-border rounded-lg">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="text-blue-600 font-bold">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for More Info */}
      <section className="section-padding bg-blue-50">
        <div className="container text-center">
          <h2 className="section-header mb-6">Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact our admissions office for more information
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              📞 <span className="font-semibold">+251 11 123 4567</span>
            </p>
            <p className="text-muted-foreground">
              ✉️ <span className="font-semibold">admissions@addisketema.edu.et</span>
            </p>
            <p className="text-muted-foreground">
              📍 Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
