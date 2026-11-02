Copy this prompt into your preferred coding agent. It is designed to extend the existing hero into a complete, production-quality landing page.

Act as a senior UI/UX designer and frontend engineer. Design and implement the complete homepage for **NK Beauty Bar**, a modern beauty salon in Texas being rebranded as **BLUSH — NK Beauty Bar**.

The hero section already exists and establishes the visual direction. Build every section below it so the entire page feels like one cohesive premium experience.

## 1. Primary objective

The homepage must:

* Present BLUSH as elegant, warm, modern, and trustworthy.
* Help visitors understand the salon’s services quickly.
* Introduce the owner within the third or fourth homepage section.
* Build trust using authentic work, reviews, and practical information.
* Guide visitors naturally toward booking through Vagaro.
* Be highly effective on both desktop and mobile.
* Prioritize bookings and calls—not decorative visuals alone.

The intended journey is:

**Discover the brand → Explore services → Trust the business → Meet the owner → See results → Book an appointment**

## 2. Technology

Use the project’s existing framework and components. If the project does not already define them, use:

* React or Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Framer Motion for restrained animations
* Lucide icons
* Next/Image or an equivalent optimized image component

Create clean, reusable components rather than one oversized page component.

Suggested components:

* `SectionHeading`
* `ServiceCard`
* `TrustMetric`
* `OwnerSection`
* `ExperienceStep`
* `GalleryCard`
* `ReviewCard`
* `OfferCard`
* `LocationSection`
* `BookingCTA`
* `MobileBookingBar`

## 3. Existing hero direction

Preserve the existing hero’s premium composition:

* Full-viewport salon photography
* Floating translucent pill-shaped navigation
* Soft ivory content card over the image
* Blush-pink primary action
* Elegant serif display typography
* Minimal uppercase labels with generous letter spacing
* Rounded corners and delicate white borders
* Warm, diffused lighting
* Soft shadows and subtle glass effects

Do not redesign the hero from scratch. Refine it only if necessary to ensure visual consistency and responsiveness.

Update the hero content to represent NK Beauty Bar’s real services.

Use content similar to:

Eyebrow label:
`NK BEAUTY BAR · TEXAS`

Headline:
`Where Subtle Elegance`
`Meets Thoughtful Care.`

Supporting text:
`Personalized threading, tinting, hair, waxing, facial and head-spa services—created to help you feel polished, refreshed and completely yourself.`

Primary CTA:
`Book Appointment`

Secondary CTA:
`Explore Services`

Do not mention services the business does not actually provide.

## 4. Brand system

### Colors

Use a restrained premium palette:

* Warm Ivory: `#F8F4F1`
* Porcelain: `#FFFDFC`
* Blush Pink: `#E89AB2`
* Dusty Rose: `#C96F8E`
* Deep Rose: `#8E3F5C`
* Espresso: `#271E20`
* Warm Taupe: `#A69894`
* Champagne: `#C9A66B`

Use blush as an accent, not as the background of every section.

Create subtle abstract gradients using combinations such as:

* Ivory → pale blush
* Dusty rose → warm peach
* Deep rose → espresso
* Transparent champagne highlights

Gradients must feel diffused and editorial—not bright, synthetic, or neon.

### Typography

Use:

* Elegant editorial serif for major headings, such as Cormorant Garamond, DM Serif Display, Playfair Display, or an existing equivalent.
* Clean modern sans-serif for body text, navigation, labels, and buttons, such as Inter, Manrope, or Sora.

Typography hierarchy:

* Hero headline: large editorial serif
* Section headings: expressive serif
* Eyebrow labels: small uppercase sans-serif with wide tracking
* Body text: highly readable sans-serif
* Accent phrases may use italic serif text

### UI language

Use:

* Large editorial spacing
* Rounded cards between 24px and 36px
* Thin translucent borders
* Soft layered shadows
* Pill-shaped labels and buttons
* Selective glassmorphism
* Organic gradient shapes
* Generous negative space
* Asymmetrical but balanced layouts

Avoid:

* Generic SaaS layouts
* Excessive pink backgrounds
* Heavy shadows
* Neon effects
* Overly animated interfaces
* Dense text
* Identical three-column grids in every section
* Fake awards, ratings, statistics, prices, or testimonials

## 5. Homepage sections

Build the sections in this exact order.

### Section 1 — Hero

