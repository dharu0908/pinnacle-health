import { ServiceItem } from './types';

export const SPECIALIZATIONS: ServiceItem[] = [
  {
    id: 'allergies-skin',
    icon: '🌸',
    title: 'Allergies & Skin Conditions',
    description: 'Natural, lasting relief from allergic responses and skin imbalances by treating the underlying constitutional cause — not just suppressing symptoms.',
    conditions: [
      'Seasonal allergies',
      'Eczema',
      'Psoriasis',
      'Hives / urticaria',
      'Hay fever',
      'Food sensitivities',
      'Acne',
      'Rosacea'
    ]
  },
  {
    id: 'womens-health',
    icon: '🌺',
    title: "Women's Health & Fertility",
    description: 'Gentle, hormone-free support for every stage of a woman’s life — from menstrual health and fertility through pregnancy support and menopause.',
    conditions: [
      'Irregular periods',
      'PCOS',
      'Endometriosis',
      'Fertility support',
      'PMS',
      'Menopause',
      'Postpartum support',
      'Thyroid balance'
    ]
  },
  {
    id: 'pediatrics',
    icon: '🌱',
    title: "Pediatrics & Children's Health",
    description: 'Safe, effective, and gentle care for children from infancy onward. Homeopathy is ideal for young patients — no side effects, no harsh chemicals.',
    conditions: [
      'Recurrent colds & ear infections',
      'Colic',
      'Growing pains',
      'Bedwetting',
      'ADHD & focus',
      'Teething',
      'Childhood anxiety',
      'Digestive issues'
    ]
  },
  {
    id: 'anxiety-stress-sleep',
    icon: '🍃',
    title: 'Anxiety, Stress & Sleep',
    description: 'Deeply individualized support for mental and emotional wellbeing — helping to restore calm, balance the nervous system, and improve quality of sleep.',
    conditions: [
      'Anxiety & panic',
      'Chronic stress',
      'Insomnia',
      'Depression',
      'Grief & trauma',
      'Burnout',
      'Mood swings',
      'Phobias'
    ]
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'A comprehensive 60–90 minute session covering your full health history, lifestyle, emotional wellbeing, and constitution.'
  },
  {
    step: '02',
    title: 'Remedy Selection',
    description: 'A carefully chosen, highly individualized homeopathic remedy is prescribed based on your unique picture.'
  },
  {
    step: '03',
    title: 'Observation & Support',
    description: 'You begin the remedy and I provide ongoing guidance, check-ins, and adjustments as your body responds.'
  },
  {
    step: '04',
    title: 'Follow-Up & Thrive',
    description: 'Regular follow-ups monitor your progress, deepen healing, and support you toward lasting vitality.'
  }
];

export const INSURERS = [
  'Sun Life',
  'Manulife',
  'Green Shield Canada',
  'Medavie Blue Cross',
  'Claim Secure',
  'Pacific Blue Cross'
];

export const OFFICE_HOURS = [
  { day: 'Monday', hours: '10am – 6pm' },
  { day: 'Tuesday', hours: '10am – 6pm' },
  { day: 'Wednesday', hours: '10am – 6pm' },
  { day: 'Thursday', hours: '10am – 7pm' },
  { day: 'Friday', hours: '9am – 4pm' },
  { day: 'Saturday', hours: '10am – 2pm' },
  { day: 'Sunday', hours: 'Closed' }
];

export const APPOINTMENT_TYPES = [
  'Free Discovery Call (15 min)',
  'Initial Consultation – Adult (60–90 min)',
  'Pediatric Consultation (45–60 min)',
  'Follow-Up Visit (30–45 min)'
];

export const APPOINTMENT_MODES = [
  'In-Person (Windsor, ON)',
  'Virtual (Video Call – Ontario-wide)'
];
