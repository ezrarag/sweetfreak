# Sweet Freak & Jollies 🍭🍹

A vibrant, QR-driven marketing website for a mother-daughter business specializing in candied fruits and adult drinks with Jolly Rancher twists.

## Features ✨

- **QR Code Integration**: Dynamic QR routes for different landing pages
- **Responsive Design**: Mobile-first design with candy-themed aesthetics
- **Interactive Components**: Animated sections with Framer Motion
- **Admin Panel**: QR code generation and management
- **Contact Forms**: Order placement and customer communication
- **Product Gallery**: Showcase of candied fruits and adult drinks

## Tech Stack 🛠️

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **QRCode** library for QR generation

## Getting Started 🚀

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## QR Code Routes 📱

- `/qr/menu` - Direct customers to the menu
- `/qr/order` - Direct customers to place orders
- `/qr/about` - Direct customers to learn about the business

## Admin Panel 🔧

Access the admin panel at `/admin` to:
- Generate QR codes for different routes
- Download QR code images
- Configure base URLs
- Test QR code functionality

## Project Structure 📁

```
src/
├── app/
│   ├── admin/           # Admin panel for QR generation
│   ├── qr/[id]/         # Dynamic QR landing pages
│   ├── globals.css      # Global styles with candy theme
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── Hero.tsx         # Hero section with QR code
│   ├── About.tsx        # About section
│   ├── Menu.tsx         # Product menu with tabs
│   ├── Gallery.tsx      # Product gallery
│   ├── Contact.tsx      # Contact form and methods
│   └── QRGenerator.tsx   # QR code generation component
├── data/
│   └── products.ts       # Product data and types
└── lib/
    └── qr.ts           # QR code utility functions
```

## Customization 🎨

### Colors
The site uses a candy-themed color palette defined in `globals.css`:
- Pink: `#ff69b4`
- Purple: `#9370db`
- Green: `#98fb98`
- Yellow: `#ffff00`
- Blue: `#87ceeb`
- Orange: `#ffa500`

### Products
Update product information in `src/data/products.ts`:
- Add new candied fruits
- Add new adult drink flavors
- Modify prices and descriptions

### QR Codes
- Update base URL in admin panel
- Add new QR routes in `src/app/qr/[id]/page.tsx`
- Customize QR code appearance in `src/lib/qr.ts`

## Deployment 🚀

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (recommended):
   ```bash
   npx vercel
   ```

3. **Update QR codes**:
   - Update base URL in admin panel
   - Regenerate QR codes with production URL
   - Download and print for marketing materials

## Marketing Integration 📢

### QR Code Usage
1. Generate QR codes from the admin panel
2. Download PNG images
3. Add to flyers, business cards, menus
4. Customers scan to access specific pages

### Social Media
- Instagram: `@sweetfreakjollies`
- WhatsApp: Direct messaging for orders
- Phone: `(123) 456-7890`

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is licensed under the MIT License.

---

**Sweet Freak & Jollies** - Bringing you the sweetest treats and most refreshing drinks! 🍭🍹