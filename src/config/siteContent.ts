/**
 * Centralized Editable Business Content for BLUSH — NK Beauty Bar
 * Update this file to modify any business details, services, gallery items, or reviews.
 */

export interface ServiceItem {
  id: string;
  name: string;
  category: "Brows" | "Hair" | "Waxing" | "Facials" | "Head Spa" | "Packages";
  headline: string;
  description: string;
  duration?: string;
  startingPrice?: string;
  serviceCount?: string;
  image: string;
  alt: string;
  badge?: string;
  vagaroServiceId?: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  quote: string;
  reviewDate?: string;
  source: "Google Reviews" | "Google Review" | "Vagaro Verified" | "Direct Feedback";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Brows" | "Hair" | "Skin" | "Head Spa" | "Studio";
  imageUrl: string;
  alt: string;
  description: string;
  isBeforeAfter?: boolean;
}

export const SALON_DATA = {
  brand: {
    name: "NK BEAUTY BAR",
    subName: "Hurst · Texas",
    tagline: "Hurst's 5-Star Beauty Bar",
    eyebrow: "NK BEAUTY BAR · TEXAS",
    heroSupporting:
      "Brows, wax, hair, facials, lashes & head spa. Threading",
    shortBio:
      "A boutique beauty sanctuary in Texas dedicated to unhurried, personalized artistry and restorative care.",
  },

  booking: {
    vagaroUrl: "https://www.vagaro.com/nkbeautybar", // Default Vagaro URL
    phone: "(817) 510-6363",
    phoneRaw: "+18175106363",
    email: "concierge@nkbeautybar.com",
    address: {
      street: "712 W Pipeline Rd Ste 700",
      city: "Hurst",
      state: "TX",
      zip: "76053",
      landmark: "Pipeline Plaza, Hurst TX",
    },
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=NK+Beauty+Bar+712+W+Pipeline+Rd+Ste+700+Hurst+TX+76053",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=NK%20Beauty%20Bar%2C%20712%20W%20Pipeline%20Rd%20Ste%20700%2C%20Hurst%2C%20TX%2076053&t=&z=16&ie=UTF8&iwloc=&output=embed",
    hours: [
      { days: "Tuesday – Friday", time: "9:30 AM – 6:30 PM" },
      { days: "Saturday", time: "9:00 AM – 6:00 PM" },
      { days: "Sunday", time: "10:30 AM – 4:30 PM" },
      { days: "Monday", time: "Closed (By Special Request)" },
    ],
    parkingNotes: "Complimentary reserved salon parking available in front of the studio.",
  },

  socials: {
    instagram: "https://instagram.com/nkbeautybar.tx",
    instagramHandle: "@nkbeautybar.tx",
    facebook: "https://facebook.com/nkbeautybar.tx",
    tiktok: "https://tiktok.com/@nkbeautybar.tx",
  },

  // Section 2: Signature Services (Exact 6 services per guide)
  services: [
    {
      id: "eyebrow-threading-tinting",
      name: "Eyebrow Threading ",
      category: "Brows",
      headline: "Artisanal Brow Architecture & Organic Henna/Tint",
      description:
        "Precise hair-by-hair thread sculpting paired with custom color formulation to enhance your natural arch and facial harmony.",
      duration: "30-45 mins",
      serviceCount: "3 Sub-Services",
      startingPrice: "Starting at $25",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
      alt: "Close up of precise eyebrow threading and tinting treatment",
      badge: "Signature Favorite",
    },
    {
      id: "haircuts-styling",
      name: "Haircuts & Styling",
      category: "Hair",
      headline: "Custom Texture Cuts, Silk Blowouts & Gloss Finishes",
      description:
        "Bespoke haircuts tailored to your face shape, lifestyle, and natural movement, finished with lightweight gloss and bouncy silk press styling.",
      duration: "60-90 mins",
      serviceCount: "4 Sub-Services",
      startingPrice: "Starting at $65",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
      alt: "Hair stylist performing a precision haircut and styling blowdry",
      badge: "Popular",
    },
    {
      id: "waxing-body-face",
      name: "Waxing",
      category: "Waxing",
      headline: "Gentle Hard & Strip Waxing for Silky, Calm Skin",
      description:
        "Hypoallergenic botanical waxes engineered for delicate and sensitive skin. Smooth, swift, and soothing from face to full body.",
      duration: "20-60 mins",
      serviceCount: "3 Sub-Services",
      startingPrice: "Starting at $20",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
      alt: "Gentle face and body waxing treatment in calm spa room",
      badge: "Gentle Formula",
    },
    {
      id: "customized-facials",
      name: "Customized Facials",
      category: "Facials",
      headline: "Targeted Skin Nutrition, Lymphatic Drainage & Glow",
      description:
        "Comprehensive skin diagnosis followed by active botanicals, ultrasonic pore purification, custom masks, and deeply hydrating serums.",
      duration: "60-75 mins",
      serviceCount: "4 Sub-Services",
      startingPrice: "Starting at $95",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
      alt: "Rejuvenating custom facial treatment with glowing serene lighting",
      badge: "Glow Ritual",
    },
    {
      id: "japanese-head-spa",
      name: "Head Spa",
      category: "Head Spa",
      headline: "Holistic Scalp Detox, Waterfall Rinse & Acupressure",
      description:
        "A deeply meditative scalp ritual featuring microscopic scalp analysis, deep follicle cleansing, warm herbal halo waterfalls, and tension-melting neck massage.",
      duration: "60-90 mins",
      serviceCount: "5 Sub-Services",
      startingPrice: "Starting at $110",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      alt: "Relaxing Japanese head spa halo water therapy and scalp treatment",
      badge: "Trending Ritual",
    },
    {
      id: "beauty-packages",
      name: "Beauty Packages",
      category: "Packages",
      headline: "Curated Multi-Treatment Day Rituals & Special Occasions",
      description:
        "Synchronized combinations of brows, hair glossing, head-spa relaxation, and custom facial care designed for bridal prep or monthly self-care resets.",
      duration: "2-3 hours",
      serviceCount: "6 Sub-Services",
      startingPrice: "Starting at $185",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
      alt: "Client enjoying comprehensive luxury beauty ritual package",
      badge: "Best Value",
    },
  ] as ServiceItem[],

  // Section 3: Why Choose NK Beauty Bar (The 4 Difference Pillars)
  whyBlush: {
    eyebrow: "THE SANCTUARY DIFFERENCE",
    heading: "Why NK Beauty Bar",
    lead: "We reimagined the salon experience to be calm, intentional, and entirely focused on your well-being. No rush, no generic treatments.",
    pillars: [
      {
        id: "near-walmart",
        title: "Near your Walmart",
        description:
          "Conveniently situated right by Walmart in Hurst, making everyday self-care effortless to fit into your routine.",
        icon: "MapPin",
      },
      {
        id: "no-parking-problem",
        title: "No parking problem",
        description:
          "Hassle-free, dedicated front parking steps away from our salon doors so your visit begins completely stress-free.",
        icon: "Car",
      },
      {
        id: "bundles-and-rewards",
        title: "Bundles and rewards",
        description:
          "Exclusive multi-treatment packages, seasonal specials, and member perks that reward your continuous glow.",
        icon: "Gift",
      },
      {
        id: "everyone-is-served",
        title: "Everyone is served",
        description:
          "An inclusive, warm beauty haven where every client receives attentive, personalized, and respectful care.",
        icon: "HeartHandshake",
      },
    ],
    // Optional metrics strip - toggleable if real numbers are provided
    showMetrics: true,
    metrics: [
      { label: "Client Satisfaction", value: "5.0 ★", note: "Based on local client reviews" },
      { label: "Signature Services", value: "6 Core", note: "Customized to your beauty profile" },
      { label: "Private Suites", value: "100%", note: "Unhurried, peaceful sessions" },
      { label: "Clean & Organic", value: "Botanical", note: "Hypoallergenic formulas" },
    ],
  },

  // Section 4: Meet the Owner (4th Section)
  owner: {
    eyebrow: "MEET THE HEART BEHIND NK BEAUTY BAR",
    heading: "Beauty made personal, welcoming and entirely yours.",
    name: "Bimala Bajgain",
    role: "Founder & Beauty Specialist",
    story:
      "NK Beauty Bar was created from a simple belief: beauty care should never feel rushed or impersonal. Every appointment is an opportunity to listen, understand your preferences, and deliver attentive care that feels naturally yours.",
    extendedStory:
      "With over a decade mastering eyebrow threading, skin wellness, and head spa therapies, Bimala created NK Beauty Bar as a welcoming Texas sanctuary where every client leaves feeling cared for, confident, and refreshed.",
    quote:
      "“I want every client to leave feeling cared for, confident and genuinely seen.”",
    specialties: [
      { name: "Eyebrow Threading", icon: "Feather" },
      { name: "Japanese Head Spa", icon: "Sparkles" },
      { name: "Customized Facials", icon: "Smile" },
      { name: "Hair Styling", icon: "Scissors" },
    ],
    portraitImage: "/images/owner-transparent.png",
    detailImage:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
  },

  // Section 5: The NK Beauty Bar Experience (3-Step Sequence)
  experienceSteps: [
    {
      step: "01",
      title: "Choose Your Ritual",
      description:
        "Clear upfront pricing with no hidden add-ons. From gentle organic brow threading to Japanese head spa rituals, select the exact care you need.",
      tag: "Transparent & Tailored",
      highlights: [
        "100% upfront menu pricing",
        "Custom consultations included",
        "Gentle botanical formulas",
      ],
      icon: "Sparkles",
    },
    {
      step: "02",
      title: "Reserve in Seconds",
      description:
        "Zero phone tag or waitlists. Lock in your preferred time slot online with immediate instant confirmation and convenient parking right out front.",
      tag: "Easy & Hassle-Free",
      highlights: [
        "Instant booking & reminders",
        "Walk-ins always welcomed",
        "Dedicated free front parking",
      ],
      icon: "Calendar",
    },
    {
      step: "03",
      title: "Leave Feeling Renewed",
      description:
        "Relax in a private, hygienic suite with unhurried one-on-one attention from experienced specialists, leaving with fresh, luminous confidence.",
      tag: "Guaranteed Satisfaction",
      highlights: [
        "Sanitized private treatment suites",
        "Unhurried 1-on-1 specialist care",
        "Complimentary post-treatment glow",
      ],
      icon: "HeartHandshake",
    },
  ],

  // Section 6: Results Gallery
  gallery: [
    {
      id: "gal-1",
      title: "Precision Arch Threading & Tint",
      category: "Brows",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      alt: "Sculpted brows with natural soft tinting finish",
      description: "Custom tint blend tailored to warm brown undertones.",
    },
    {
      id: "gal-2",
      title: "Japanese Scalp Waterfall Therapy",
      category: "Head Spa",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
      alt: "Meditation head spa waterfall rinse and scalp massage",
      description: "Herbal halo rinse dissolving scalp tension and product buildup.",
    },
    {
      id: "gal-3",
      title: "Luminous Hydra-Infusion Facial",
      category: "Skin",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
      alt: "Fresh glowing complexion after deep cleansing customized facial",
      description: "Pore-clearing botanical facial revealing natural glass skin glow.",
    },
    {
      id: "gal-4",
      title: "Silk Press & Dimensional Styling",
      category: "Hair",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
      alt: "Silky textured blowout with soft face framing layers",
      description: "Featherlight bounce and protective shine gloss treatment.",
    },
    {
      id: "gal-5",
      title: "Private Studio Sanctuary",
      category: "Studio",
      imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
      alt: "Serene salon interior with warm lighting and plush seating",
      description: "Warm ivory and rose gold aesthetics designed for deep calm.",
    },
    {
      id: "gal-6",
      title: "Natural Brow Definition",
      category: "Brows",
      imageUrl: "https://images.unsplash.com/photo-1512290900672-1f5be57c6dd3?auto=format&fit=crop&w=900&q=80",
      alt: "Meticulous brow threading showing clean symmetrical contours",
      description: "Crisp definition preserving full natural density.",
    },
    {
      id: "gal-7",
      title: "Botanical Skin Nourishment",
      category: "Skin",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
      alt: "Client relaxing with soothing botanical face mask",
      description: "Calming aloe & peptide mask for radiant skin recovery.",
    },
    {
      id: "gal-8",
      title: "Scalp Detox & Acupressure",
      category: "Head Spa",
      imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
      alt: "Specialist providing invigorating therapeutic scalp massage",
      description: "Circulation-boosting acupressure with organic essential oils.",
    },
  ] as GalleryItem[],

  // Section 7: Featured Beauty Ritual (Campaign Offer / Seasonal Package)
  featuredRitual: {
    eyebrow: "FEATURED RITUAL",
    heading: "A little time for you.",
    supporting:
      "Pair two complementary treatments and enjoy a beauty experience designed to help you reset, refresh and glow.",
    packageName: "The Signature Glow & Scalp Renewal Ritual",
    includedServices: [
      "Signature Eyebrow Threading & Custom Tint",
      "Japanese Scalp Detox & Waterfall Spa (60 Min)",
      "Hydrating Botanical Mini-Facial with Lymphatic Massage",
      "Complimentary Organic Herbal Tea & Scalp Serum Take-Home",
    ],
    duration: "105 Minutes of Pure Calm",
    terms: "Available for online reservations through Vagaro. Advance booking recommended.",
    ctaText: "Reserve This Ritual",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
  },

  // Section 8: Client Reviews (Verified 5.0 Star Google Reviews for NK Beauty Bar)
  reviews: [
    {
      id: "rev-1",
      clientName: "Savannah R.",
      service: "Eyebrow Threading & Tinting",
      rating: 5,
      quote:
        "Bimala is the absolute best brow artist in Hurst! Threading is virtually painless and my arches look perfectly symmetrical and shaped every single time. The salon is pristine and parking right out front makes it super easy.",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
    {
      id: "rev-2",
      clientName: "Jessica T.",
      service: "Japanese Scalp & Head Spa",
      rating: 5,
      quote:
        "The head spa treatment here was pure bliss. The waterfall halo rinse, scalp exfoliation, and soothing steam melted away all my tension. My hair felt silky soft and refreshed for days. 100% coming back every month!",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
    {
      id: "rev-3",
      clientName: "Elena Rodriguez",
      service: "Customized Facial & Waxing",
      rating: 5,
      quote:
        "The most welcoming salon atmosphere in Texas. Bimala took time to analyze my dry, sensitive skin and tailored the whole facial. My skin had an incredible glow without any redness or irritation. Truly 5-star service!",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
    {
      id: "rev-4",
      clientName: "Amanda K.",
      service: "Eyebrow Lamination & Waxing",
      rating: 5,
      quote:
        "You never feel rushed here. It feels like an intimate retreat where you have the specialist's full attention. Impeccable hygiene, hospital-clean rooms, and top-tier attention to detail.",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
    {
      id: "rev-5",
      clientName: "Priya Patel",
      service: "Full Body Waxing & Head Spa",
      rating: 5,
      quote:
        "Booked a combination session and I am beyond impressed. The organic wax formula is so gentle on delicate skin and the head spa is unmatched. Thank you NK Beauty Bar for consistently amazing results!",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
    {
      id: "rev-6",
      clientName: "Melissa H.",
      service: "Haircuts & Styling",
      rating: 5,
      quote:
        "Fast, friendly, and exceptionally skilled. Bimala and her team take great pride in their craft. No parking hassle next to Walmart and fair transparent prices. My go-to beauty salon in Hurst!",
      source: "Google Review",
      reviewDate: "Verified Local Client",
    },
  ] as ReviewItem[],

  // Section 10: Social Proof Marquee Images
  socialStrip: [
    {
      id: "soc-1",
      imageUrl: "https://images.unsplash.com/photo-1512290900672-1f5be57c6dd3?auto=format&fit=crop&w=600&q=80",
      caption: "Crisp brow architecture ✨",
      height: "h-72",
    },
    {
      id: "soc-2",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      caption: "Waterfall scalp serenity 🌿",
      height: "h-84",
    },
    {
      id: "soc-3",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
      caption: "Silk press bounce & shine 💫",
      height: "h-72",
    },
    {
      id: "soc-4",
      imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
      caption: "Glow facial radiance 🌸",
      height: "h-84",
    },
    {
      id: "soc-5",
      imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
      caption: "Inside our Texas sanctuary 🕯️",
      height: "h-72",
    },
    {
      id: "soc-6",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      caption: "Behind the chair artistry 🤍",
      height: "h-84",
    },
  ],
};