Keep and refine the current hero.

Add a subtle scroll cue at the bottom. Apply a very slow background scale or parallax effect on desktop only. Keep the movement nearly unnoticeable.

The primary booking button must link to the Vagaro booking flow. Use a clearly named placeholder constant if the URL is unavailable.

### Section 2 — Signature Services

Eyebrow:
`OUR SIGNATURE SERVICES`

Heading:
`Carefully chosen rituals for your kind of beauty.`

Supporting copy:
`From precise brows to restorative skin and scalp care, every service is personalized around how you want to look and feel.`

Feature these six services:

1. Eyebrow Threading & Tinting
2. Haircuts & Styling
3. Waxing
4. Customized Facials
5. Head Spa
6. Beauty Packages

Use a horizontal scroll experience on desktop that feels like a curated editorial lookbook.

Interaction requirements:

* Cards should be partially stacked or slightly overlap at rest.
* Scrolling should reveal the cards progressively.
* Cards may use gentle alternating vertical offsets.
* On hover, reveal service description, duration placeholder, and CTA.
* On mobile, use native horizontal swipe with scroll snap.
* Do not hijack vertical scrolling.
* Include visible controls and make cards keyboard accessible.

Each card should contain:

* Optimized service image
* Service name
* One-line benefit
* Optional duration or “Starting at” placeholder only if verified data exists
* `Explore Service` action
* Small arrow icon

Add a final card labeled `View All Services`.

### Section 3 — Why Choose BLUSH

Create an immersive trust section rather than a basic icon grid.

Eyebrow:
`THE BLUSH DIFFERENCE`

Heading:
`Beauty care that feels personal from the moment you arrive.`

Create four benefits:

* Personalized consultations
* Experienced, attentive care
* Clean and welcoming environment
* Services tailored to your comfort

Layout idea:

* Large lifestyle photograph on the left.
* Four layered or stacked cards on the right.
* As the user scrolls, each card moves gently forward and the previous card recedes.
* Use subtle depth, opacity, and scale transitions.
* Keep all cards visible and readable when reduced-motion is enabled.

Do not invent numeric statistics. Provide a reusable metrics strip that can be enabled later when real values are available:

* Years of experience
* Happy clients
* Google rating
* Services offered

Keep the metrics hidden until verified data is supplied.

### Section 4 — Meet the Owner

This must be a major emotional storytelling section and appear as the fourth section.

Eyebrow:
`MEET THE HEART BEHIND BLUSH`

Heading:
`Beauty made personal, welcoming and entirely yours.`

Use a refined two-column editorial layout:

* Large professional upper-body portrait of the owner on one side.
* Short personal story on the other.
* Layer one smaller detail photograph behind or beside the portrait.
* Add a soft blush gradient orb or abstract organic shape behind the images.
* Use a handwritten-style signature treatment only as a subtle visual detail.
* Include a short quote inside a floating glass card.

Use editable placeholders for the owner’s name and exact experience.

Suggested story:

`BLUSH was created from a simple belief: beauty care should never feel rushed or impersonal. Every appointment is an opportunity to listen, understand your preferences and create a result that feels naturally yours.`

Suggested quote:

`“I want every client to leave feeling cared for, confident and genuinely seen.”`

Include:

* Owner name placeholder
* `Founder & Beauty Specialist`
* Short story
* Specialties placeholder
* `Meet the Team` or `Book With Us` CTA

Do not make the biography long. The visual emphasis should be on warmth, personality, and trust.

Animation:

* Portrait reveals with a soft mask animation.
* Abstract gradient moves very slowly.
* Quote card floats upward slightly as it enters the viewport.
* Disable complex motion on smaller devices and for reduced-motion users.

### Section 5 — The BLUSH Experience

Eyebrow:
`YOUR VISIT`

Heading:
`A simpler path to feeling your best.`

Present the booking experience in three steps:

1. `Choose Your Ritual`
   Explore treatments designed around your needs.

2. `Reserve Your Time`
   Select a convenient appointment through Vagaro.

3. `Leave Feeling Renewed`
   Enjoy thoughtful, unhurried and personalized care.

Create a modern scroll-led sequence:

* Use three large cards arranged vertically.
* Cards become sticky one at a time on desktop.
* Each next card stacks over the previous card.
* Use distinct but related background treatments.
* Add minimal line illustrations or close-up beauty photography.
* Keep the content concise.
* On mobile, render a normal vertical list without sticky behavior if stacking harms usability.

