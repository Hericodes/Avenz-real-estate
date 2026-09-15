import {
  FinalCTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  ProblemSection,
  ProductPreview,
  TeammateSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <TeammateSection />
        <HowItWorks />
        <ProductPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
