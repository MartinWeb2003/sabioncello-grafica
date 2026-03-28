import { useEffect, useRef } from 'react'
import './TextPressure.css'

/**
 * TextPressure — mimics React Bits TextPressure.
 * Drives font-weight (100 → 900) based on cursor proximity.
 * Color is always pure white. No opacity changes.
 */
export default function TextPressure({
  text = '',
  className = '',
  radius = 240,
  minWeight = 100,
  maxWeight = 900,
}) {
  const wrapRef  = useRef(null)
  const rafRef   = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove',   onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)

    function tick() {
      const spans = wrapRef.current?.querySelectorAll('.tp-char')
      if (spans) {
        const { x: mx, y: my } = mouseRef.current
        spans.forEach(span => {
          const rect = span.getBoundingClientRect()
          const cx   = rect.left + rect.width  / 2
          const cy   = rect.top  + rect.height / 2
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
          const t    = Math.max(0, 1 - dist / radius)
          const s    = t * t * (3 - 2 * t)
          // Snap to nearest 100 for non-variable font
          const raw    = minWeight + (maxWeight - minWeight) * s
          const weight = Math.round(raw / 100) * 100
          span.style.fontWeight = String(weight)
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove',   onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, minWeight, maxWeight])

  const words = text.split(' ')

  return (
    <span ref={wrapRef} className={`tp-wrap${className ? ` ${className}` : ''}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="tp-word">
          {word.split('').map((ch, ci) => (
            <span key={ci} className="tp-char" aria-hidden="true">{ch}</span>
          ))}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