### Section 6 — Results Gallery

Eyebrow:
`REAL WORK · REAL CONFIDENCE`

Heading:
`A closer look at the BLUSH effect.`

Build an editorial masonry-style gallery using authentic salon work.

Categories:

* Brows
* Hair
* Skin
* Head Spa
* Studio

Requirements:

* Use category filter pills.
* Create varied image sizes.
* Add subtle image zoom on hover.
* Use graceful cross-fade transitions when filters change.
* Support before-and-after comparison where appropriate.
* Open images in an accessible lightbox.
* Include meaningful alt text.
* Add `View Full Gallery` CTA.

Use placeholders clearly marked for replacement with real NK Beauty Bar images. Do not use random remote images in production.

### Section 7 — Featured Beauty Ritual

Create a full-width campaign section for one seasonal or introductory offer.

Eyebrow:
`FEATURED RITUAL`

Heading example:
`A little time for you.`

Supporting copy:
`Pair two complementary treatments and enjoy a beauty experience designed to help you reset, refresh and glow.`

Include editable placeholders for:

* Offer name
* Included services
* Verified price
* Expiration date
* Terms

Visual treatment:

* Deep rose-to-espresso gradient background
* Large editorial typography
* One premium service image
* Fine champagne-colored details
* Soft animated light bloom
* `Reserve This Ritual` CTA

Do not fabricate an offer or discount. If no promotion is supplied, display the section as a featured service package without pricing.

### Section 8 — Client Reviews

Eyebrow:
`CLIENT LOVE`

Heading:
`Loved locally. Remembered personally.`

Build a horizontal review carousel with one featured review and partially visible adjacent reviews.

Each card must support:

* Star rating
* Short review
* Customer first name
* Service received
* Review source
* Optional date

Add an overall Google rating summary only after real Google data is provided.

Interactions:

* Drag or swipe
* Previous and next controls
* Keyboard navigation
* Pause autoplay on hover or focus
* Avoid fast automatic movement

Use honest placeholders until authentic reviews are supplied.

### Section 9 — Visit the Beauty Bar

Eyebrow:
`VISIT BLUSH`

Heading:
`Your beauty escape, close to home.`

Create a split layout containing:

* Warm salon interior or exterior image
* Exact address placeholder
* Business hours placeholder
* Phone placeholder
* Parking information placeholder
* `Get Directions`
* `Call Us`
* `Book Appointment`

Add a stylized map panel or map embed placeholder. Do not load a heavy interactive map before user interaction. Use a static map preview that opens Google Maps when clicked.

On mobile, prioritize address, today’s hours, directions, call, and booking.

### Section 10 — Social Proof Gallery

Eyebrow:
`FRESH FROM BLUSH`

Heading:
`Beauty moments, behind the chair.`

Create an Instagram-inspired image strip with 5–6 salon images.

Use:

* Alternating image heights
* Smooth marquee motion only if it remains usable
* Pause animation on hover
* Disable continuous animation for reduced-motion users
* Instagram icon and `Follow @handle` CTA

This must feel like an editorial gallery—not an embedded social-media widget.

### Section 11 — Final Booking CTA

Create a visually memorable closing section.

Headline:
`Your next beauty ritual starts here.`

Supporting copy:
`Take a little time for yourself—with personalized care designed around you.`

Buttons:

* `Book an Appointment`
* `Explore Services`

Design:

* Large rounded container
* Abstract blush, peach and champagne gradient
* Faint botanical or flowing-line texture
* One carefully cropped beauty image
* Subtle cursor-responsive gradient on desktop
* No distracting animation

### Section 12 — Footer

Include:

* BLUSH / NK Beauty Bar logo
* Short brand statement
* Services links
* About
* Gallery
* Contact
* Vagaro booking link
* Address
* Business hours
* Phone
* Instagram and Facebook
* Privacy Policy
* Terms
* Copyright

Use a deep espresso background with ivory text and blush accents.

## 6. Navigation behavior

Although this task focuses on the landing page, make the existing navigation work properly:

* Transparent or translucent over the hero.
* Converts to a compact ivory navigation bar after scrolling.
* Smooth transition between states.
* Active section indicator.
* Persistent `Book Visit` button.
* Accessible mobile menu.
* Prevent background scrolling while the mobile menu is open.
* Allow Escape key to close it.
* Use a simple full-screen or rounded-sheet mobile menu.

