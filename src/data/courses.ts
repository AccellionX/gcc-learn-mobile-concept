export type CategoryId =
  | 'leadership'
  | 'hr'
  | 'finance'
  | 'iso'
  | 'graduate'
  | 'sales'

export interface Lesson {
  id: string
  titleAr: string
  titleEn: string
  durationMin: number
  freePreview?: boolean
}

export interface Course {
  id: string
  titleAr: string
  titleEn: string
  instructorAr: string
  instructorEn: string
  instructorTitleAr: string
  instructorTitleEn: string
  descriptionAr: string
  descriptionEn: string
  category: CategoryId
  durationHours: number
  lessonCount: number
  priceKwd: number
  rating: number
  students: number
  featured?: boolean
  isNew?: boolean
  gradient: string
  icon: string
  lessons: Lesson[]
}

export const categories: { id: CategoryId; icon: string }[] = [
  { id: 'leadership', icon: 'Users' },
  { id: 'hr', icon: 'UserCog' },
  { id: 'finance', icon: 'Wallet' },
  { id: 'iso', icon: 'BadgeCheck' },
  { id: 'graduate', icon: 'GraduationCap' },
  { id: 'sales', icon: 'TrendingUp' },
]

export const courses: Course[] = [
  {
    id: 'lead-essentials',
    titleAr: 'أساسيات القيادة التنفيذية',
    titleEn: 'Executive Leadership Essentials',
    instructorAr: 'د. فيصل المنصور',
    instructorEn: 'Dr. Faisal Al-Mansour',
    instructorTitleAr: 'مستشار قيادة — الكويت',
    instructorTitleEn: 'Leadership consultant — Kuwait',
    descriptionAr:
      'برنامج عملي للقادة في المؤسسات الخليجية يغطي صناعة القرار، تفويض الصلاحيات، وبناء فرق عالية الأداء ضمن بيئة عمل متعددة الجنسيات.',
    descriptionEn:
      'A practical program for leaders in GCC organizations covering decision-making, delegation, and building high-performing teams in multicultural workplaces.',
    category: 'leadership',
    durationHours: 8,
    lessonCount: 12,
    priceKwd: 15,
    rating: 4.8,
    students: 1240,
    featured: true,
    gradient: 'from-[#0B2545] to-[#13A89E]',
    icon: 'Users',
    lessons: [
      { id: 'le-1', titleAr: 'مقدمة في القيادة الحديثة', titleEn: 'Introduction to modern leadership', durationMin: 12, freePreview: true },
      { id: 'le-2', titleAr: 'أساليب القيادة في الخليج', titleEn: 'Leadership styles in the Gulf', durationMin: 18, freePreview: true },
      { id: 'le-3', titleAr: 'صنع القرار تحت الضغط', titleEn: 'Decision-making under pressure', durationMin: 22 },
      { id: 'le-4', titleAr: 'التفويض الفعّال', titleEn: 'Effective delegation', durationMin: 16 },
      { id: 'le-5', titleAr: 'بناء الثقة في الفريق', titleEn: 'Building team trust', durationMin: 20 },
      { id: 'le-6', titleAr: 'إدارة أصحاب المصلحة', titleEn: 'Stakeholder management', durationMin: 24 },
    ],
  },
  {
    id: 'hr-kuwait',
    titleAr: 'إدارة الموارد البشرية وفق قانون العمل الكويتي',
    titleEn: 'HR Management & Kuwait Labour Law',
    instructorAr: 'أ. نورة الصباح',
    instructorEn: 'Noura Al-Sabah',
    instructorTitleAr: 'خبيرة موارد بشرية',
    instructorTitleEn: 'HR specialist',
    descriptionAr:
      'دورة شاملة تغطي التوظيف، العقود، الإجازات، وإنهاء الخدمة وفق قانون العمل الكويتي في القطاع الخاص، مع حالات عملية من السوق المحلي.',
    descriptionEn:
      'A comprehensive course covering hiring, contracts, leave, and termination under Kuwait private-sector labour law, with local case studies.',
    category: 'hr',
    durationHours: 10,
    lessonCount: 14,
    priceKwd: 18,
    rating: 4.9,
    students: 980,
    featured: true,
    gradient: 'from-[#163A5F] to-[#2A6F97]',
    icon: 'UserCog',
    lessons: [
      { id: 'hr-1', titleAr: 'نظرة على قانون العمل', titleEn: 'Labour law overview', durationMin: 15, freePreview: true },
      { id: 'hr-2', titleAr: 'عقود العمل وأنواعها', titleEn: 'Employment contract types', durationMin: 20, freePreview: true },
      { id: 'hr-3', titleAr: 'التوظيف والاستقطاب', titleEn: 'Recruitment & sourcing', durationMin: 18 },
      { id: 'hr-4', titleAr: 'الإجازات والمستحقات', titleEn: 'Leave & entitlements', durationMin: 22 },
      { id: 'hr-5', titleAr: 'إنهاء الخدمة', titleEn: 'Termination procedures', durationMin: 25 },
      { id: 'hr-6', titleAr: 'حالات عملية من الكويت', titleEn: 'Kuwait case studies', durationMin: 28 },
    ],
  },
  {
    id: 'fin-reporting',
    titleAr: 'التقارير المالية لغير الماليين',
    titleEn: 'Financial Reporting for Non-Finance Managers',
    instructorAr: 'م. خالد الرشيد',
    instructorEn: 'Khaled Al-Rashid, CFA',
    instructorTitleAr: 'محلل مالي معتمد',
    instructorTitleEn: 'Chartered Financial Analyst',
    descriptionAr:
      'افهم الميزانية وقائمة الدخل والتدفقات النقدية بثقة — دون خلفية محاسبية — واتخذ قرارات أفضل في اجتماعات الإدارة.',
    descriptionEn:
      'Understand balance sheets, income statements, and cash flow with confidence — no accounting background required — and make better decisions in management meetings.',
    category: 'finance',
    durationHours: 6,
    lessonCount: 10,
    priceKwd: 12,
    rating: 4.7,
    students: 1560,
    featured: true,
    gradient: 'from-[#0E4D4A] to-[#13A89E]',
    icon: 'Wallet',
    lessons: [
      { id: 'fi-1', titleAr: 'لغة المال في الأعمال', titleEn: 'The language of business finance', durationMin: 14, freePreview: true },
      { id: 'fi-2', titleAr: 'قراءة الميزانية العمومية', titleEn: 'Reading the balance sheet', durationMin: 20, freePreview: true },
      { id: 'fi-3', titleAr: 'قائمة الدخل', titleEn: 'The income statement', durationMin: 18 },
      { id: 'fi-4', titleAr: 'التدفقات النقدية', titleEn: 'Cash flow essentials', durationMin: 22 },
      { id: 'fi-5', titleAr: 'مؤشرات الأداء المالي', titleEn: 'Key financial ratios', durationMin: 16 },
    ],
  },
  {
    id: 'iso-9001',
    titleAr: 'مدقق داخلي آيزو ٩٠٠١',
    titleEn: 'ISO 9001 Internal Auditor',
    instructorAr: 'م. هند المطيري',
    instructorEn: 'Eng. Hind Al-Mutairi',
    instructorTitleAr: 'مدققة جودة معتمدة',
    instructorTitleEn: 'Certified quality auditor',
    descriptionAr:
      'تأهّل كمدقق داخلي لأنظمة إدارة الجودة ISO 9001:2015 مع تطبيقات عملية للشركات في الكويت والخليج.',
    descriptionEn:
      'Qualify as an internal auditor for ISO 9001:2015 quality management systems with practical applications for Kuwait and GCC companies.',
    category: 'iso',
    durationHours: 12,
    lessonCount: 16,
    priceKwd: 22,
    rating: 4.9,
    students: 720,
    isNew: true,
    featured: true,
    gradient: 'from-[#1A3A5C] to-[#4A7C59]',
    icon: 'BadgeCheck',
    lessons: [
      { id: 'iso-1', titleAr: 'مقدمة في أنظمة الجودة', titleEn: 'Intro to quality systems', durationMin: 16, freePreview: true },
      { id: 'iso-2', titleAr: 'متطلبات ISO 9001:2015', titleEn: 'ISO 9001:2015 requirements', durationMin: 25, freePreview: true },
      { id: 'iso-3', titleAr: 'تخطيط التدقيق الداخلي', titleEn: 'Planning the internal audit', durationMin: 20 },
      { id: 'iso-4', titleAr: 'تنفيذ التدقيق', titleEn: 'Conducting the audit', durationMin: 28 },
      { id: 'iso-5', titleAr: 'كتابة التقرير والمتابعة', titleEn: 'Reporting & follow-up', durationMin: 22 },
      { id: 'iso-6', titleAr: 'محاكاة تدقيق كاملة', titleEn: 'Full audit simulation', durationMin: 35 },
    ],
  },
  {
    id: 'grad-ready',
    titleAr: 'جاهزية الخريجين لسوق العمل الخليجي',
    titleEn: 'Graduate Readiness for the GCC Job Market',
    instructorAr: 'أ. مشعل العجمي',
    instructorEn: 'Mishal Al-Ajmi',
    instructorTitleAr: 'مدرب تطوير مهني',
    instructorTitleEn: 'Career development coach',
    descriptionAr:
      'من السيرة الذاتية إلى مقابلة العمل — مهارات عملية للخريجين الجدد لدخول سوق العمل في الكويت ودول الخليج بثقة.',
    descriptionEn:
      'From CV to interview — practical skills for new graduates entering the Kuwait and GCC job market with confidence.',
    category: 'graduate',
    durationHours: 5,
    lessonCount: 9,
    priceKwd: 8,
    rating: 4.6,
    students: 2100,
    isNew: true,
    gradient: 'from-[#2C3E50] to-[#E67E22]',
    icon: 'GraduationCap',
    lessons: [
      { id: 'gr-1', titleAr: 'توقعات سوق العمل', titleEn: 'Job market expectations', durationMin: 12, freePreview: true },
      { id: 'gr-2', titleAr: 'بناء سيرة ذاتية احترافية', titleEn: 'Building a professional CV', durationMin: 18, freePreview: true },
      { id: 'gr-3', titleAr: 'مهارات المقابلة', titleEn: 'Interview skills', durationMin: 22 },
      { id: 'gr-4', titleAr: 'التواصل في بيئة العمل', titleEn: 'Workplace communication', durationMin: 16 },
    ],
  },
  {
    id: 'sales-b2b',
    titleAr: 'المبيعات المؤسسية في الخليج',
    titleEn: 'B2B Sales in the Gulf',
    instructorAr: 'أ. طارق الحسن',
    instructorEn: 'Tariq Al-Hassan',
    instructorTitleAr: 'مدير مبيعات إقليمي سابق',
    instructorTitleEn: 'Former regional sales director',
    descriptionAr:
      'استراتيجيات بيع مؤسسي مبنية على علاقات طويلة الأمد — مناسبة لقطاعات النفط والخدمات والتمويل في المنطقة.',
    descriptionEn:
      'Institutional sales strategies built on long-term relationships — suited to oil, services, and finance sectors in the region.',
    category: 'sales',
    durationHours: 7,
    lessonCount: 11,
    priceKwd: 14,
    rating: 4.7,
    students: 890,
    featured: true,
    gradient: 'from-[#0B2545] to-[#C0392B]',
    icon: 'TrendingUp',
    lessons: [
      { id: 'sa-1', titleAr: 'ثقافة البيع في الخليج', titleEn: 'Gulf sales culture', durationMin: 15, freePreview: true },
      { id: 'sa-2', titleAr: 'بناء الثقة مع العميل', titleEn: 'Building client trust', durationMin: 18, freePreview: true },
      { id: 'sa-3', titleAr: 'إدارة دورة البيع', titleEn: 'Managing the sales cycle', durationMin: 22 },
      { id: 'sa-4', titleAr: 'التفاوض والإغلاق', titleEn: 'Negotiation & closing', durationMin: 24 },
    ],
  },
  {
    id: 'lead-women',
    titleAr: 'تمكين القيادات النسائية',
    titleEn: 'Women in Leadership',
    instructorAr: 'د. منيرة الفهد',
    instructorEn: 'Dr. Munira Al-Fahad',
    instructorTitleAr: 'باحثة في القيادة التنظيمية',
    instructorTitleEn: 'Organizational leadership researcher',
    descriptionAr:
      'برنامج لتطوير المهارات القيادية للمرأة في بيئات العمل الخليجية، مع التركيز على التأثير، الرؤية، والتوازن المهني.',
    descriptionEn:
      'A leadership development program for women in GCC workplaces, focusing on influence, vision, and professional balance.',
    category: 'leadership',
    durationHours: 6,
    lessonCount: 10,
    priceKwd: 15,
    rating: 4.8,
    students: 640,
    isNew: true,
    gradient: 'from-[#4A1942] to-[#13A89E]',
    icon: 'Users',
    lessons: [
      { id: 'lw-1', titleAr: 'القيادة والتأثير', titleEn: 'Leadership & influence', durationMin: 14, freePreview: true },
      { id: 'lw-2', titleAr: 'بناء الحضور القيادي', titleEn: 'Building executive presence', durationMin: 18, freePreview: true },
      { id: 'lw-3', titleAr: 'التفاوض والأجور', titleEn: 'Negotiation & compensation', durationMin: 20 },
      { id: 'lw-4', titleAr: 'شبكات الدعم المهني', titleEn: 'Professional support networks', durationMin: 16 },
    ],
  },
  {
    id: 'hr-performance',
    titleAr: 'إدارة الأداء والتقييم السنوي',
    titleEn: 'Performance Management & Annual Reviews',
    instructorAr: 'أ. بدر الياسين',
    instructorEn: 'Bader Al-Yaseen',
    instructorTitleAr: 'مدير موارد بشرية',
    instructorTitleEn: 'HR director',
    descriptionAr:
      'صمّم نظام تقييم أداء عادل وواضح يربط الأهداف الفردية بأهداف المؤسسة — مع نماذج قابلة للتطبيق فوراً.',
    descriptionEn:
      'Design a fair, clear performance review system that links individual goals to organizational objectives — with ready-to-use templates.',
    category: 'hr',
    durationHours: 5,
    lessonCount: 8,
    priceKwd: 12,
    rating: 4.5,
    students: 510,
    gradient: 'from-[#1E3A5F] to-[#5B8A72]',
    icon: 'UserCog',
    lessons: [
      { id: 'hp-1', titleAr: 'أهداف SMART', titleEn: 'SMART goals', durationMin: 12, freePreview: true },
      { id: 'hp-2', titleAr: 'جلسات التقييم الفعّالة', titleEn: 'Effective review conversations', durationMin: 18, freePreview: true },
      { id: 'hp-3', titleAr: 'التغذية الراجعة المستمرة', titleEn: 'Continuous feedback', durationMin: 16 },
      { id: 'hp-4', titleAr: 'ربط الأداء بالمكافآت', titleEn: 'Linking performance to rewards', durationMin: 20 },
    ],
  },
  {
    id: 'fin-budget',
    titleAr: 'إعداد الميزانيات التشغيلية',
    titleEn: 'Operational Budgeting',
    instructorAr: 'أ. ريم الخالد',
    instructorEn: 'Reem Al-Khaled',
    instructorTitleAr: 'مديرة مالية',
    instructorTitleEn: 'Finance manager',
    descriptionAr:
      'تعلّم بناء ميزانية تشغيلية واقعية، متابعة الانحرافات، وتقديم تقارير للإدارة العليا بأسلوب واضح ومقنع.',
    descriptionEn:
      'Learn to build a realistic operating budget, track variances, and present clear reports to senior management.',
    category: 'finance',
    durationHours: 7,
    lessonCount: 11,
    priceKwd: 14,
    rating: 4.6,
    students: 430,
    gradient: 'from-[#0B3D2E] to-[#13A89E]',
    icon: 'Wallet',
    lessons: [
      { id: 'fb-1', titleAr: 'مكونات الميزانية', titleEn: 'Budget components', durationMin: 14, freePreview: true },
      { id: 'fb-2', titleAr: 'التقدير والتنبؤ', titleEn: 'Estimating & forecasting', durationMin: 20, freePreview: true },
      { id: 'fb-3', titleAr: 'تحليل الانحرافات', titleEn: 'Variance analysis', durationMin: 18 },
      { id: 'fb-4', titleAr: 'عرض الميزانية للإدارة', titleEn: 'Presenting budgets to leadership', durationMin: 16 },
    ],
  },
  {
    id: 'iso-14001',
    titleAr: 'أساسيات الآيزو ١٤٠٠١ للبيئة',
    titleEn: 'ISO 14001 Environmental Essentials',
    instructorAr: 'م. يوسف الحربي',
    instructorEn: 'Eng. Yousef Al-Harbi',
    instructorTitleAr: 'استشاري بيئة',
    instructorTitleEn: 'Environmental consultant',
    descriptionAr:
      'مقدمة عملية لأنظمة الإدارة البيئية ISO 14001 وتطبيقاتها في المؤسسات الصناعية والخدمية بالمنطقة.',
    descriptionEn:
      'A practical introduction to ISO 14001 environmental management systems and their application in regional industrial and service organizations.',
    category: 'iso',
    durationHours: 8,
    lessonCount: 12,
    priceKwd: 16,
    rating: 4.7,
    students: 280,
    isNew: true,
    gradient: 'from-[#1B4332] to-[#52B788]',
    icon: 'BadgeCheck',
    lessons: [
      { id: 'ie-1', titleAr: 'لماذا الإدارة البيئية؟', titleEn: 'Why environmental management?', durationMin: 12, freePreview: true },
      { id: 'ie-2', titleAr: 'متطلبات ISO 14001', titleEn: 'ISO 14001 requirements', durationMin: 22, freePreview: true },
      { id: 'ie-3', titleAr: 'تحديد الجوانب البيئية', titleEn: 'Identifying environmental aspects', durationMin: 20 },
      { id: 'ie-4', titleAr: 'خطة التحسين المستمر', titleEn: 'Continual improvement plan', durationMin: 18 },
    ],
  },
]

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function formatPrice(kwd: number, lang: 'ar' | 'en'): string {
  if (lang === 'ar') {
    const eastern = String(kwd).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])
    return `${eastern} د.ك`
  }
  return `${kwd} KWD`
}

export function formatNumber(n: number, lang: 'ar' | 'en'): string {
  if (lang === 'ar') {
    return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])
  }
  return String(n)
}
