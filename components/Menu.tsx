'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

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

function MenuItem({ item, index }: { item: MenuItemData; index: number }) {
  return (
    <motion.div
      className={`menu-item ${item.popular ? 'popular' : ''}`}
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
      <span className="menu-item-price">
        {item.price ? `$${item.price.toFixed(2)}` : item.label || '—'}
      </span>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('bagels')
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(
    null
  )

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
            Everything made daily. Nothing sits overnight.
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
                <MenuItem key={item.name} item={item} index={i} />
              ))}
            </div>
            {(category.bulk || category.note) && (
              <p className="menu-footnote">{category.bulk || category.note}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
