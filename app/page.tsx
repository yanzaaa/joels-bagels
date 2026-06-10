import Nav from "@/components/Nav";
import KnicksBanner from "@/components/KnicksBanner";
import PageIntro from "@/components/PageIntro";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Signatures from "@/components/Signatures";
import Menu from "@/components/Menu";
import OrderCTA from "@/components/OrderCTA";
import Reviews from "@/components/Reviews";
import Catering from "@/components/Catering";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import Instagram from "@/components/Instagram";
import Footer from "@/components/Footer";
import MobileOrderBar from "@/components/MobileOrderBar";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <PageIntro />
      <Nav />
      <main>
        <KnicksBanner />
        <Hero />
        <SectionDivider />
        <Marquee />
        <About />
        <SectionDivider />
        <Signatures />
        <SectionDivider />
        <Menu />
        <SectionDivider />
        <OrderCTA />
        <SectionDivider />
        <Reviews />
        <SectionDivider />
        <Catering />
        <FAQ />
        <SectionDivider />
        <Location />
        <SectionDivider />
        <Instagram />
      </main>
      <SectionDivider />
      <Footer />
      <MobileOrderBar />
    </>
  );
}
