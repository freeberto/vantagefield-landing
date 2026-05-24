import { motion, AnimatePresence } from 'framer-motion'

export default function TutorialTooltip({ text, visible, position = 'bottom' }) {
  const posStyles = {
    bottom: { top: '110%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    top:    { bottom: '110%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    right:  { left: '110%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
    left:   { right: '110%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          className="absolute z-50 w-52 rounded-xl px-4 py-3 text-xs leading-relaxed text-slate-200 pointer-events-none"
          style={{
            ...posStyles[position],
            background: 'rgba(10,20,38,0.95)',
            border: '1px solid rgba(201,168,76,0.35)',
            boxShadow: '0 0 20px rgba(201,168,76,0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-start gap-2">
            <span className="text-gold mt-0.5 flex-shrink-0">★</span>
            <span>{text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
