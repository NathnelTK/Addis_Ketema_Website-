import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100">Learn about our school's history, mission, and vision</p>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-header">Our History</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Addis Ketema Secondary School was founded in 1985 with a vision to provide quality secondary education to students in Addis Ababa. Over the past decades, we have grown from a small institution to one of the leading secondary schools in Ethiopia, serving hundreds of students annually.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our journey has been marked by consistent excellence in academics, development of state-of-the-art facilities, and a commitment to holistic student development. We take pride in our alumni who have gone on to pursue successful careers in various fields both nationally and internationally.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, Addis Ketema Secondary School stands as a beacon of educational excellence, combining traditional values with modern pedagogical approaches to prepare students for the challenges of the 21st century.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="highlight-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a comprehensive, inclusive, and high-quality education that develops intellectually curious, ethically responsible, and socially conscious citizens capable of contributing meaningfully to society. We are committed to fostering an environment where every student can discover their potential and develop the skills necessary for success in higher education and beyond.
              </p>
            </div>

            {/* Vision */}
            <div className="highlight-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a leading educational institution recognized for academic excellence, innovative teaching practices, and the development of well-rounded individuals who are prepared to lead and serve their communities. We envision a school where diversity is celebrated, critical thinking is encouraged, and every student has the opportunity to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="section-header text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Excellence', desc: 'Striving for the highest standards in all we do' },
              { title: 'Integrity', desc: 'Acting with honesty and strong moral principles' },
              { title: 'Inclusivity', desc: 'Welcoming and supporting all students' },
              { title: 'Innovation', desc: 'Embracing new ideas and progressive methods' },
            ].map((value, idx) => (
              <div key={idx} className="highlight-card text-center">
                <h4 className="text-lg font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-header text-center mb-8">Principal's Message</h2>
            <div className="highlight-card">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                </div>
                <div className="flex-grow">
                  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    Welcome to Addis Ketema Secondary School. I am delighted to serve as Principal of this esteemed institution. Our school is more than just a place of learning; it is a community dedicated to nurturing the potential within every student.
                  </p>
                  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    We believe that education is the foundation for personal growth and social progress. Our dedicated faculty and staff work tirelessly to create an environment where students can challenge themselves, discover their passions, and develop the critical thinking skills necessary to navigate an ever-changing world.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    I invite you to join our school community and experience the transformative power of quality education. Together, we will prepare our students to become leaders, innovators, and responsible citizens who will make a positive impact on society.
                  </p>
                  <div>
                    <p className="font-bold text-foreground">Dr. Abebe Tekle</p>
                    <p className="text-muted-foreground">Principal, Addis Ketema Secondary School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
