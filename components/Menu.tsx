'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const DOORDASH_URL = 'https://www.doordash.com/store/1144158'

type MenuItemData = {
  name: string
  price: number | null
  popular?: boolean
  note?: string
  badge?: string
  label?: string
}

type MenuCategory = {
  label: string
  icon: string
  tagline: string
  items: MenuItemData[]
  bulk?: string
  note?: string
}

const menuData: Record<string, MenuCategory> = {
  bagels: {
    label: 'Bagels',
    icon: '🥯',
    tagline: 'Baked fresh every morning',
    items: [
      { name: 'Plain', price: 1.5 },
      { name: 'Everything', price: 1.75, popular: true },
      { name: 'Sesame', price: 1.75 },
      { name: 'Poppy Seed', price: 1.75 },
      { name: 'Salt', price: 1.75 },
      { name: 'Onion', price: 1.75 },
      { name: 'Garlic', price: 1.75 },
      { name: 'Cinnamon Raisin', price: 1.75 },
      { name: 'Pumpernickel', price: 1.75 },
      { name: 'Whole Wheat', price: 1.75 },
      { name: 'Egg', price: 1.75 },
      { name: 'Bialy', price: 2.0, note: 'Old school' },
      { name: 'Everything Asiago', price: 2.25, popular: true },
      {
        name: 'Knicks Everything Bagel',
        price: 2.25,
        badge: 'Game Day',
        note: 'Orange & blue, baked for the season',
      },
    ],
    bulk: 'Dozen from $15 · Half dozen $8.50',
  },
  cream_cheese: {
    label: 'Cream Cheeses',
    icon: '🧀',
    tagline: 'Made in-house. 20+ varieties.',
    items: [
      { name: 'Plain', price: 2.0 },
      { name: 'Olive', price: 2.5, popular: true, badge: 'Fan Favorite' },
      { name: 'Veggie', price: 2.5 },
      { name: 'Lox', price: 3.5, note: 'Premium' },
      { name: 'Strawberry', price: 2.5 },
      { name: 'Blueberry', price: 2.5 },
      { name: 'Scallion', price: 2.5 },
      { name: 'Sundried Tomato', price: 2.5 },
      { name: 'Jalapeño', price: 2.5 },
      { name: 'Honey Walnut', price: 2.75 },
      { name: 'Pesto', price: 2.75 },
      { name: 'Cinnamon Brown Sugar', price: 2.5 },
    ],
  },
  breakfast: {
    label: 'Breakfast',
    icon: '🍳',
    tagline: 'All day. Every single day.',
    items: [
      { name: 'Bacon Egg & Cheese', price: 6.5, popular: true },
      { name: 'Sausage Egg & Cheese', price: 6.5 },
      { name: 'Taylor Ham Egg & Cheese', price: 7.0, note: 'Long Island classic' },
      {
        name: 'The Brunson',
        price: 9.5,
        popular: true,
        badge: 'Game Day',
        note: 'Knicks bagel · BEC · hash brown · chipotle',
      },
      { name: 'Veggie Egg & Cheese', price: 6.0 },
      { name: 'Lox & Cream Cheese', price: 9.0 },
      { name: 'Nova Lox Platter', price: 12.0 },
      { name: 'Western Omelette', price: 7.5 },
      { name: 'French Toast', price: 5.0 },
      { name: 'Avocado Toast', price: 8.5, note: 'On toasted everything' },
    ],
  },
  deli: {
    label: 'Deli',
    icon: '🥪',
    tagline: 'Fresh deli, stacked properly.',
    items: [
      { name: 'Turkey', price: 9.0 },
      { name: 'Ham', price: 8.5 },
      { name: 'Roast Beef', price: 10.0 },
      { name: 'Tuna Salad', price: 9.0 },
      { name: 'Egg Salad', price: 8.0 },
      { name: 'Chicken Salad', price: 9.0 },
      { name: 'BLT', price: 8.5 },
      { name: 'Italian', price: 10.5, note: 'Ham · salami · provolone' },
      { name: 'Caprese', price: 9.5, note: 'Fresh mozzarella · tomato · basil' },
    ],
    note: 'All sandwiches on your choice of bagel',
  },
  platters: {
    label: 'Platters',
    icon: '🎉',
    tagline: "Feeding a crowd? We've got you.",
    items: [
      { name: 'Dozen Bagels + 2 Spreads', price: 22.0 },
      { name: 'Half Dozen + 1 Spread', price: 12.0 },
      { name: 'Bagel Platter (serves 10)', price: 45.0 },
      { name: 'Sandwich Platter (serves 10)', price: 85.0 },
      {
        name: 'Breakfast Catering',
        price: null,
        label: 'Call for pricing',
        note: 'Minimum 15 people',
      },
      {
        name: 'Office Breakfast Package',
        price: null,
        label: 'From $8/person',
        note: 'Bagels · spreads · coffee',
      },
    ],
  },
}

