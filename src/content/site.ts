/**
 * Every word, price and contact detail on the site lives here.
 *
 * Source of truth: the existing MuiMui project (src/translations/en.js) —
 * real stats, real credentials, real prices, real contacts. Nothing here is
 * invented except where explicitly marked as a placeholder.
 */

const WHATSAPP_NUMBER = "66945953441";

/**
 * Google Apps Script Web App URL that logs each form submission to a Google
 * Sheet and emails a notification — see the setup guide for how to get this.
 * Left blank until it's deployed; the WhatsApp button keeps working either way.
 */
export const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzP1IVa3qcL5JnXSSCxwjLPVezqjSNtxtD4jGX0R81BW4TLCeDRwS4Oun12kkf-8Gi-Vw/exec";

/** One slide of the "benefits of personal training" carousel. */
export type BenefitSlide = {
  no: string;
  title: string;
  text: string;
  /**
   * Cut-out exercise photo on a transparent background, as in the reference.
   * Leave empty and the carousel draws a styled placeholder instead — nothing
   * breaks, the slide just shows its number until real artwork exists.
   */
  photo?: string;
  photoAlt?: string;
};

/** One slide of the "what's included" carousel. */
export type IncludedSlide = {
  no: string;
  title: string;
  photo: string;
  photoAlt: string;
};

const includedSlides: IncludedSlide[] = [
  {
    no: "01",
    title: "Body composition analysis",
    photo: "/included/included-01.webp",
    photoAlt: "Standing assessment pose, hand on hip",
  },
  {
    no: "02",
    title: "Individual training programme",
    photo: "/included/included-02.webp",
    photoAlt: "Training with a resistance band",
  },
  {
    no: "03",
    title: "Personal nutrition plan",
    photo: "/included/included-03.webp",
    photoAlt: "Holding a shaker bottle",
  },
  {
    no: "04",
    title: "Nutrition diary & review",
    photo: "/included/included-04.webp",
    photoAlt: "Sitting cross-legged, writing in a notebook",
  },
  {
    no: "05",
    title: "Technique coaching",
    photo: "/included/included-05.webp",
    photoAlt: "Demonstrating a bodyweight squat with correct form",
  },
  {
    no: "06",
    title: "Weekly progress check-in",
    photo: "/included/included-06.webp",
    photoAlt: "Flexing a bicep, celebrating progress",
  },
  {
    no: "07",
    title: "Chat support between sessions",
    photo: "/included/included-07.webp",
    photoAlt: "Typing a message on a phone",
  },
  {
    no: "08",
    title: "Programme adjusted as you progress",
    photo: "/included/included-08.webp",
    photoAlt: "Mid-jump, energetic jumping-jack movement",
  },
];

/** One full-bleed panel of the "why train at all" strip carousel. */
export type WhySlide = {
  caption: string;
  photo: string;
  photoAlt: string;
};

const whySlides: WhySlide[] = [
  {
    caption: "A body that moves freely again",
    photo: "/why/why-01.webp",
    photoAlt: "Seated forward stretch on a yoga mat",
  },
  {
    caption: "Deeper sleep, lower stress",
    photo: "/why/why-02.webp",
    photoAlt: "Resting on the mat after a training session",
  },
  {
    caption: "Confidence in how you carry yourself",
    photo: "/why/why-03.webp",
    photoAlt: "Standing tall with relaxed, upright posture",
  },
  {
    caption: "Strength and mobility that last",
    photo: "/why/why-04.webp",
    photoAlt: "Low lunge stretch with arms reaching overhead",
  },
  {
    caption: "Energy that carries the whole day",
    photo: "/why/why-05.webp",
    photoAlt: "Standing overhead side stretch",
  },
];

