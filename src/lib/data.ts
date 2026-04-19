// Static layout data — not fetched from API.
// Products, categories, and banners are served by the Express backend.

export const promoCards = [
  {
    id: "1",
    title: "Everyday Fresh & Clean Produce for Your Shelves",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
    bgColor: "bg-green-50",
    link: "/products/lentils-pulses",
  },
  {
    id: "2",
    title: "Premium Breakfast & Snack Lines for Retailers",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    bgColor: "bg-yellow-50",
    link: "/products/ready-mixes",
  },
  {
    id: "3",
    title: "Certified Organic Products Sourced Globally",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    bgColor: "bg-purple-50",
    link: "/products/whole-spices",
  },
];

export const promotionalSections = [
  {
    id: "spices",
    title: "Whole Spices | Premium Quality",
    category: "whole-spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop",
    subtitle: "Export Grade",
    price: "Bulk Pricing",
  },
  {
    id: "lentils",
    title: "Lentils & Pulses | Machine Cleaned",
    category: "lentils-pulses",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=600&h=400&fit=crop",
  },
  {
    id: "ready-mixes",
    title: "MTR Ready Mixes",
    category: "ready-mixes",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
    subtitle: "Branded Products",
    price: "Wholesale",
  },
  {
    id: "blended",
    title: "Tata Sampann Blended Spices",
    category: "blended-spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop",
  },
];
