import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Silkrute</h3>
            <p className="text-sm mb-4">
              Your trusted marketplace for authentic Indian and ethnic products.
              Quality products delivered worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-500">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-500">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-500">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary-500">Returns Policy</Link></li>
              <li><Link href="/faq" className="hover:text-primary-500">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="hover:text-primary-500">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-primary-500">Order Tracking</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary-500">Wishlist</Link></li>
              <li><Link href="/seller" className="hover:text-primary-500">Become a Seller</Link></li>
              <li><Link href="/help" className="hover:text-primary-500">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Market Street, London, UK</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <span>+44 20 1234 5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <span>support@silkrute.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2024 Silkrute. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary-500">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary-500">Terms of Service</Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-primary-500">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
