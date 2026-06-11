import Image from 'next/image'
import Reveal from '@/components/Reveal'

const steps = [
  {
    num: '01',
    time: '4:30 AM',
    title: 'Mixed Before Sunrise',
    desc: 'Dough mixed, rolled, and baked in-house every morning. By the time the sun is up, the first batch is already cooling on the racks.',
    chip: '/photos/bagel-racks.jpg',
    chipAlt: 'Racks of fresh bagels labeled poppy, salt, garlic, everything',
  },
  {
    num: '02',
    time: 'Your Call',
    title: 'Built Your Way',
    desc: 'Any bagel, any spread, any topping. Twenty-plus cream cheeses and a counter crew that knows the regulars by their order.',
    chip: '/photos/platter.jpg',
    chipAlt: 'A breakfast platter with eggs, home fries and toast',
  },
  {
    num: '03',
    time: 'Doors at 6 AM',
    title: 'Hot at the Counter',
    desc: 'No heat lamps, no day-olds. If it is in the case, it came out of the oven this morning. Coffee is already on.',
    chip: '/photos/interior-line.jpg',
    chipAlt: 'Regulars lined up at the counter',
  },
]

export default function Process() {
  return (
    <section className="section process-section" id="kitchen">
      <div className="container">
        <Reveal className="process-header">
          <p className="eyebrow">From Our Kitchen</p>
          <h2 className="section-headline">Three Steps. No Shortcuts.</h2>
        </Reveal>

        {/* Staircase offsets + photo chips come from CSS nth-child rules */}
        <div className="process-grid">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="process-step">
                <span className="process-chip" aria-hidden="true">
                  <span className="pc-photo">
                    <Image src={step.chip} alt="" fill sizes="110px" quality={60} />
                  </span>
                </span>
                <span className="process-step-num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="process-time">{step.time}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
