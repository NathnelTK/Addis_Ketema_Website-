import { Link } from 'wouter';
import { BookOpen, Users, Trophy, ArrowRight, GraduationCap, Globe, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const { data: newsEvents } = trpc.newsEvents.list.useQuery({ limit: 3 });

  const highlights = [
    {
      icon: BookOpen,
      title: 'Quality Academics',
      description: 'Comprehensive curriculum designed to develop critical thinking and academic excellence.',
    },
    {
      icon: Users,
      title: 'Dedicated Faculty',
      description: 'Experienced educators committed to student success and personal development.',
    },
    {
      icon: Trophy,
      title: 'Achievements',
      description: 'Consistent excellence in national exams and international competitions.',
    },
  ];

  const stats = [
    { value: '2,500+', label: 'Students Enrolled' },
    { value: '120+', label: 'Qualified Teachers' },
    { value: '95%', label: 'Pass Rate' },
    { value: '30+', label: 'Years of Excellence' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative container text-center text-white z-10">
          <div className="flex justify-center mb-6">
            <img src="/logo.svg" alt="School Logo" className="w-24 h-24 drop-shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Addis Ketema
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-200 mb-6">
            General Secondary School
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Empowering students with quality education and developing future leaders for Ethiopia and the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <a className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-2">
                Apply Now <ArrowRight size={20} />
              </a>
            </Link>
            <Link href="/about">
              <a className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                Learn More <ArrowRight size={20} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-header">About Our School</h2>
              <p className="text-muted-foreground mb-4">
                Addis Ketema General Secondary School is a leading educational institution in Addis Ababa, Ethiopia, dedicated to providing world-class education to students from diverse backgrounds.
              </p>
              <p className="text-muted-foreground mb-6">
                Our mission is to nurture intellectual curiosity, foster character development, and prepare students for success in higher education and beyond.
              </p>
              <Link href="/about">
                <a className="btn-primary inline-flex items-center gap-2">
                  Our Story <ArrowRight size={18} />
                </a>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                alt="Students at school"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <h2 className="section-header text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div key={idx} className="highlight-card text-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl overflow-hidden shadow-md group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80"
                  alt="Grades 9-10"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/50 flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Grades 9–10</h3>
                </div>
              </div>
              <div className="p-5 bg-white">
                <p className="text-muted-foreground text-sm">Foundation secondary education with core subjects and broad curriculum.</p>
                <Link href="/academics"><a className="text-blue-600 font-semibold text-sm mt-3 inline-block hover:text-blue-700">Learn More →</a></Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                  alt="Grades 11-12"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/50 flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Grades 11–12</h3>
                </div>
              </div>
              <div className="p-5 bg-white">
                <p className="text-muted-foreground text-sm">Advanced studies preparing students for university entrance exams.</p>
                <Link href="/academics"><a className="text-blue-600 font-semibold text-sm mt-3 inline-block hover:text-blue-700">Learn More →</a></Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80"
                  alt="Resources"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/50 flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">Study Resources</h3>
                </div>
              </div>
              <div className="p-5 bg-white">
                <p className="text-muted-foreground text-sm">Access study materials, past papers, and educational resources.</p>
                <Link href="/resources"><a className="text-blue-600 font-semibold text-sm mt-3 inline-block hover:text-blue-700">Browse Resources →</a></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards an excellent education. Apply now and become part of our vibrant community.
          </p>
          <Link href="/admissions">
            <a className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Start Your Application
            </a>
          </Link>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Latest News & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsEvents && newsEvents.length > 0 ? (
              newsEvents.map((item: any) => (
                <div key={item.id} className="highlight-card">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg mb-4 overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap size={48} className="text-blue-600 opacity-50" />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.category === 'news' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'event' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>{item.category}</span>
                  <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.content}</p>
                  <Link href="/news">
                    <a className="text-blue-600 font-semibold hover:text-blue-700">Read More →</a>
                  </Link>
                </div>
              ))
            ) : (
              [1, 2, 3].map((idx) => (
                <div key={idx} className="highlight-card">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg mb-4 flex items-center justify-center">
                    <GraduationCap size={48} className="text-blue-500 opacity-50" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">School News & Updates</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stay updated with the latest happenings at Addis Ketema Secondary School.
                  </p>
                  <Link href="/news">
                    <a className="text-blue-600 font-semibold hover:text-blue-700">Read More →</a>
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/news">
              <a className="btn-secondary">View All News & Events</a>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
