import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="mx-auto min-h-screen max-w-3xl px-6 py-24 lg:py-32">
        {children}
      </div>

      <Footer />
    </>
  );
}
