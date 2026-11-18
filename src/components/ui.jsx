import { Link } from 'react-router-dom'

export const Wrap = ({ children, className = '' }) => <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>

export const Button = ({ to, children, dark }) => (
  <Link to={to} className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${dark ? 'bg-white text-ink hover:bg-turmeric' : 'bg-ink text-white hover:bg-sea'}`}>
    {children}
    <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
  </Link>
)

// Carte cliquable avec effet de survol
export const CardLink = ({ to, children, label = 'Découvrir' }) => (
  <Link to={to} className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-turmeric hover:shadow-xl">
    {children}
    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-sea">
      {label} <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
    </span>
  </Link>
)