interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'warning' | 'destructive' | 'success'
  className?: string
}

const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const variantStyles = {
    default: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-700',
    destructive: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
