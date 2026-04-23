import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookOpen, Users } from 'lucide-react';

export default function Resources() {
  const resourceSections = [
    {
      id: 'primary',
      title: 'Primary School Resources',
      subtitle: 'Grades 1-8',
      description: 'Comprehensive learning materials for primary education including textbooks, worksheets, and study guides.',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      link: '/resources/primary',
    },
    {
      id: 'secondary',
      title: 'Secondary School Resources',
      subtitle: 'Grades 9-12',
      description: 'Advanced study materials including subject-specific textbooks, past papers, and preparation guides.',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      link: '/resources/secondary',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-blue-100">Access study materials and educational resources for all grades</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-header">Your Learning Hub</h2>
            <p className="section-subtitle">
              We provide a comprehensive collection of educational resources to support student learning. Browse by grade level and subject to find the materials you need.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Sections */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.id} href={section.link}>
                  <a className="highlight-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{section.title}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{section.subtitle}</p>
                    <p className="text-muted-foreground mb-6">{section.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      Explore Resources →
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">What You'll Find Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Textbooks & Study Guides',
                description: 'Comprehensive textbooks and study guides aligned with the national curriculum.',
              },
              {
                title: 'Practice Materials',
                description: 'Worksheets, exercises, and practice problems to reinforce learning.',
              },
              {
                title: 'External Resources',
                description: 'Links to trusted Ethiopian educational platforms and open-source materials.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="highlight-card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <h2 className="section-header text-center mb-12">How to Use This Resource Hub</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                step: '1',
                title: 'Select Your Grade Level',
                description: 'Choose between Primary (Grades 1-8) or Secondary (Grades 9-12) resources.',
              },
              {
                step: '2',
                title: 'Browse by Subject',
                description: 'Find resources organized by subject area such as Mathematics, Science, English, etc.',
              },
              {
                step: '3',
                title: 'Access Materials',
                description: 'Download uploaded files or access external Ethiopian textbook platforms.',
              },
              {
                step: '4',
                title: 'Learn and Practice',
                description: 'Use the materials to enhance your learning and prepare for exams.',
              },
            ].map((item, idx) => (
              <div key={idx} className="highlight-card">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
