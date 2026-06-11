import Nav from "@/components/Nav";
import PageIntro from "@/components/PageIntro";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Story from "@/components/Story";
import Signatures from "@/components/Signatures";
import Menu from "@/components/Menu";
import FilmStrip from "@/components/FilmStrip";
import OrderCTA from "@/components/OrderCTA";
import Reviews from "@/components/Reviews";
import BusyNow from "@/components/BusyNow";
import Catering from "@/components/Catering";
import Location from "@/components/Location";
import Instagram from "@/components/Instagram";
import Footer from "@/components/Footer";
import MobileOrderBar from "@/components/MobileOrderBar";
import CartDrawer from "@/components/CartDrawer";
import BuildScrub from "@/components/BuildScrub";
import Hud from "@/components/Hud";

export default function Home() {
  return (
    <>
      <PageIntro />
      <Nav />
      <main>
        {/* Act I — dark drama */}
        <Hero />
        <Marquee />

        {/* Act II — the warm bakery morning, on deli paper */}
        <div className="paper-act">
          <Process />
          <Story />
          <Signatures />
          <Menu />
        </div>

        {/* Act III — dark photo + data act */}
        <FilmStrip />
        <BuildScrub />
        <OrderCTA />
        <Reviews />
        <BusyNow />

        {/* Act IV — paper returns for the practical pages */}
        <div className="paper-act">
          <Catering />
          <Location />
        </div>

        {/* Close dark */}
        <Instagram />
      </main>
      <Footer />
      <MobileOrderBar />
      <CartDrawer />
      <Hud />
    </>
  );
}
