import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocSection } from '@/components/DocSection';
import { OtpPlayground } from '@/features/playground/OtpPlayground';
import { docsContent } from '@/docs/docsContent';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'platform-limitations', label: 'Platform & Limitations' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'otp-detection', label: 'OTP Detection' },
    { id: 'regex-logic', label: 'Regex & Extraction' },
    { id: 'kotlin-code', label: 'Kotlin Code' },
    { id: 'ui-screens', label: 'UI Screens' },
    { id: 'compliance', label: 'Play Store Compliance' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'playground', label: 'OTP Playground' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">OTP Auto Copy</h1>
              <p className="text-xs text-muted-foreground">Android Security Documentation</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="container flex-1">
        <div className="flex gap-8 py-8">
          {/* Sidebar Navigation */}
          <aside
            className={`${
              mobileMenuOpen ? 'block' : 'hidden'
            } md:block fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 shrink-0 bg-background md:bg-transparent border-r md:border-0 border-border`}
          >
            <ScrollArea className="h-full py-6 pr-6 pl-6 md:pl-0">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl space-y-12">
              {docsContent.map((section, index) => (
                <div key={section.id}>
                  <DocSection section={section} />
                  {index < docsContent.length - 1 && <Separator className="mt-12" />}
                </div>
              ))}

              <Separator className="mt-12" />

              {/* OTP Playground */}
              <div id="playground">
                <OtpPlayground />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-24 border-t border-border pt-8 pb-12">
              <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
                <p>
                  © 2026. Built with love using{' '}
                  <a
                    href="https://caffeine.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline font-medium"
                  >
                    caffeine.ai
                  </a>
                </p>
                <p className="max-w-2xl">
                  This documentation is for educational purposes. Always follow Google Play Store policies and
                  consult legal counsel for compliance requirements.
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
