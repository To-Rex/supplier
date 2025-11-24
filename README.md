# Torex - Professional Web Platform

Zamonaviy, yuqori samarali va foydalanuvchilarga qulay korporativ veb-platforma. React, TypeScript, Tailwind CSS va Supabase texnologiyalari asosida qurilgan.

## Asosiy Xususiyatlar

### Frontend
- **React 18** - Zamonaviy UI komponentlari
- **TypeScript** - Tip xavfsizligi
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Tez development server va build tool
- **React Router** - SPA routing
- **Lucide React** - Zamonaviy ikonlar kutubxonasi

### Backend & Database
- **Supabase** - PostgreSQL ma'lumotlar bazasi
- **Row Level Security (RLS)** - Ma'lumotlar xavfsizligi
- **Real-time subscriptions** - Jonli yangilanishlar

### Dizayn Xususiyatlari
- Minimalistik va professional interfeys
- Light va Dark theme qo'llab-quvvatlash
- To'liq responsive dizayn (mobile, tablet, desktop)
- Silliq animatsiyalar va o'tishlar
- Optimallashtirilgan performance

## Loyiha Tuzilmasi

```
├── src/
│   ├── components/          # UI komponentlari
│   │   ├── About.tsx       # Kompaniya haqida
│   │   ├── Blog.tsx        # Blog bo'limi
│   │   ├── Contact.tsx     # Bog'lanish formasi
│   │   ├── Footer.tsx      # Sahifa footer
│   │   ├── Header.tsx      # Navigatsiya header
│   │   ├── Hero.tsx        # Bosh sahifa hero
│   │   ├── Portfolio.tsx   # Portfolio ko'rsatish
│   │   ├── Services.tsx    # Xizmatlar ro'yxati
│   │   └── admin/          # Admin panel komponentlari
│   │
│   ├── pages/              # Sahifalar
│   │   ├── AdminLogin.tsx  # Admin kirish
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── admin/          # Admin panel sahifalari
│   │       ├── Dashboard.tsx
│   │       ├── TeamManagement.tsx
│   │       ├── PortfolioManagement.tsx
│   │       └── ContactMessages.tsx
│   │
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Autentifikatsiya
│   │   └── ThemeContext.tsx # Theme boshqaruvi
│   │
│   ├── lib/                # Kutubxonalar
│   │   └── supabase.ts     # Supabase client
│   │
│   └── utils/              # Yordamchi funksiyalar
│
├── supabase/
│   └── migrations/         # Database migratsiyalari
│
└── public/                 # Statik fayllar
```

## O'rnatish

### Talablar
- Node.js 18+
- npm yoki yarn

### Qadamlar

1. **Repozitoriyani klonlash**
```bash
git clone <repository-url>
cd project
```

2. **Dependencies o'rnatish**
```bash
npm install
```

3. **Environment o'zgaruvchilari**

`.env` faylini yarating va quyidagi ma'lumotlarni qo'shing:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Development server ishga tushirish**
```bash
npm run dev
```

Brauzerda `http://localhost:5173` manziliga o'ting.

## Scriptlar

```bash
npm run dev      # Development server ishga tushirish
npm run build    # Production build yaratish
npm run preview  # Production build preview
npm run lint     # Code linting
```

## Database Tuzilmasi

### Asosiy Jadvallar

#### `team_members`
Jamoa a'zolari ma'lumotlari:
- Ism, lavozim, bio
- Avatar va ijtimoiy tarmoq havolalari
- SEO optimizatsiya maydonlari

#### `portfolio`
Portfolio loyihalari:
- Loyiha nomi, tavsif, kategoriya
- Texnologiyalar ro'yxati
- Rasm URL va havolalar
- Display order

#### `contact_messages`
Foydalanuvchilardan kelgan xabarlar:
- Ism, email, telefon
- Mavzu va xabar matni
- Status (new, read, replied)

#### `contact_info`
Kompaniya kontakt ma'lumotlari:
- Telefon, email
- Manzil va ish vaqti

#### `admin_users`
Admin foydalanuvchilar:
- Email va rol
- Oxirgi kirish vaqti

#### `analytics`
Veb-sayt analitikasi:
- Sahifa ko'rishlari
- Event tracking
- User agent va IP ma'lumotlari

## Xavfsizlik

### Row Level Security (RLS)
Barcha jadvallar uchun RLS yoqilgan:
- Foydalanuvchilar faqat o'z ma'lumotlariga kirish huquqiga ega
- Admin panelga faqat autentifikatsiya qilingan adminlar kiradi
- Public ma'lumotlar anonymous foydalanuvchilarga ochiq

### Authentication
- Supabase Auth orqali email/password autentifikatsiya
- Protected routes admin panel uchun
- Session management

## Admin Panel

Admin panel quyidagi funksiyalarni qo'llab-quvvatlaydi:

- **Dashboard** - Umumiy statistika va tezkor ko'rinish
- **Team Management** - Jamoa a'zolarini boshqarish
- **Portfolio Management** - Loyihalarni qo'shish/tahrirlash
- **Contact Messages** - Foydalanuvchi xabarlarini ko'rish
- **User Management** - Admin foydalanuvchilarni boshqarish

Admin panelga kirish: `/admin/login`

## Performance Optimizatsiyalar

- Lazy loading komponentlari
- Image optimizatsiya
- Code splitting
- Minimal bundle size
- CSS optimizatsiya
- Intersection Observer animatsiyalar uchun

## SEO

- Meta tags har bir sahifa uchun
- Open Graph va Twitter Card qo'llab-quvvatlash
- Sitemap va robots.txt
- Semantic HTML
- Accessibility (ARIA labels)

## Browser Support

- Chrome (oxirgi 2 versiya)
- Firefox (oxirgi 2 versiya)
- Safari (oxirgi 2 versiya)
- Edge (oxirgi 2 versiya)

## Deployment

### Build yaratish
```bash
npm run build
```

Build `dist/` papkasida yaratiladi.

### Tavsiya etiladigan hosting platformalar
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## Contributing

Pull requestlar xush kelibsiz! Katta o'zgarishlar uchun avval issue oching.

## License

[MIT](LICENSE)

## Muallif

Torex - [Website](https://torex-it.uz)

## Qo'llab-quvvatlash

Muammolar yoki savollar uchun:
- Email: support@torex-it.uz
- Telegram: @torex_it
