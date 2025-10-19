# NextGen Studio Tools

> AI-Powered Creative Studio for Content Creators

## 🌟 Overview

**NextGen Studio Tools** is a professional, futuristic web application that helps content creators, YouTubers, and artists generate creative ideas, scripts, titles, and tags instantly using Google Gemini AI.

Built by **Vanshu** (Developer) as part of **Nextup Studio**.

## ✨ Features

- **AI-Powered Content Generation**: Leverages Google Gemini AI to create:
  - Video scripts (short-form and long-form)
  - Catchy titles and descriptions
  - SEO-optimized tags and hashtags
  - Thumbnail caption ideas

- **Customization Options**:
  - Choose content tone (funny, emotional, cinematic, motivational, educational)
  - Select platform (YouTube, Shorts, Instagram, TikTok)

- **User-Friendly Features**:
  - One-click copy to clipboard
  - Save ideas to local storage
  - Beautiful iOS-inspired interface
  - Fully responsive and mobile-friendly

## 🎨 Design

- **Modern UI**: iOS-inspired design with glassmorphism and blur effects
- **Color Scheme**: Electric teal (#00bcd4) accents on deep space dark background
- **Animations**: Smooth transitions, fade-ins, and loading states
- **Typography**: Clean, professional hierarchy

## 🚀 Usage

1. **Enter Your Idea**: Describe your content concept (e.g., "Minecraft funny short")
2. **Choose Options**: Select tone and target platform
3. **Generate**: Click "Generate Ideas" and let AI create your content
4. **Copy & Save**: Use copy buttons for each section or save to local storage

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **AI**: Google Gemini 2.5 Flash via Lovable AI Gateway
- **Storage**: Local Storage for saved ideas

## 📦 Setup

This project is built with Lovable and uses Lovable Cloud for backend services.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Variables

Environment variables are automatically configured via Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The AI API key (`LOVABLE_API_KEY`) is pre-configured in the backend.

## 📝 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with branding
│   ├── GeneratorForm.tsx       # Input form with options
│   ├── ResultsDisplay.tsx      # Display generated content
│   └── AboutSection.tsx        # About and creator info
├── pages/
│   └── Index.tsx               # Main application page
└── index.css                   # Design system & tokens

supabase/
└── functions/
    └── generate-content/       # AI content generation endpoint
```

## 🌐 SEO Optimization

- Semantic HTML structure
- Optimized meta tags and descriptions
- Custom favicon
- Fast loading with lazy loading
- Mobile-first responsive design

## 💡 Future Enhancements

- User accounts and cloud storage
- Content history and analytics
- Batch generation
- Export to various formats
- Team collaboration features

## 📄 License

© 2025 Nextup Studio — Powered by Gemini AI

---

## 👨‍💻 About the Creator

**Nextgen AI** was created by **Vanshu**, a developer passionate about empowering content creators with AI-powered tools.

For questions or support, please reach out through the application.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Powered by Google Gemini AI
- UI components from [shadcn/ui](https://ui.shadcn.com)
