'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-[#2C5282] text-white hover:bg-[#234876] focus:ring-[#2C5282]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-[#2C5282]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const width = fullWidth ? 'w-full' : ''
  const loading = isLoading ? 'opacity-75 cursor-not-allowed' : ''
  const isDisabled = disabled || isLoading

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-black text-white hover:bg-[#333333] focus:ring-black': variant === 'primary',
          'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300': variant === 'secondary',
          'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-black': variant === 'outline',
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Usage examples:
/*
<Button>Default Button</Button>
<Button variant="secondary" size="sm">Small Secondary</Button>
<Button variant="outline" size="lg" fullWidth>Large Full Width</Button>
<Button variant="danger" isLoading>Delete</Button>
*/