const benefitSlides: BenefitSlide[] = [
  {
    no: "01",
    title: "A plan built for your body",
    text: "Your programme is written around your goals, your schedule and your current fitness level — then rewritten as you progress.",
    photo: "/benefits/benefit-01.webp",
    photoAlt: "Deep squat holding a kettlebell at the chest",
  },
  {
    no: "02",
    title: "Technique fixed on the spot",
    text: "Bad form is corrected in real time, before it turns into a nagging injury that costs you months.",
    photo: "/benefits/benefit-02.webp",
    photoAlt: "Forearm plank held with a straight back",
  },
  {
    no: "03",
    title: "Accountability that holds",
    text: "Someone is expecting you. That single fact is the difference between a month of training and a year of it.",
    photo: "/benefits/benefit-03.webp",
    photoAlt: "Forward lunge holding a dumbbell in each hand",
  },
  {
    no: "04",
    title: "Nutrition that fits your life",
    text: "No banned-food lists. A way of eating you can keep up long after the programme ends.",
    photo: "/benefits/benefit-04.webp",
    photoAlt: "Standing overhead side stretch",
  },
  {
    no: "05",
    title: "Progress you can measure",
    text: "Body composition, strength numbers and weekly check-ins — so you know it's working, not just hope so.",
    photo: "/benefits/benefit-05.webp",
    photoAlt: "Standing overhead press with two dumbbells",
  },
  {
    no: "06",
    title: "Training that grows with you",
    text: "The programme moves as you do. What worked in week one is not what you need in week twelve.",
    photo: "/benefits/benefit-06.webp",
    photoAlt: "Seated boat pose with legs lifted and arms extended",
  },
];

/** Opens WhatsApp with a message already typed out. */
export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Event the pricing cards fire (with the matching goal string as `detail`)
 * so the contact form can preselect it. A "request" with no name or phone
 * isn't a usable lead, so pricing clicks hand off to the real form instead
 * of logging anything themselves.
 */
export const PRESELECT_GOAL_EVENT = "mw:preselect-goal";

/**
 * Logs a lead to the Google Sheet / Gmail backend (see google-apps-script.gs).
 * Fire-and-forget: throws only if the request itself couldn't be sent, since
 * the no-cors response can't be read to confirm the script actually ran.
 *
 * `website` is the honeypot field — always empty for a real visitor. It's
 * also checked server-side in the Apps Script, since that URL is public and
 * a bot could POST to it directly without ever loading the site.
 */
export function logSubmission(
  name: string,
  phone: string,
  goal: string,
  website = "",
): Promise<void> {
  if (!FORM_ENDPOINT) {
    return Promise.reject(new Error("Form endpoint is not configured yet"));
  }

  return fetch(FORM_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ name, phone, goal, website }),
  }).then(() => undefined);
}

/** The full shape of `site` — reused by site.th.ts so TypeScript can catch
 * any field that's missing, extra, or differently shaped in translation. */
export type Site = typeof site;

