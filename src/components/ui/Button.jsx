import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    outline: 'bg-transparent border border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
  };

  const sizeStyles = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-3 px-6 text-base',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
