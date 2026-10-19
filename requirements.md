# Task
Build a complete, ready-to-deploy website for **Recipe Secrets**, a Malaysian
Chinese restaurant serving classic hawker and home-style dishes (think wok hei,
family recipes, kopitiam warmth). The goal is to make visitors hungry and get
them to book a table.

# Tech constraints
- Plain HTML5, CSS3 and vanilla JavaScript only. No frameworks, no build step,
  no server-side code.
- Must run as static files on free hosting (GitHub Pages / Netlify / Vercel).
- One shared `styles.css` and one `script.js`; each page is its own `.html` file.
- Relative links only, so the site works from any folder or subpath.

# Pages (exactly 5)
1. **Home** (`index.html`): full-width hero image of a sizzling wok or a spread
   of dishes, with headline, tagline and "Book a Table" button; short intro on
   our Malaysian Chinese heritage; 3 signature dishes; testimonials; opening
   hours; footer.
2. **About** (`about.html`): the family story (recipes passed down from
   Penang / KL / Ipoh hawker stalls), chef profile, philosophy (wok hei, fresh
   ingredients, recipes cooked the old way), photos of the kitchen and interior.
3. **Specials** (`specials.html`): this week's specials as cards (image, name,
   short description, price, spice-level indicator 🌶️), grouped into:
   - Noodles & Rice: e.g. Penang Char Kway Teow, Hokkien Mee (KL dark style),
     Hainanese Chicken Rice, Wantan Mee, Claypot Chicken Rice
   - Soups & Curries: e.g. Bak Kut Teh, Curry Laksa, Assam Laksa
   - Zi Char: e.g. Butter Prawns, Salted Egg Squid, Kam Heong Lala, Sambal Kangkung
   - Desserts & Drinks: e.g. Cendol, Ais Kacang, Teh Tarik, Kopi O, Kaya Toast
4. **Reservation** (`reservation.html`): booking form with name, phone, email,
   date, time, number of guests, occasion (birthday, family gathering, Chinese
   New Year dinner, business), special requests. Client-side validation (no past
   dates, guests 1–20, valid email/phone).
5. **Contact** (`contact.html`): address, phone, email, hours, embedded Google
   Map (iframe), and a short contact form.

# Forms (no backend available)
Submit both forms via **Formspree** (placeholder action
`https://formspree.io/f/YOUR_FORM_ID`). Show a friendly success message on submit.
Add an HTML comment explaining how to swap in a real form ID.

# Design direction
- Feel: modern take on a heritage kopitiam / old shophouse. Warm, nostalgic,
  welcoming; not a generic "Asian restaurant" template.
- Palette: lacquer red and gold accents, deep wok-black for contrast, warm cream
  base, a touch of jade or Peranakan teal.
- Subtle motifs: Peranakan tile pattern as section dividers or background
  texture (built in CSS/SVG, not images), lantern or steam accents used sparingly.
- Fonts from Google Fonts: an elegant serif for headings (e.g. Playfair Display),
  a clean sans-serif for body (e.g. Inter). Dish names can show the Chinese name
  underneath in a CJK-friendly font (e.g. Noto Serif SC), e.g. "Char Kway Teow 炒粿条".
- Large, high-quality food photography is the star. Generous whitespace, rounded
  image corners, subtle hover zoom on food images, smooth scroll, gentle fade-in
  on scroll.
- Sticky header with logo text and nav; highlight the current page; hamburger
  menu on mobile.
- Mobile-first and fully responsive (360px phones up to wide desktops).

# Images
- Use free-to-use photos from Unsplash via direct image URLs
  (`https://images.unsplash.com/...`), matched to each dish where possible
  (noodles, laksa, chicken rice, wok cooking, kopitiam interiors).
- If an exact dish photo isn't available, use the closest Malaysian/Chinese
  food photo rather than an unrelated cuisine.
- Every image needs descriptive `alt` text, `loading="lazy"` (except the hero),
  and explicit width/height to avoid layout shift.
- Add a comment listing each image URL so I can replace them with my own photos later.

# Quality bar
- Semantic HTML, accessible colour contrast, keyboard-navigable menu and forms.
- Each page has its own `<title>` and meta description for SEO (include phrases
  like "Malaysian Chinese restaurant", "char kway teow", "bak kut teh").
- No console errors; no broken links.

# Placeholder content
Where I haven't given details, use realistic placeholder text and mark it with
- 742 Jalan Besi, Bunton, +6588888888, shamwairock@gmail.com, 24 Hours
- Sham Wain Rock
- Prices (use [SGD])

# Deliverables
1. All files, each in its own code block with the filename as the heading.
2. Folder structure.
3. Short steps to deploy on GitHub Pages and Netlify.