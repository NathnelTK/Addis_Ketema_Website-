import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { Calendar, Loader2 } from 'lucide-react';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'news' | 'event' | 'announcement'>('all');

  const { data: newsEvents, isLoading } = trpc.newsEvents.list.useQuery({
    limit: 50,
  });

  const filteredNews = selectedCategory === 'all'
    ? newsEvents || []
    : (newsEvents || []).filter(item => item.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'news', label: 'News' },
    { value: 'event', label: 'Events' },
    { value: 'announcement', label: 'Announcements' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">News & Events</h1>
          <p className="text-xl text-blue-100">Stay updated with the latest happenings at Addis Ketema</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container">
          <h2 className="text-lg font-bold text-foreground mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List Section */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No news or events found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((item) => (
                <div key={item.id} className="highlight-card">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Placeholder */}
                    <div className="flex-shrink-0 md:w-48">
                      <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.category === 'news' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'event' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        {item.eventDate && (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar size={16} />
                            {new Date(item.eventDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{item.content}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <button className="text-blue-600 font-semibold hover:text-blue-700">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center highlight-card">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive the latest news and event updates directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-grow"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
