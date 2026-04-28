import { useState } from 'react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We will respond soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+251 11 123 4567', '+251 11 123 4568'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@addisketema.edu.et', 'admissions@addisketema.edu.et'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Addis Ababa, Ethiopia', 'Near Meskel Square'],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Get in touch with Addis Ketema Secondary School</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div key={idx} className="highlight-card text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, didx) => (
                      <p key={didx} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
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
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your phone number"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What is this about?"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* OpenStreetMap Embed */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Location</h2>
              <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                <iframe
                  title="Addis Ketema School location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=38.7300%2C8.9700%2C38.7800%2C9.0200&layer=mapnik&marker=8.9950%2C38.7550"
                  className="w-full h-96"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.openstreetmap.org/?mlat=8.9950&mlon=38.7550#map=15/8.9950/38.7550"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <MapPin size={16} />
                Open larger map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'What is the best time to contact the school?',
                a: 'You can reach us during office hours: Monday-Friday 8:00 AM - 5:00 PM, Saturday 9:00 AM - 1:00 PM. For urgent matters, call our emergency line.',
              },
              {
                q: 'How long does it take to get a response?',
                a: 'We typically respond to inquiries within 24-48 business hours. For admissions questions, responses are prioritized.',
              },
              {
                q: 'Can I visit the school campus?',
                a: 'Yes! We welcome campus visits. Please contact our admissions office to schedule a tour.',
              },
              {
                q: 'What documents do I need for admission?',
                a: 'Please refer to our Admissions page for a complete list of required documents.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="highlight-card">
                <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
