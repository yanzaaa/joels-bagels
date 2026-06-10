export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Joel&apos;s Bagels</div>
            <p className="footer-tagline">
              Medford&apos;s bagel shop since day one. Ecuadorian family recipe.
              Long Island&apos;s favorite morning.
            </p>
            <p className="footer-address">
              1699 Route 112 · Medford NY 11763
            </p>
          </div>

          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.doordash.com/store/1144158"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on DoorDash →
                </a>
              </li>
              <li>
                <a href="#menu">See the Menu</a>
              </li>
              <li>
                <a href="#catering">Catering Inquiry</a>
              </li>
              <li>
                <a href="#find-us">Find Us</a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/joelsbagelscafe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @joelsbagelscafe
                </a>
              </li>
              <li>
                <a href="tel:+16313079206">(631) 307-9206</a>
              </li>
            </ul>
          </div>

          <div className="footer-hours">
            <div className="footer-heading">Open Daily</div>
            <p>Mon – Sat: 6 AM – 3 PM</p>
            <p>Sun: 7 AM – 2 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Joel&apos;s Bagels · Medford, NY</span>
          <span>Made with ♥ on Long Island</span>
        </div>
      </div>
    </footer>
  )
}
