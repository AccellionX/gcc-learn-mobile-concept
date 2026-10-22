import type { ReactNode } from 'react'
import {
  Apple,
  ArrowRight,
  Calendar,
  CreditCard,
  Database,
  Mail,
  Package,
  Shield,
  Smartphone,
  Video,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function HowWeBuild() {
  const { lang, setLang } = useApp()
  const ar = lang === 'ar'

  const copy = {
    title: ar ? 'كيف سنبنيه' : "How we'd build it",
    subtitle: ar
      ? 'مسار تقني واضح لتحويل منصتكم الحالية على Lovable إلى تطبيقي iOS و Android أصليين — دون إعادة بناء المنطق.'
      : 'A clear technical path to publish your existing Lovable React platform as native iOS and Android apps — without rebuilding platform logic.',
    packaging: ar ? 'التغليف' : 'Packaging',
    packagingBody: ar
      ? 'نغلّف تطبيق React الحالي بـ Capacitor. لا إعادة بناء لمنطق المنصة. نضيف إضافات أصلية للإشعارات الفورية (FCM / APNs) والمشتريات داخل التطبيق.'
      : 'We wrap the existing Lovable React app with Capacitor. No rebuild of platform logic. Native plugins for push (FCM/APNs) and in-app purchases.',
    purchases: ar ? 'مشتريات موحّدة' : 'Unified purchases',
    purchasesBody: ar
      ? 'حساب واحد يربط الموقع والتطبيق. الدورات تُفتح أينما سجّل المستخدم الدخول.'
      : 'One user ID links website and app. Courses unlock wherever the user signs in.',
    storeNote: ar ? 'امتثال المتاجر' : 'Store compliance',
    storeNoteBody: ar
      ? 'المشتريات الرقمية داخل التطبيق تمر عبر فوترة Apple / Google. مشتريات الموقع تُحترم عبر تسجيل الدخول، وفق قواعد المتاجر.'
      : 'In-app digital purchases go through Apple/Google billing. Website purchases are honored via sign-in, following store rules.',
    video: ar ? 'فيديو آمن' : 'Secure video',
    videoBody: ar
      ? 'Bunny Stream بروابط موقّعة/مُرمّزة وتنتهي صلاحيتها — نفس الحماية على الويب والتطبيق.'
      : 'Bunny Stream signed/tokenized URLs with expiry — the same protection on web and app.',
    newCourses: ar ? 'دورات جديدة تلقائياً' : 'New courses appear automatically',
    newCoursesBody: ar
      ? 'التطبيق يقرأ من نفس بيانات المنصة. أي دورة تُضاف على الويب تظهر في التطبيق دون تحديث المتجر.'
      : 'The app reads from the same platform data. Courses added on the web appear in the app without a store update.',
    timeline: ar ? 'الجدول الزمني' : 'Timeline',
    costs: ar ? 'تكاليف التشغيل بعد التسليم' : 'Running costs after delivery',
    contact: ar ? 'تواصل معنا' : 'Get in touch',
    footer: 'AccellionX — Ali Tariq, Co-Founder & COO',
    weeks: ar
      ? [
          { w: 'الأسبوع ١', d: 'Capacitor + RTL + مشغّل الفيديو' },
          { w: 'الأسبوع ٢', d: 'RevenueCat + صلاحيات الوصول' },
          { w: 'الأسبوع ٣', d: 'تقديم Android' },
          { w: 'الأسبوع ٤', d: 'تقديم iOS' },
          { w: 'الأسبوع ٥', d: 'احتياطي لرفض المراجعة' },
        ]
      : [
          { w: 'Week 1', d: 'Capacitor + RTL + video' },
          { w: 'Week 2', d: 'RevenueCat + entitlements' },
          { w: 'Week 3', d: 'Android submission' },
          { w: 'Week 4', d: 'iOS submission' },
          { w: 'Week 5', d: 'Buffer for review rejections' },
        ],
    costItems: ar
      ? [
          { label: 'Apple Developer', value: '٩٩ دولار / سنة' },
          { label: 'Google Play', value: '٢٥ دولار لمرة واحدة' },
          { label: 'RevenueCat', value: 'مجاني حتى حد الإيرادات' },
        ]
      : [
          { label: 'Apple Developer', value: '$99 / year' },
          { label: 'Google Play', value: '$25 one-time' },
          { label: 'RevenueCat', value: 'Free up to revenue threshold' },
        ],
  }

  return (
    <div
      className="min-h-[100dvh] overflow-y-auto bg-[#071524] text-white"
      dir={ar ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-20 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="btn-press inline-flex items-center gap-1 text-sm text-teal hover:underline"
          >
            ← {ar ? 'العودة للتطبيق' : 'Back to app'}
          </Link>
          <div className="inline-flex rounded-full bg-white/10 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`btn-press rounded-full px-3 py-1.5 font-medium ${
                lang === 'ar' ? 'bg-teal text-white' : 'text-white/60'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`btn-press rounded-full px-3 py-1.5 font-medium ${
                lang === 'en' ? 'bg-teal text-white' : 'text-white/60'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65">
          {copy.subtitle}
        </p>

        {/* Packaging */}
        <Section icon={Package} title={copy.packaging}>
          <p className="text-sm leading-relaxed text-white/70">{copy.packagingBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <Pill>Lovable React</Pill>
            <ArrowRight size={14} className="text-white/30" />
            <Pill accent>Capacitor</Pill>
            <ArrowRight size={14} className="text-white/30" />
            <Pill>
              <Apple size={12} className="inline" /> iOS
            </Pill>
            <Pill>
              <Smartphone size={12} className="inline" /> Android
            </Pill>
          </div>
        </Section>

        {/* Unified purchases diagram */}
        <Section icon={Wallet} title={copy.purchases}>
          <p className="mb-4 text-sm leading-relaxed text-white/70">{copy.purchasesBody}</p>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <FlowBox
              title={ar ? 'الموقع' : 'Website checkout'}
              items={['UPayments: KNET / Visa / Mastercard / Apple Pay', 'Taly', 'Tap / Deema']}
            />
            <div className="flex justify-center text-xs text-teal">↓ webhook</div>
            <div className="rounded-xl border border-teal/40 bg-teal/10 px-4 py-3 text-center">
              <Database size={18} className="mx-auto text-teal" />
              <p className="mt-1 text-sm font-semibold text-teal">
                Supabase · entitlements
              </p>
              <p className="text-[11px] text-white/50">
                {ar ? 'معرّف مستخدم واحد' : 'One user ID links both'}
              </p>
            </div>
            <div className="flex justify-center text-xs text-teal">↑ RevenueCat webhook</div>
            <FlowBox
              title={ar ? 'التطبيق' : 'In-app'}
              items={['Apple IAP', 'Google Play Billing']}
            />
          </div>
        </Section>

        <Section icon={Shield} title={copy.storeNote}>
          <p className="text-sm leading-relaxed text-white/70">{copy.storeNoteBody}</p>
        </Section>

        <Section icon={Video} title={copy.video}>
          <p className="text-sm leading-relaxed text-white/70">{copy.videoBody}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Pill>Bunny Stream</Pill>
            <Pill>Signed URLs</Pill>
            <Pill>{ar ? 'انتهاء صلاحية' : 'Expiry'}</Pill>
          </div>
        </Section>

        <Section icon={CreditCard} title={copy.newCourses}>
          <p className="text-sm leading-relaxed text-white/70">{copy.newCoursesBody}</p>
        </Section>

        {/* Timeline */}
        <Section icon={Calendar} title={copy.timeline}>
          <ol className="space-y-2">
            {copy.weeks.map((item, i) => (
              <li
                key={item.w}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.w}</p>
                  <p className="text-xs text-white/55">{item.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Costs */}
        <Section icon={Wallet} title={copy.costs}>
          <div className="overflow-hidden rounded-xl border border-white/10">
            {copy.costItems.map((c, i) => (
              <div
                key={c.label}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i < copy.costItems.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <span className="text-white/70">{c.label}</span>
                <span className="font-semibold text-teal">{c.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-base font-semibold text-white">{copy.footer}</p>
          <a
            href="mailto:ali@accellionx.com"
            className="btn-press mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            <Mail size={16} />
            {copy.contact}
          </a>
        </footer>
      </div>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Package
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/15">
          <Icon size={16} className="text-teal" />
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Pill({
  children,
  accent,
}: {
  children: ReactNode
  accent?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
        accent
          ? 'bg-teal/20 text-teal'
          : 'bg-white/10 text-white/80'
      }`}
    >
      {children}
    </span>
  )
}

function FlowBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-white/80">
            · {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
