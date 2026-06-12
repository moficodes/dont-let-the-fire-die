import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel, Share_Tech_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { getCampaignData } from "@/lib/data";
import { getThemeStyles } from "@/lib/themes";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const data = getCampaignData();
  const header = data.home.header;
  return {
    title: header?.title || "Sablewood Chronicles",
    description: header?.description || "A Living Chronicle",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getCampaignData();
  const navBrand = data.home.header?.navBrand || "Sablewood";
  
  // Dynamic Settings
  const settings = data.settings || { gameSystem: "daggerheart", themePreset: "fantasy-parchment" };
  const themePreset = settings.themePreset || "fantasy-parchment";
  
  // Resolve Font variable based on preset
  let activeFontVar = "var(--font-plus-jakarta)";
  if (themePreset === "gothic-horror" || themePreset === "heroic") {
    activeFontVar = "var(--font-cinzel)";
  } else if (themePreset === "cyberpunk" || themePreset === "gritty") {
    activeFontVar = "var(--font-share-tech-mono)";
  } else if (themePreset === "space-scifi") {
    activeFontVar = "var(--font-orbitron)";
  }

  // Get CSS String with inline overrides
  const themeStyles = getThemeStyles(themePreset, settings.customTheme);
  const fontOverride = `
    :root, .dark {
      --font-active: ${activeFontVar};
    }
  `;

  const backgrounds = settings.backgrounds;

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cinzel.variable} ${shareTechMono.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyles + fontOverride }} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface relative">
        {backgrounds?.global && (
          <div 
            className="fixed inset-0 -z-50 bg-cover bg-center pointer-events-none opacity-10 mix-blend-multiply dark:mix-blend-overlay"
            style={{ backgroundImage: `url(${backgrounds.global})` }}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar brand={navBrand} />
          <main className="flex-grow">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