export const site = {
  trainer: {
    name: "Mui Wong",
    role: "Personal Trainer",
    location: "Bangkok, Thailand",
    /** Emblem cropped from the real brand mark — see Navbar.css. */
    logo: "/logo-mark.png",
  },

  contacts: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: "+66 94 595 3441",
    /** For tel: links — digits only, no spaces. */
    telHref: `tel:+${WHATSAPP_NUMBER}`,
    instagram: "@muimui__wong",
    instagramUrl: "https://instagram.com/muimui__wong",
    line: "@muimui_wong",
    // LINE's standard add-friend link format for an "@"-prefixed ID.
    lineUrl: "https://line.me/ti/p/@muimui_wong",
    qr: "/QR_Mui.jpg",
  },

  nav: {
    items: [
      { label: "About", href: "#about" },
      { label: "Why me", href: "#benefits" },
      { label: "Included", href: "#included" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Book now",
  },

  hero: {
    eyebrow: "Personal Trainer · Bangkok",
    line1: "Personal",
    line2: "Training",
    script: "that actually sticks",
    lede: "I help people lose 5–10 kg in three months — without crash diets or exhausting workouts.",
    primaryCta: "Book a free consultation",
    secondaryCta: "See pricing",
    photo: "/Mui.jpg",
    photoAlt: "Mui Wong training with a barbell in the gym",
    badge: { value: "Free", label: "first consultation" },
    stats: [
      { value: "7+", label: "years experience" },
      { value: "150+", label: "clients coached" },
      { value: "3000+", label: "sessions delivered" },
    ],
  },

  about: {
    eyebrow: "About me",
    title: "Meet Mui",
    quote:
      "I help people lose 5–10 kg in three months — without crash diets or exhausting workouts.",
    body: "My approach is grounded in sports science and years of hands-on experience. Every client gets a plan built around their lifestyle, their goals and the shape they are in today — not a template pulled off a shelf.",
    credentials: [
      "Certified Trainer FIT",
      "7 years of personal training experience",
      "Specialisation: weight loss & functional fitness",
      "Clients aged 16–65",
      "Online & in-person formats",
    ],
    cta: "See programmes",
    photo: "/Mui_2.jpg",
    photoAlt: "Mui Wong in the gym",
    badge: { value: "7", label: "years\nexperience" },
  },

  benefits: {
    eyebrow: "Why train with a coach",
    // Centred two-line display heading, matching the reference.
    title: "Benefits of\npersonal training",
    prevLabel: "Previous benefit",
    nextLabel: "Next benefit",
    items: benefitSlides,
  },

  whyTrain: {
    title: "Why train at all?",
    prevLabel: "Previous reason",
    nextLabel: "Next reason",
    items: whySlides,
  },

  included: {
    eyebrow: "What you get",
    title: "What's included",
    lede: "Every programme, whether in the gym or fully remote, comes with all of this.",
    items: includedSlides,
    prevLabel: "Previous item",
    nextLabel: "Next item",
    note: "First consultation is free — we talk through your goals and build the plan together.",
    noteCta: "Claim your free consultation",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Choose your",
    titleScript: "programme",
    lede: "Three ways to work together. Every one of them starts with a free consultation.",
    popularLabel: "Most popular",
    cta: "Book this plan",
    footnote:
      "Prices are per month. Not sure which fits? Message me and we'll work it out together — the first conversation costs nothing.",
    plans: [
      {
        id: "online",
        name: "Online Coaching",
        tagline: "Remote",
        price: "฿2,600",
        period: "/ month",
        summary:
          "Full remote coaching — training, nutrition and support, wherever you are. No gym required.",
        features: [
          "Video programme",
          "Weekly training plan",
          "Nutrition guidance",
          "Chat support",
          "No gym needed",
        ],
        popular: false,
      },
      {
        id: "weight-loss",
        name: "Weight Loss",
        tagline: "Fat burning",
        price: "฿3,600",
        period: "/ month",
        summary:
          "Lose 5–10 kg in three months on an individual training and nutrition plan.",
        features: [
          "Body composition analysis",
          "3 sessions / week",
          "Individual nutrition plan",
          "Nutrition diary",
          "Weekly check-in",
        ],
        popular: true,
      },
      {
        id: "muscle-gain",
        name: "Muscle Gain",
        tagline: "Hypertrophy",
        price: "฿3,600",
        period: "/ month",
        summary:
          "Strength and nutrition programme for building quality muscle mass.",
        features: [
          "Split programme",
          "4 sessions / week",
          "Nutrition plan",
          "Progress tracking",
          "Technique coaching",
        ],
        popular: false,
      },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    title: "Still have",
    titleScript: "questions?",
    lede: "Leave your details and I'll get back to you as soon as possible. The first consultation is free.",
    nameLabel: "Your name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone number",
    phonePlaceholder: "+66 __ ___ ____",
    goalLabel: "Your goal",
    goals: ["Lose weight", "Gain muscle", "Stay in shape", "Online coaching"],
    submit: "Send request",
    submitting: "Sending…",
    note: "We'll get back to you as soon as possible.",
    qrCaption: "Scan to chat on Line",
    successTitle: "Request sent!",
    successText: "Thank you — I'll get back to you as soon as possible.",
    sendAnother: "Send another request",
    errorText: "Something went wrong sending your request. Please message us directly instead:",
    errorCta: "Message on WhatsApp",
    message: (name: string, phone: string, goal: string) =>
      `Hi Mui! My name is ${name}.\nPhone: ${phone}.\nGoal: ${goal || "not specified"}`,
  },

  footer: {
    rights: `© ${new Date().getFullYear()} Mui Wong. All rights reserved.`,
    whatsappLabel: "Chat on WhatsApp",
    instagramLabel: "Follow on Instagram",
    lineLabel: "Chat on Line",
  },
};
