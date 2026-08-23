export { categories } from './categories'

export const heroSlides = [
  {
    image: '/images/15.2---crowdfunding-for-business.avif',
    alt: 'Crowdfunding banner',
    title: 'Where changemakers go to grow',
    description:
      'CrowdNest combines all-in-one fundraising software, 0% fees, and built-in rewards so you can raise more, pay less, and multiply your impact.',
    cta: { label: 'Start a project', to: '/start-campaign' },
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=80',
    alt: 'People planning a project',
    title: 'Build your idea with community support',
    description:
      'Share your story, collect pledges, and keep supporters updated from one simple campaign page.',
    cta: { label: 'Explore projects', to: '/#explore' },
  },
  {
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    alt: 'Creator presenting idea',
    title: 'Launch faster and reach more backers',
    description:
      'Start in minutes with beginner-friendly tools and let your supporters help your project grow.',
    cta: { label: 'Create campaign', to: '/start-campaign' },
  },
]

export const trustedPartners = [
  {
    id: 'trustpilot',
    name: 'Trustpilot',
    rating: '4.8/5',
    caption: 'Excellent',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    caption: 'Secure payments',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    caption: 'Buyer protection',
  },
  {
    id: 'norton',
    name: 'Norton',
    caption: 'Secured',
    icon: 'ri-shield-check-fill',
  },
  {
    id: 'ssl',
    name: '256-bit SSL',
    caption: 'Encrypted checkout',
    icon: 'ri-lock-2-fill',
  },
]

export const featuredProject = {
  title: 'musubi: the first consumer holographic photo and video frame',
  description:
    'turn any photo or video into a hologram | stores up to 1,000 holograms | no subscription, no cloud required | designed to be shared',
  daysLeft: '15 days left',
  funded: '3676% funded',
  currency: '$',
}

export const recommendedProjects = [
  {
    id: 'epomaker',
    mediaClass: 'project-media--1',
    title: 'EPOMAKER RT98 Modular Layout Keyboard',
    brand: 'Expomaker',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Expomaker founder',
    daysLeft: '29 days left',
    funded: '672% funded',
    description:
      'A high-performance 98% layout mechanical keyboard with hot-swap PCB, gasket mounting, and south-facing RGB. Built for enthusiasts who want it all in one compact board.',
    raised: '$6,720 raised',
    goal: 'Goal: $1,000',
    currency: '$',
  },
  {
    id: 'verses',
    mediaClass: 'project-media--2',
    title: 'Verses in the Dark – Poetry Collection',
    brand: 'Baroque Publishing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Baroque Publishing editor',
    daysLeft: '14 hours left',
    funded: '1496% funded',
    description:
      'A curated anthology of rare poetry blending classical verse with contemporary voices. Limited print run of 500 hand-numbered, signed copies on premium paper.',
    raised: '$14,960 raised',
    goal: 'Goal: $1,000',
    currency: '$',
  },
  {
    id: 'link-hub',
    mediaClass: 'project-media--3',
    title: 'LINK Hub – All-in-One Charging Station',
    brand: 'Rolling Square',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Rolling Square creator',
    daysLeft: '38 days left',
    funded: '1097% funded',
    description:
      "Power bank, MagSafe charger, USB-C hub, and wireless pad — all in one sleek titanium device. The only charging accessory you'll ever need on your desk.",
    raised: '$10,970 raised',
    goal: 'Goal: $1,000',
    currency: '$',
  },
  {
    id: 'echoes',
    mediaClass: 'project-media--4',
    title: 'Echoes of Tomorrow – Sci-Fi Graphic Novel',
    brand: 'Charles Brooks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    avatarAlt: 'Charles Brooks',
    daysLeft: '49 days left',
    funded: '563% funded',
    description:
      'An illustrated graphic novel exploring humanity\'s complex relationship with AI through vivid sci-fi storytelling. 240 full-colour pages — perfect for fans of speculative fiction.',
    raised: '$5,630 raised',
    goal: 'Goal: $1,000',
    currency: '$',
  },
]

export const discoverItems = [
  {
    id: 'noreen',
    featured: true,
    mediaClass: 'discover-item__media--a',
    badge: '1.2K donations',
    title: 'Help support Noreen & her Family during her Leukemia Journey',
    progress: 78,
    raised: '€64,697 raised',
    description:
      'Noreen is a mother of three battling Stage 4 Leukemia. Every donation goes directly toward her treatment, transport costs, and daily care needs as she fights for her life and her family.',
    donors: '1,200 donors',
    goal: 'Goal: €83,000',
    currency: '€',
  },
  {
    id: 'leni',
    mediaClass: 'discover-item__media--b',
    badge: '892 donations',
    title: "Leni's Life-Saving Treatment",
    progress: 62,
    raised: '€28,400 raised',
    description:
      "Little Leni needs an urgent life-saving cardiac procedure abroad. Every cent raised covers surgery fees, hospital stays, and the long road to recovery by her family's side.",
    donors: '892 donors',
    goal: 'Goal: €45,000',
    currency: '€',
  },
  {
    id: 'jnaii',
    mediaClass: 'discover-item__media--c',
    badge: '2.4K donations',
    title: "Help J'Naii Fight Brain Cancer & Not become homeless",
    progress: 91,
    raised: '€112,050 raised',
    description:
      "J'Naii was diagnosed with an aggressive brain tumour at just 27. She faces mounting medical bills while at risk of losing her home. Your donation gives her a fighting chance.",
    donors: '2,400 donors',
    goal: 'Goal: €123,000',
    currency: '€',
  },
  {
    id: 'mike',
    mediaClass: 'discover-item__media--d',
    badge: '540 donations',
    title: 'Support Mike Hinrichs After Losing Jessi (Pierce) & Children',
    progress: 44,
    raised: '€19,200 raised',
    description:
      'Mike tragically lost his wife Jessi and their children. Donations help cover funeral arrangements, grief counselling, and help him find the strength to rebuild his life.',
    donors: '540 donors',
    goal: 'Goal: €44,000',
    currency: '€',
  },
  {
    id: 'zef',
    mediaClass: 'discover-item__media--e',
    badge: '310 donations',
    title: 'With loving family remembrance of Zef Krasniqi – support for the ....',
    progress: 55,
    raised: '€12,880 raised',
    description:
      'In loving memory of Zef — a devoted father, husband, and community pillar. Funds support his family as they grieve and navigate an incredibly difficult time together.',
    donors: '310 donors',
    goal: 'Goal: €23,000',
    currency: '€',
  },
]

