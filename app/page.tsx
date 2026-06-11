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

export default function Home() {
  return (
    <>
      <PageIntro />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Process />
        <Story />
        <Signatures />
        <Menu />
        <FilmStrip />
        <OrderCTA />
        <Reviews />
        <BusyNow />
        <Catering />
        <Location />
        <Instagram />
      </main>
      <Footer />
      <MobileOrderBar />
      <CartDrawer />
    </>
  );
}
