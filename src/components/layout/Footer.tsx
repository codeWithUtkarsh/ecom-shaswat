import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(27, 42, 91, 0.3), rgba(245, 144, 31, 0.3), rgba(27, 42, 91, 0.2), transparent)",
        }}
      />

      {/* Newsletter strip */}
      <div className="border-b border-white/10 bg-navy">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold text-white">
                Partner with Vyapaar Global
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Get wholesale pricing, new product alerts & supply chain
                updates.
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your business email..."
                className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-l-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange/50 transition-all"
              />
              <button className="bg-orange text-white px-6 py-3 rounded-r-xl font-bold text-sm hover:bg-orange-dark transition-all flex items-center gap-1.5">
                Subscribe
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-navy-dark">
        <div className="max-w-[1400px] mx-auto px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Vyapaar Global"
                  width={120}
                  height={35}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                Importing premium food products. B2B direct supply to UK
                retailers. Smart sourcing, smart logistics, smart living.
              </p>
              <ul className="space-y-2 text-xs text-white/40">
                <li className="flex items-center gap-2">
                  <MapPin
                    size={12}
                    className="text-orange/70 flex-shrink-0"
                  />{" "}
                  London, United Kingdom
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    size={12}
                    className="text-orange/70 flex-shrink-0"
                  />{" "}
                  +44 20 7946 0958
                </li>
                <li className="flex items-center gap-2">
                  <Mail
                    size={12}
                    className="text-orange/70 flex-shrink-0"
                  />{" "}
                  hello@vyapaarglobal.com
                </li>
              </ul>
            </div>

            {/* Links columns */}
            {[
              {
                title: "Company",
                links: [
                  ["About Us", "/about"],
                  ["Contact", "/contact"],
                  ["Delivery Info", "/shipping"],
                  ["Returns Policy", "/returns"],
                  ["FAQ", "/faq"],
                ],
              },
              {
                title: "For Retailers",
                links: [
                  ["My Account", "/account"],
                  ["Order Tracking", "/orders"],
                  ["Bulk Pricing", "/pricing"],
                  ["Become a Partner", "/seller"],
                  ["Help Centre", "/help"],
                ],
              },
              {
                title: "Categories",
                links: [
                  ["Vegetables", "/products/vegetable"],
                  ["Fresh Fruits", "/products/fruits"],
                  ["Spices & Herbs", "/products/spices"],
                  ["Dairy & Milk", "/products/cake-milk"],
                  ["Grains & Rice", "/products/grains"],
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-white mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-xs text-white/40 hover:text-orange transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">Connect</h4>
              <p className="text-xs text-white/40 mb-3">
                Follow us for supply updates
              </p>
              <div className="flex gap-2 mb-5">
                <div className="bg-white/10 border border-white/10 text-white/60 px-3 py-2 rounded-lg text-[10px] font-semibold hover:border-orange/30 hover:text-orange transition-all cursor-pointer">
                  LinkedIn
                </div>
                <div className="bg-white/10 border border-white/10 text-white/60 px-3 py-2 rounded-lg text-[10px] font-semibold hover:border-orange/30 hover:text-orange transition-all cursor-pointer">
                  WhatsApp
                </div>
              </div>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white/50 hover:bg-orange/20 hover:border-orange/30 hover:text-orange transition-all"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 bg-navy-700">
        <div className="max-w-[1400px] mx-auto px-8 py-5 text-center text-[11px] text-white/30">
          &copy; 2025 Vyapaar Global Ltd. All rights reserved. From farm to home
          — smart sourcing, smart logistics, smart living.
        </div>
      </div>
    </footer>
  );
}
