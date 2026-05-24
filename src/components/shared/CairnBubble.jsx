import { motion, AnimatePresence } from 'framer-motion'
import CairnIcon from './CairnIcon'
import TypewriterText from './TypewriterText'

export default function CairnBubble({ message, thinking = false, children, size = 'md' }) {
  const sizes = {
    sm: { icon: 44, text: 'text-sm' },
    md: { icon: 58, text: 'text-base' },
    lg: { icon: 72, text: 'text-lg' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-5">
      <div className="flex-shrink-0">
        <CairnIcon size={s.icon} thinking={thinking} />
      </div>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {message && (
              <TypewriterText
                text={message}
                speed={28}
                className={`${s.text} text-slate-200 leading-relaxed`}
              />
            )}
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
