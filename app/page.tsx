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
        {/* Scene 1 — cinematic 3D morning stage */}
        <Hero />
        <Marquee />

        {/* Scene 2 — prep table before sunrise (deli paper) */}
        <div className="paper-act">
          <Process />
        </div>

        {/* Scene 3 — inside the shop, warm lamplight */}
        <div className="warm-room">
          <Story />
        </div>

        {/* Scene 4 — white product gallery */}
        <div className="paper-act product-gallery">
          <Signatures />
        </div>

        {/* Scene 5 — the glass deli case (light sage) */}
        <div className="paper-act menu-light">
          <Menu />
        </div>

        {/* Scene 6 — centerpiece: the customer photo wall */}
        <div className="photo-world">
          <FilmStrip />
          <Instagram />
        </div>

        {/* Scene 7 — the Saturday Order build */}
        <BuildScrub />

        {/* Scene 8 — clean DoorDash handoff */}
        <div className="order-light" id="order-zone">
          <OrderCTA />
        </div>

        {/* Scene 9 — corkboard by the register */}
        <div className="reviews-cork">
          <Reviews />
        </div>

        {/* Scene 10 — the clean order sheet */}
        <div className="paper-act order-sheet">
          <Catering />
        </div>

        {/* Scene 11 — local intel, right before you plan the trip */}
        <BusyNow />

        {/* Scene 12 — Route 112 at dusk */}
        <div className="route-night">
          <Location />
        </div>
      </main>
      <Footer />
      <MobileOrderBar />
      <CartDrawer />
      <Hud />
    </>
  );
}
