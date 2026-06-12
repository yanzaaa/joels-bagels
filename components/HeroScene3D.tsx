'use client'
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Image as PhotoPlane } from '@react-three/drei'
import type { Group } from 'three'

/* Real WebGL hero: the shop's actual photos float as depth-staggered planes.
   The whole group leans toward the pointer and tips back as you scroll —
   slow, premium, no spinning. Mounted only on wide, fine-pointer,
   motion-tolerant devices; the 2.5D collage is the fallback everywhere else. */

const CARDS: {
  url: string
  scale: [number, number]
  position: [number, number, number]
  rotation: [number, number, number]
}[] = [
  {
    // Real shop photo — the Knicks cross-section, their most iconic shot
    url: '/instagram/post4.jpg',
    scale: [2.3, 1.75],
    position: [0.35, 0.55, 0],
    rotation: [0, -0.16, -0.04],
  },
  {
    url: '/photos/everything-bagel.jpg',
    scale: [1.3, 1.3],
    position: [-1.25, -0.95, 0.8],
    rotation: [0, 0.18, 0.06],
  },
  {
    url: '/photos/deli-club.jpg',
    scale: [1.1, 1.1],
    position: [1.55, -1.15, 0.4],
    rotation: [0, -0.12, 0.07],
  },
  {
    url: '/photos/sausage-egg.jpg',
    scale: [0.95, 0.95],
    position: [-0.5, 1.7, -0.75],
    rotation: [0, 0.12, -0.06],
  },
]

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const scrollT = Math.min(1, window.scrollY / 700)
    const targetY = pointer.current.x * 0.22
    const targetX = pointer.current.y * 0.1 + scrollT * 0.4
    const ease = Math.min(1, delta * 4)
    g.rotation.y += (targetY - g.rotation.y) * ease
    g.rotation.x += (targetX - g.rotation.x) * ease
    g.position.y += (scrollT * 1.4 - g.position.y) * ease
  })

  return <group ref={group}>{children}</group>
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    // WebGL unavailable → render nothing; the hero keeps its dark stage
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroScene3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // Park the GPU loop once the hero scrolls out of view — the rAF tick is
  // a real battery cost if it runs for the whole page session.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <SceneBoundary>
      <div className="hero-3d" aria-hidden="true" ref={wrapRef}>
        <Canvas
          dpr={[1, 1.75]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0, 9.2], fov: 32 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Rig>
              {CARDS.map((card) => (
                <Float
                  key={card.url}
                  speed={1.1}
                  rotationIntensity={0.12}
                  floatIntensity={0.5}
                >
                  <PhotoPlane
                    url={card.url}
                    scale={card.scale}
                    position={card.position}
                    rotation={card.rotation}
                    radius={0.09}
                    toneMapped={false}
                  />
                </Float>
              ))}
            </Rig>
          </Suspense>
        </Canvas>
      </div>
    </SceneBoundary>
  )
}
