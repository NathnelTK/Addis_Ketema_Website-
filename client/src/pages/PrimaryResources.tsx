import { useState } from 'react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from '@/lib/trpc';
import { ExternalLink, Download, Loader2 } from 'lucide-react';

export default function PrimaryResources() {
  const [selectedGrade, setSelectedGrade] = useState<string>('1-4');
  const [selectedSubject, setSelectedSubject] = useState<string>('Math');

  const { data: uploadedFiles, isLoading } = trpc.resources.list.useQuery({
    resourceType: 'primary',
    gradeLevel: selectedGrade,
    subject: selectedSubject,
  });

  const grades = ['1-4', '5-8'];
  const subjects = ['Math', 'English', 'Science', 'Social Studies', 'Arts', 'Physical Education'];

  // Ethiopian textbook resources
  const ethiopianResources = [
    {
      name: 'Ethiopian Ministry of Education Textbooks',
      url: 'https://www.moe.gov.et',
      description: 'Official government textbooks and curriculum materials',
    },
    {
      name: 'Addis Ababa Science & Technology Park',
      url: 'https://www.aatp.gov.et',
      description: 'Educational resources and digital learning materials',
    },
    {
      name: 'Ethiopian Education Network',
      url: 'https://www.eenet.org.uk',
      description: 'Open educational resources for Ethiopian schools',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/resources">
              <a className="text-green-100 hover:text-white">Resources</a>
            </Link>
            <span className="text-green-100">/</span>
            <span>Primary School</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Primary School Resources</h1>
          <p className="text-xl text-green-100">Grades 1-8 Learning Materials</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grade Filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Select Grade Level</h3>
              <div className="flex flex-wrap gap-3">
                {grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedGrade === grade
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    Grades {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Select Subject</h3>
              <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedSubject === subject
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uploaded Files Section */}
      <section className="section-padding bg-green-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">Uploaded Materials</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-green-600" size={32} />
            </div>
          ) : uploadedFiles && uploadedFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uploadedFiles.map((file: any) => (
                <div key={file.id} className="highlight-card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <h3 className="font-bold text-foreground mb-1">{file.fileName}</h3>
                      <p className="text-sm text-muted-foreground">{file.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {file.subject}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {file.fileSize ? `${(file.fileSize / 1024 / 1024).toFixed(2)} MB` : 'File'}
                    </span>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No materials available for this selection</p>
            </div>
          )}
        </div>
      </section>

      {/* External Resources */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">External Ethiopian Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ethiopianResources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="highlight-card hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-foreground flex-grow">{resource.name}</h3>
                  <ExternalLink size={20} className="text-green-600 flex-shrink-0" />
                </div>
                <p className="text-muted-foreground text-sm">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Guide */}
      <section className="section-padding bg-green-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-foreground mb-8">Subject Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, idx) => (
              <div key={idx} className="highlight-card">
                <h4 className="font-bold text-foreground mb-2">{subject}</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {subject === 'Math' && 'Arithmetic, algebra, geometry, and problem-solving skills.'}
                  {subject === 'English' && 'Language skills, reading comprehension, and writing proficiency.'}
                  {subject === 'Science' && 'Natural sciences including biology, chemistry, and physics basics.'}
                  {subject === 'Social Studies' && 'History, geography, civics, and cultural studies.'}
                  {subject === 'Arts' && 'Visual arts, music, and creative expression.'}
                  {subject === 'Physical Education' && 'Sports, fitness, and health education.'}
                </p>
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="text-green-600 font-semibold hover:text-green-700 text-sm"
                >
                  View Materials →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
