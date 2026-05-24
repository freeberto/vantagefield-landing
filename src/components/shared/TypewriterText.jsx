import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function TypewriterText({ text, speed = 28, className = '', onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)
  const idxRef = useRef(0)

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setDisplayed('')
    setDone(false)
    idxRef.current = 0

    timerRef.current = setInterval(() => {
      idxRef.current += 1
      setDisplayed(text.slice(0, idxRef.current))
      if (idxRef.current >= text.length) {
        clearInterval(timerRef.current)
        setDone(true)
        onDone?.()
      }
    }, speed)

    return () => clearInterval(timerRef.current)
  }, [text, speed])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
          style={{ color: '#c9a84c', fontWeight: 700, marginLeft: 1 }}
        >
          ▌
        </motion.span>
      )}
    </span>
  )
}
