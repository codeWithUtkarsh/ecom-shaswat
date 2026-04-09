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
} from "lucide-react";

const footerLinks = [
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
      ["Grains", "/products/grains"],
      ["Flours", "/products/flours"],
      ["Lentils & Pulses", "/products/lentils-pulses"],
      ["Whole Spices", "/products/whole-spices"],
      ["Blended Spices", "/products/blended-spices"],
      ["Ready Mixes", "/products/ready-mixes"],
    ],
  },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Seamless transition from CTA section */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Main footer */}
      <div className="bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-8 pt-12 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-3">
              <Image
                src="/logo.png"
                alt="Vyapaar Global"
                width={140}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert mb-5"
              />
              <p className="text-[13px] text-white/35 leading-relaxed mb-6 max-w-[240px]">
                Importing premium food products with B2B direct supply to UK
                retailers. From farm to home.
              </p>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-[13px] text-white/35 hover:text-terra-300 transition-colors group"
                >
                  <MapPin
                    size={14}
                    className="text-sage-500 group-hover:text-terra-300 flex-shrink-0"
                  />
                  London, United Kingdom
                </a>
                <a
                  href="tel:+442079460958"
                  className="flex items-center gap-2.5 text-[13px] text-white/35 hover:text-terra-300 transition-colors group"
                >
                  <Phone
                    size={14}
                    className="text-sage-500 group-hover:text-terra-300 flex-shrink-0"
                  />
                  +44 20 7946 0958
                </a>
                <a
                  href="mailto:hello@vyapaarglobal.com"
                  className="flex items-center gap-2.5 text-[13px] text-white/35 hover:text-terra-300 transition-colors group"
                >
                  <Mail
                    size={14}
                    className="text-sage-500 group-hover:text-terra-300 flex-shrink-0"
                  />
                  hello@vyapaarglobal.com
                </a>
              </div>
            </div>

            {/* Link columns */}
            {footerLinks.map((col) => (
              <div key={col.title} className="col-span-1 md:col-span-2">
                <h4 className="font-display text-sm font-semibold text-white/80 mb-5 italic">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-white/35 hover:text-white hover:translate-x-0.5 transition-all inline-block"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect column */}
            <div className="col-span-2 md:col-span-3">
              <h4 className="font-display text-sm font-semibold text-white/80 mb-5 italic">
                Connect
              </h4>
              <p className="text-[13px] text-white/35 mb-4">
                Follow us for supply updates & industry insights.
              </p>
              <div className="flex gap-2 mb-6">
                {socials.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 bg-white/[0.05] rounded-xl flex items-center justify-center text-white/35 hover:bg-terra hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="px-4 py-2 bg-white/[0.05] rounded-lg text-[11px] font-semibold text-white/40 hover:bg-white/10 hover:text-white transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-white/[0.05] rounded-lg text-[11px] font-semibold text-white/40 hover:bg-white/10 hover:text-white transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t border-white/[0.06]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[12px] text-white/20">
                &copy; 2026 Vyapaar Global Ltd. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-[12px] text-white/20 hover:text-white/40 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[12px] text-white/20 hover:text-white/40 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-[12px] text-white/20 hover:text-white/40 transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
