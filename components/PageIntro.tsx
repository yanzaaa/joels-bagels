'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PageIntro() {
  const [done, setDone] = useState(false)

  if (done) return null

  return (
    <motion.div
      className="page-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Joel&apos;s Bagels
      </motion.p>
    </motion.div>
  )
}