Suggested items:

* Services
* About
* Gallery
* Reviews
* Contact
* Book Visit

## 7. Motion system

Animations should support storytelling and visual hierarchy.

Use:

* Gentle fade-and-rise section entrances
* Text reveal using line or mask animation
* Subtle image parallax on large screens
* Stacked-card scroll effects
* Slow gradient movement
* Soft card hover lift
* Button arrow movement
* Image scale from `1` to approximately `1.03`
* Small opacity and blur transitions

Animation principles:

* Prefer transforms and opacity for performance.
* Keep most transitions between 300ms and 700ms.
* Use longer timing only for ambient gradients.
* Trigger reveal animations once.
* Do not animate every element.
* Never delay access to content for animation.
* Respect `prefers-reduced-motion`.
* On reduced motion, all information must appear immediately.
* Avoid scroll-jacking and aggressive cursor effects.

## 8. Conversion requirements

Booking must remain the primary action throughout the page.

Include booking access in:

* Navigation
* Hero
* Service cards
* Owner section
* Featured ritual
* Location section
* Final CTA
* Mobile sticky booking bar

On mobile, add a fixed bottom action bar containing:

* `Call`
* `Book`

Account for safe-area insets on modern phones.

Do not show intrusive popups immediately. If a promotion popup is later added, trigger it based on clear user intent or sufficient engagement.

## 9. Accessibility

Meet WCAG AA standards.

Requirements:

* Semantic HTML landmarks
* Correct heading hierarchy
* Keyboard-accessible interactions
* Visible focus states
* Accessible carousel controls
* Proper button and link labels
* Alt text for all meaningful images
* Decorative elements hidden from assistive technology
* Sufficient color contrast
* Minimum comfortable touch targets
* No important text embedded inside images
* Reduced-motion support
* No hover-only critical information

## 10. Responsive behavior

Design mobile-first and test at approximately:

* 375px
* 430px
* 768px
* 1024px
* 1440px
* 1920px

Mobile requirements:

* Preserve the premium editorial feeling.
* Prevent oversized headings from clipping.
* Convert complex split layouts into clean vertical compositions.
* Convert stacked cards to readable swipe or vertical cards where necessary.
* Avoid fixed heights for text-heavy sections.
* Keep CTA buttons easy to tap.
* Ensure the owner’s portrait remains the visual focus.
* Avoid horizontal overflow.
* Keep mobile page performance fast.

## 11. Performance

Target strong Core Web Vitals.

Requirements:

* Optimize and appropriately size all images.
* Preload only the true hero image.
* Lazy-load below-the-fold images.
* Avoid loading unnecessary animation libraries or effects.
* Prevent layout shift by setting image dimensions.
* Use responsive image sources.
* Keep decorative gradient effects CSS-based where possible.
* Defer nonessential embeds.
* Avoid autoplay video unless a lightweight poster and user-controlled playback are provided.

## 12. Content and data handling

Store business information in one editable configuration object:

* Brand name
* Owner name
* Owner role
* Address
* Phone
* Hours
* Vagaro booking URL
* Google Maps URL
* Social links
* Services
* Offers
* Reviews

Use clear placeholders for missing information. Never invent:

* Customer reviews
* Prices
* Ratings
* Number of clients
* Years of experience
* Certifications
* Awards
* Business hours
* Exact location

## 13. Final implementation quality

The final page should feel:

* Premium but approachable
* Feminine without becoming overly decorative
* Modern without looking like a generic template
* Editorial but easy to navigate
* Animated but calm
* Beautiful while remaining conversion-focused

Ensure each section has a distinct visual composition while maintaining the same typography, palette, spacing, radius, border and animation system.

Deliver:

1. Complete responsive landing page
2. Reusable components
3. Centralized editable business content
4. Functional section navigation
5. Functional booking CTAs
6. Mobile menu
7. Mobile call-and-book bar
8. Reduced-motion behavior
9. Loading and image fallback states
10. Clean production-ready code

Before completing, review the page for:

* Visual consistency with the existing hero
* Content accuracy
* Responsive layout issues
* Horizontal overflow
* Contrast problems
* Broken interactions
* Excessive motion
* Missing focus states
* Placeholder information that could be mistaken for real business data
