import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="School Logo" className="w-10 h-10" />
              <h3 className="font-bold text-lg">Addis Ketema Secondary School</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Providing quality education and developing future leaders in Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/"><a className="hover:text-white transition">Home</a></Link></li>
              <li><Link href="/about"><a className="hover:text-white transition">About Us</a></Link></li>
              <li><Link href="/academics"><a className="hover:text-white transition">Academics</a></Link></li>
              <li><Link href="/admissions"><a className="hover:text-white transition">Admissions</a></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/resources"><a className="hover:text-white transition">Study Materials</a></Link></li>
              <li><Link href="/news"><a className="hover:text-white transition">News & Events</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-white transition">Contact Us</a></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-300 mb-2">
              📍 Addis Ababa, Ethiopia
            </p>
            <p className="text-sm text-gray-300 mb-2">
              📞 +251 11 123 4567
            </p>
            <p className="text-sm text-gray-300">
              ✉️ info@addisketema.edu.et
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Addis Ketema Secondary School. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