export const crowdFeedPanels = {
  trending: [
    {
      imageClass: 'crowd-card__image--1',
      likes: '61.6K',
      backers: '13.0K',
      tag: 'CROWDFUNDING',
      tagIcon: 'ri-recycle-line',
      daysLeft: '17 days left',
      title: 'Brass: Pittsburgh',
      brand: 'by Roxley Games',
      amount: '$2,880,659',
      note: 'goal reached in 43 minutes',
    },
    {
      imageClass: 'crowd-card__image--2',
      likes: '57.0K',
      backers: '9.5K',
      tag: 'CROWDFUNDING',
      tagIcon: 'ri-recycle-line',
      daysLeft: '18 days left',
      title: 'Here to Slay DUNGEONS',
      brand: 'by Unstable Games',
      amount: '$2,180,678',
      note: 'goal reached in 1 minute',
    },
    {
      imageClass: 'crowd-card__image--3',
      likes: '12.0K',
      backers: '2.0K',
      tag: 'CROWDFUNDING',
      tagIcon: 'ri-recycle-line',
      daysLeft: '19 days left',
      title: 'Company of Heroes - Desert Warfare Expansion',
      brand: 'by Bad Crow Games',
      amount: '$731,257',
      note: 'goal reached in 22 minutes',
    },
    {
      imageClass: 'crowd-card__image--4',
      likes: '49.8K',
      backers: '17.3K',
      tag: 'CROWDFUNDING',
      tagIcon: 'ri-recycle-line',
      daysLeft: '4 days left',
      title: "The Old King's Crown Second Printing & New Expansion",
      brand: 'by Eerie Idol Games',
      amount: '£2,291,304',
      note: 'goal reached in 5 minutes',
    },
  ],
  mostFunded: [
    {
      imageClass: 'crowd-card__image--5',
      likes: '219.6K',
      backers: '219.4K',
      tag: 'MOST FUNDED',
      tagIcon: 'ri-trophy-line',
      daysLeft: 'Campaign ended',
      title: 'Exploding Kittens: Party Pack',
      brand: 'by Exploding Kittens LLC',
      amount: '$8,782,571',
      note: '8,782% of goal funded',
    },
    {
      imageClass: 'crowd-card__image--6',
      likes: '62.5K',
      backers: '62.6K',
      tag: 'MOST FUNDED',
      tagIcon: 'ri-trophy-line',
      daysLeft: 'Campaign ended',
      title: 'Coolest Cooler: 60L Adventure Cooler',
      brand: 'by Coolest LLC',
      amount: '$13,285,226',
      note: '26,570% of goal funded',
    },
    {
      imageClass: 'crowd-card__image--7',
      likes: '19.2K',
      backers: '19.3K',
      tag: 'MOST FUNDED',
      tagIcon: 'ri-trophy-line',
      daysLeft: 'Campaign ended',
      title: 'Kingdom Death: Monster 1.5',
      brand: 'by Kingdom Death',
      amount: '$12,393,139',
      note: '4,131% of goal funded',
    },
    {
      imageClass: 'crowd-card__image--8',
      likes: '44.8K',
      backers: '34.9K',
      tag: 'MOST FUNDED',
      tagIcon: 'ri-trophy-line',
      daysLeft: 'Campaign ended',
      title: 'BAUBAX Travel Jacket 2.0',
      brand: 'by Baubax',
      amount: '$9,192,055',
      note: '9,192% of goal funded',
    },
  ],
}

export const campaignFeatures = [
  {
    icon: 'ri-cpu-line',
    title: 'Most advanced crowdfunding technology',
    text: 'Best features for backers and creators alike.',
  },
  {
    iconText: 'GO',
    title: 'All in one solution',
    text: 'Pledge Manager, late pledge, analytics and more.',
  },
  {
    icon: 'ri-team-line',
    title: 'Enormous community',
    text: 'Millions of backers looking for exciting projects.',
  },
  {
    icon: 'ri-shield-check-line',
    title: '20+ secure payments',
    text: 'Advanced checkout built for crowdfunding.',
  },
]

export const campaignCategories = [
  'Technology',
  'Arts',
  'Music',
  'Film & video',
  'Publishing',
  'Food',
  'Fashion',
  'Community',
]

export const campaignDurations = [
  { value: '30', label: '30 days' },
  { value: '45', label: '45 days' },
  { value: '60', label: '60 days' },
]
