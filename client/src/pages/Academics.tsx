import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Academics() {
  const programs = [
    {
      title: 'Grade 9-10 (Lower Secondary)',
      description: 'Foundation courses covering core subjects with emphasis on skill development and exploration of interests.',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Physical Education', 'Arts'],
    },
    {
      title: 'Grade 11-12 (Upper Secondary)',
      description: 'Advanced courses with specialization tracks preparing students for higher education.',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography'],
    },
  ];

  const curriculum = [
    {
      category: 'Core Subjects',
      items: ['Mathematics', 'English Language', 'Science (Physics, Chemistry, Biology)', 'Social Studies'],
    },
    {
      category: 'Specialized Subjects',
      items: ['Computer Science', 'Economics', 'Geography', 'History', 'Literature'],
    },
    {
      category: 'Co-curricular Activities',
      items: ['Sports & Athletics', 'Debate & Public Speaking', 'Arts & Music', 'Science Club', 'Student Leadership'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Academics</h1>
          <p className="text-xl text-blue-100">Comprehensive education programs designed for student success</p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <div key={idx} className="highlight-card">
                <h3 className="text-2xl font-bold text-foreground mb-4">{program.title}</h3>
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Core Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, sidx) => (
                      <span
                        key={sidx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <h2 className="section-header text-center mb-12">Curriculum Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curriculum.map((section, idx) => (
              <div key={idx} className="highlight-card">
                <h3 className="text-xl font-bold text-foreground mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, iidx) => (
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

      {/* Teaching Methodology */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Our Teaching Approach</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="highlight-card">
                <h4 className="text-lg font-bold text-foreground mb-2">Student-Centered Learning</h4>
                <p className="text-muted-foreground">
                  We emphasize active learning where students engage directly with content through discussions, projects, and practical applications.
                </p>
              </div>
              <div className="highlight-card">
                <h4 className="text-lg font-bold text-foreground mb-2">Critical Thinking & Problem Solving</h4>
                <p className="text-muted-foreground">
                  Our curriculum is designed to develop analytical skills and encourage students to think independently and creatively.
                </p>
              </div>
              <div className="highlight-card">
                <h4 className="text-lg font-bold text-foreground mb-2">Technology Integration</h4>
                <p className="text-muted-foreground">
                  We leverage modern technology and digital tools to enhance learning experiences and prepare students for the digital age.
                </p>
              </div>
              <div className="highlight-card">
                <h4 className="text-lg font-bold text-foreground mb-2">Personalized Support</h4>
                <p className="text-muted-foreground">
                  Teachers provide individualized attention and support to help each student reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment & Evaluation */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <h2 className="section-header text-center mb-12">Assessment & Evaluation</h2>
          <div className="max-w-3xl mx-auto highlight-card">
            <p className="text-muted-foreground mb-4">
              We employ a comprehensive assessment strategy that includes:
            </p>
            <ul className="space-y-3">
              {[
                'Continuous classroom assessments and quizzes',
                'Project-based assignments and presentations',
                'Mid-term and end-of-term examinations',
                'Standardized national assessments',
                'Feedback and progress reports to parents',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
