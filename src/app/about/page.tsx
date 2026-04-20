"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Leaf,
  Globe,
  Truck,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Sprout,
  Factory,
  Ship,
  Store,
  Star,
  CheckCircle,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Animated number counter ── */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 15 });

  if (inView) mv.set(value);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{spring}</motion.span>
      {/* We use a simpler approach with the rounded display */}
    </span>
  );
}

/* ── Journey step ── */
const journey = [
  {
    icon: Sprout,
    num: "01",
    title: "Source",
    subtitle: "India — 12 States",
    desc: "We visit farms personally. From Punjab's basmati fields to Kerala's spice gardens, every supplier is vetted on-site before a single grain ships.",
    image: "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-emerald-500 to-green-600",
    accent: "emerald",
  },
  {
    icon: Factory,
    num: "02",
    title: "Process",
    subtitle: "FSSAI Certified Facilities",
    desc: "Machine cleaned, sortex graded, lab tested. Every batch meets ISO 22000, HACCP, and BRC standards before it leaves the facility.",
    image: "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-amber-500 to-orange-600",
    accent: "amber",
  },
  {
    icon: Ship,
    num: "03",
    title: "Ship",
    subtitle: "Temperature-Controlled",
    desc: "Food-grade packaging, palletised for bulk. Temperature-controlled containers from India to our UK warehouse. Full chain of custody.",
    image: "https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-sky-500 to-blue-600",
    accent: "sky",
  },
  {
    icon: Store,
    num: "04",
    title: "Deliver",
    subtitle: "Your UK Store — 48h",
    desc: "From our warehouse to your shelves in 48 hours. Free delivery over £500. Real-time tracking. Dedicated account manager for every partner.",
    image: "https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    color: "from-violet-500 to-purple-600",
    accent: "violet",
  },
];

const stats = [
  { value: "35+", label: "Product Lines" },
  { value: "12", label: "Source Countries" },
  { value: "98%+", label: "Purity Grade" },
  { value: "48h", label: "UK Delivery" },
];

