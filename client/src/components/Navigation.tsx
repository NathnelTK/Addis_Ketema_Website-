import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Academics' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/news', label: 'News & Events' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  const adminLinks = user?.role === 'admin' ? [
    { href: '/admin', label: 'Admin Panel' },
  ] : [
    { href: '/admin/login', label: 'Admin Login' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        {/* Logo/Brand */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <img src="/logo.svg" alt="Addis Ketema School Logo" className="w-10 h-10" />
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              Addis Ketema
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="nav-link">{link.label}</a>
            </Link>
          ))}
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="nav-link text-blue-600 font-semibold">{link.label}</a>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="nav-link block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="nav-link text-blue-600 font-semibold block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
