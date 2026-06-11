interface StampProps {
  /** Unique per usage — SVG path ids are global to the document */
  id: string
  text?: string
  size?: number
  core?: string
}

export default function Stamp({
  id,
  text = "FRESH EVERY MORNING · JOEL'S BAGELS · MEDFORD NY · SINCE DAY ONE · ",
  size = 128,
  core = '🥯',
}: StampProps) {
  const pathId = `stamp-path-${id}`
  return (
    <div className="stamp" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path
            id={pathId}
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="stamp-core">{core}</span>
    </div>
  )
}