const smoothSpring = { type: "spring" as const, stiffness: 60, damping: 18 };

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════
          HERO — Full-width cinematic header
          ═══════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&h=900&fit=crop"
          alt="Indian spices"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-14 lg:pb-20 w-full">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm text-white/70 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
            >
              <Leaf size={11} className="text-emerald-400" />
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...smoothSpring }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white italic leading-[1.05] max-w-3xl"
            >
              We Bridge{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-terra-300 to-amber-200">
                Indian Farms
              </span>{" "}
              with UK Shelves
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/40 text-sm md:text-base max-w-xl mt-5 leading-relaxed"
            >
              Vyapaar Global is a B2B wholesale platform reimagining how premium
              Indian food products reach UK retailers — directly, transparently,
              and at speed.
            </motion.p>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          MISSION — Bold statement
          ═══════════════════════════════════════ */}
      <section className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothSpring}
            >
              <span className="font-display text-5xl md:text-6xl text-terra/15 leading-none select-none">&ldquo;</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-forest italic leading-snug -mt-6">
                Every UK retailer deserves direct access to India&apos;s finest
                products — regardless of their size. No middlemen. No markups. No
                complexity.
              </h2>
              <span className="font-display text-5xl md:text-6xl text-terra/15 leading-none select-none">&rdquo;</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-bark-400 text-sm mt-4"
            >
              — The Vyapaar Global founding principle
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          JOURNEY — Farm to Shelf zigzag timeline
          ═══════════════════════════════════════ */}
      <section className="bg-cream-50 border-y border-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">The Journey</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-forest italic mt-3">
              Farm to Shelf in Four Steps
            </h2>
          </motion.div>

          <div className="space-y-8 lg:space-y-0">
            {journey.map((step, i) => {
              const isEven = i % 2 === 0;
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...smoothSpring, delay: 0.1 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-6 lg:gap-12 ${i < journey.length - 1 ? "lg:mb-10" : ""}`}
                >
                  {/* Image side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative h-[260px] lg:h-[320px] rounded-3xl overflow-hidden group">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      {/* Floating step badge */}
                      <div className={`absolute top-5 ${isEven ? "left-5" : "right-5"}`}>
                        <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${step.color} text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg`}>
                          <Icon size={13} />
                          Step {step.num}
                        </span>
                      </div>
                      {/* Bottom overlay info */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="font-display text-2xl font-bold text-white italic">{step.title}</h3>
                        <span className="text-white/50 text-xs flex items-center gap-1 mt-1">
                          <MapPin size={10} /> {step.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="w-full lg:w-1/2">
                    <div className={`max-w-md ${isEven ? "" : "lg:ml-auto"}`}>
                      <span className={`inline-block font-display text-6xl lg:text-7xl font-bold italic bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20`}>
                        {step.num}
                      </span>
                      <p className="text-bark-500 text-sm lg:text-base leading-relaxed -mt-3">
                        {step.desc}
                      </p>
                      {/* Connector line (except last) */}
                      {i < journey.length - 1 && (
                        <div className="hidden lg:flex items-center gap-2 mt-6">
                          <div className="h-px flex-1 bg-gradient-to-r from-forest/10 to-transparent" />
                          <ArrowRight size={14} className="text-forest/20" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STORY — Two columns with rich content
          ═══════════════════════════════════════ */}
      <section className="bg-warmth">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={smoothSpring}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">How It Started</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-forest italic leading-tight mt-3 mb-6">
                Born From a Simple Frustration
              </h2>
              <div className="space-y-4 text-bark-400 text-sm leading-relaxed">
                <p>
                  UK retailers wanting to stock authentic Indian products faced a maze of
                  importers, brokers, and distributors — each adding cost and complexity.
                  Quality was inconsistent. Traceability was nonexistent. Minimum orders
                  were designed for supermarket chains, not independent stores.
                </p>
                <p>
                  We started by doing what no one else would: flying to India, visiting
                  farms in person, and building direct relationships with growers. From
                  the basmati rice fields of Punjab to the cardamom hills of Kerala, we
                  mapped the supply chain end-to-end.
                </p>
                <p>
                  Today, Vyapaar Global offers <strong className="text-forest">35+ product lines</strong> across
                  six categories — all traceable to their origin, all meeting export-grade
                  standards, all delivered to your UK store within 48 hours.
                </p>
              </div>
            </motion.div>

            {/* Right: Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothSpring, delay: 0.15 }}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-terra uppercase">Our Values</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-forest italic leading-tight mt-3 mb-6">
                What We Stand For
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Leaf, title: "Transparency", desc: "Traceable origins, published quality grades, no hidden fees. You always know exactly what you're getting and where it's from." },
                  { icon: ShieldCheck, title: "Uncompromising Quality", desc: "98%+ purity on all spices. Machine cleaned, sortex graded, lab tested. We reject more than we accept." },
                  { icon: Globe, title: "Fair Access", desc: "The same quality and pricing whether you're ordering 25kg or 2,500kg. Small retailers deserve big-supplier quality." },
                  { icon: Truck, title: "Reliability", desc: "Consistent supply, on-time delivery, responsive support. We know your shelves can't afford gaps." },
                ].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-forest/[0.06] flex items-center justify-center shrink-0 group-hover:bg-terra/10 transition-colors duration-300">
                      <v.icon size={16} className="text-forest-400 group-hover:text-terra transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-forest mb-1">{v.title}</h3>
                      <p className="text-bark-400 text-xs leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CERTIFICATIONS
          ═══════════════════════════════════════ */}
      <section className="bg-cream-50 border-y border-forest/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["FSSAI Certified", "ISO 22000", "HACCP Compliant", "BRC Approved", "UK GDPR Compliant"].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-2 text-sm text-bark-400 font-medium"
              >
                <CheckCircle size={14} className="text-emerald-500" />
                {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — Partner with us
          ═══════════════════════════════════════ */}
      <section className="bg-[#050505] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(193,127,89,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothSpring}
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-terra-300/60 uppercase">Ready?</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white italic leading-tight mt-3 mb-5 max-w-2xl mx-auto">
              Let&apos;s Build Your Indian Grocery Range Together
            </h2>
            <p className="text-white/30 text-sm md:text-base max-w-lg mx-auto mb-8">
              Whether you stock 5 lines or 50, we&apos;ll help you source the best — with zero upfront commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/seller"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-terra via-terra-500 to-amber-800 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all group"
              >
                Become a Partner
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/10 text-white/60 px-7 py-3.5 rounded-full font-semibold text-sm hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
