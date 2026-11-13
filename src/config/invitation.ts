export interface ImageAsset {
  src: string;
  alt: string;
  position: string;
  fit: 'cover' | 'contain';
}

export interface SwatchItem {
  name: string;
  hex: string;
  description: string;
  textColor: string;
}

export const invitationConfig = {
  siteTitle: 'Naveen & Meenakshi – Engagement Invitation | 06.12.2026',
  phrase: 'With Love & Blessings.',
  initials: 'N&M',
  couple: {
    groom: {
      fullName: 'Naveen Kumar M',
      shortName: 'Naveen',
      role: 'The Groom',
      description:
        'Grounded, warm-hearted, and thoughtful, Naveen brings calm strength and quiet joy to every moment shared together.',
    },
    bride: {
      fullName: 'Meenakshi B',
      shortName: 'Meenakshi',
      role: 'The Bride',
      description:
        'Graceful, radiant, and full of warmth, Meenakshi lights up every room with her gentle smile and kind spirit.',
    },
  },
  event: {
    name: 'Engagement Ceremony',
    dateISO: '2026-12-06T18:00:00+05:30',
    timeZone: 'Asia/Kolkata',
    displayDate: '06 December 2026',
    coverDate: '06 DECEMBER 2026',
    shortDate: '06.12.2026',
    weekday: 'Sunday',
    time: '6:00 PM onwards',
    venue: {
      name: 'Meenakshi Natesan Mahal',
      shortCity: 'Devakottai, Tamil Nadu.',
      addressLines: [
        'No. 8/18, Muthu KA.R.M Street,',
        'Devakottai, Tamil Nadu – 630302.',
      ],
      mapQuery:
        'Meenakshi Natesan Mahal, No 8/18, Muthu KA.R.M Street, Devakottai, Tamil Nadu 630302, India',
    },
  },
  dressCode: {
    eyebrow: 'Attire Guide',
    heading: 'THE DRESS CODE',
    subheading: 'Celebrate our special day in shades of elegance.',
    officialPaletteLabel: 'LAVENDER • SOFT LILAC • CHAMPAGNE GOLD',
    swatches: [
      {
        name: 'Lavender',
        hex: '#E6E0F2',
        description: 'Soft dreamy pastel hue',
        textColor: '#493B59',
      },
      {
        name: 'Soft Lilac',
        hex: '#D8C9E8',
        description: 'Gentle romantic lilac tint',
        textColor: '#493B59',
      },
      {
        name: 'Champagne Gold',
        hex: '#D6BD91',
        description: 'Warm heritage shimmer',
        textColor: '#493B59',
      },
    ] as SwatchItem[],
    suggestions: {
      men: [
        'Lavender shirt with cream veshti.',
        'Soft lilac traditional attire.',
        'Subtle champagne-gold accessories.',
      ],
      women: [
        'Lavender sarees.',
        'Soft lilac sarees.',
        'Traditional outfits with champagne-gold borders.',
        'Elegant matching accessories.',
      ],
    },
  },
  images: {
    envelopeBackground: {
      src: '/images/envelope-bg.jpg',
      alt: '',
      position: '50% 50%',
      fit: 'cover' as const,
    },
    coverBackground: {
      src: '/images/cover-bg.jpg',
      alt: '',
      position: '50% 50%',
      fit: 'cover' as const,
    },
    groom: {
      src: '/assets/aistudio/Lavender_groom_image_237593e0.png',
      alt: 'Naveen Kumar M smiling warmly alongside Meenakshi B',
      position: '50% 20%',
      fit: 'cover' as const,
    },
    bride: {
      src: '/assets/aistudio/Lavender_bride_image_a0295416.png',
      alt: 'Meenakshi B smiling joyfully while holding hands with Naveen Kumar M',
      position: '52% 20%',
      fit: 'cover' as const,
    },
    coupleMain: {
      src: '/assets/aistudio/Lavender_main_couple_image_c55beaa7.png',
      alt: 'Naveen Kumar M and Meenakshi B holding hands beneath a golden sunflower backdrop',
      position: '52% 20%',
      fit: 'cover' as const,
    },
    gallery: [
      {
        src: '/assets/aistudio/Lavender_1_c2502c7c.png',
        alt: 'Glimpse of Love 1: Naveen and Meenakshi twirling hand in hand',
        position: '50% 15%',
        fit: 'cover' as const,
      },
      {
        src: '/assets/aistudio/Lavender_2_cd5e2b69.png',
        alt: 'Glimpse of Love 2: Naveen and Meenakshi sharing a warm embrace',
        position: '50% 6%',
        fit: 'cover' as const,
      },
      {
        src: '/assets/aistudio/Lavender_3_0723a33f.png',
        alt: 'Glimpse of Love 3: A candid joyful moment together',
        position: '50% 15%',
        fit: 'cover' as const,
      },
      {
        src: '/assets/aistudio/Lavender_4_215139cc.png',
        alt: 'Glimpse of Love 4: Naveen and Meenakshi smiling warmly at each other',
        position: '50% 15%',
        fit: 'cover' as const,
      },
      {
        src: '/assets/aistudio/Lavender_5_9d445b5c.png',
        alt: 'Glimpse of Love 5: Meenakshi resting her head gently on Naveen shoulder',
        position: '50% 18%',
        fit: 'cover' as const,
      },
    ] as ImageAsset[],
    floralDecoration: {
      src: '/images/floral-decoration.png',
      alt: '',
      position: '50% 50%',
      fit: 'contain' as const,
    },
  },
  music: {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    youtubeVideoId: 'kPhpHvnnn0Q',
    volume: 45,
  },
};