interface CartItem {
  name: string
  price: number
  qty: number
  category: string
}

function MenuItem({
  item,
  index,
  category,
  onAdd,
  justAdded,
}: {
  item: MenuItemData
  index: number
  category: string
  onAdd: (item: MenuItemData, category: string) => void
  justAdded: string | null
}) {
  const added = justAdded === item.name
  const clickable = Boolean(item.price)

  return (
    <motion.div
      className={`menu-item ${item.popular ? 'popular' : ''} ${
        clickable ? 'clickable' : ''
      } ${added ? 'just-added' : ''}`}
      onClick={() => clickable && onAdd(item, category)}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? `Add ${item.name} to order` : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: EASE,
      }}
    >
      <div className="menu-item-left">
        {item.popular && <span className="menu-badge popular">Popular</span>}
        {item.badge && <span className="menu-badge fan-fav">{item.badge}</span>}
        <span className="menu-item-name">{item.name}</span>
        {item.note && <span className="menu-item-note">{item.note}</span>}
      </div>
      <div className="menu-item-right">
        <span className="menu-item-price">
          {item.price ? `$${item.price.toFixed(2)}` : item.label || '—'}
        </span>
        {clickable && (
          <span className={`menu-add-btn ${added ? 'added' : ''}`} aria-hidden="true">
            {added ? '✓' : '+'}
          </span>
        )}
      </div>
    </motion.div>
  )
}

function CartDrawer({
  cart,
  cartTotal,
  onClose,
  onRemove,
  onClear,
}: {
  cart: CartItem[]
  cartTotal: number
  onClose: () => void
  onRemove: (name: string) => void
  onClear: () => void
}) {
  return (
    <>
      <motion.div
        className="cart-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="cart-drawer"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="cart-header">
          <h3>Your Order</h3>
          <button onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-cat">{item.category}</span>
              </div>
              <div className="cart-item-controls">
                <span className="cart-item-qty">×{item.qty}</span>
                <span className="cart-item-price">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.name)}
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Estimated Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <p className="cart-note">
            Final price confirmed at checkout. Prices may vary on DoorDash.
          </p>

          <a
            href={DOORDASH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cart-checkout-btn"
            onClick={onClose}
          >
            Order on DoorDash →
          </a>

          <button className="cart-clear" onClick={onClear}>
            Clear order
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default function Menu() {
  const [active, setActive] = useState('bagels')
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(
    null
  )

  // Demo cart — items collect here, checkout hands off to DoorDash
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  useEffect(() => {
    if (!justAdded) return
    const id = setTimeout(() => setJustAdded(null), 1000)
    return () => clearTimeout(id)
  }, [justAdded])

  const addToCart = (item: MenuItemData, category: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name)
      if (existing) {
        return prev.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c
        )
      }
      return [...prev, { name: item.name, price: item.price || 0, qty: 1, category }]
    })
    setJustAdded(item.name)
  }

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((c) => c.name !== name))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active]
      if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  const category = menuData[active]

  return (
    <section className="section" id="menu">
      <div className="container">
        <motion.div
          className="menu-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="eyebrow">The Menu</p>
          <h2 className="section-headline">Fresh Out of the Oven</h2>
          <p className="menu-tagline">
            Everything made daily. Nothing sits overnight. Tap an item to start
            your order.
          </p>
        </motion.div>

        <div className="menu-tabs-outer">
          <div className="menu-tabs" role="tablist">
            {pillStyle && (
              <div
                className="menu-tab-pill"
                style={{ left: pillStyle.left, width: pillStyle.width }}
              />
            )}
            {Object.entries(menuData).map(([key, cat]) => (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el
                }}
                role="tab"
                aria-selected={active === key}
                className={`menu-tab ${active === key ? 'active' : ''}`}
                onClick={() => setActive(key)}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="menu-category-tagline">{category.tagline}</p>
            <div className="menu-grid">
              {category.items.map((item, i) => (
                <MenuItem
                  key={item.name}
                  item={item}
                  index={i}
                  category={category.label}
                  onAdd={addToCart}
                  justAdded={justAdded}
                />
              ))}
            </div>
            {(category.bulk || category.note) && (
              <p className="menu-footnote">{category.bulk || category.note}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.button
            className="cart-float"
            onClick={() => setCartOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <span className="cart-float-icon" aria-hidden="true">
              🛍
            </span>
            <span className="cart-float-text">
              {cartCount} item{cartCount > 1 ? 's' : ''}
            </span>
            <span className="cart-float-price">${cartTotal.toFixed(2)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            cartTotal={cartTotal}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onClear={() => {
              setCart([])
              setCartOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
