interface CardProps {
  children?: React.ReactNode
  title?: string
  description?: string
  className?: string
}

const Card = ({ children, title, description, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  )
}

export default Card