'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover } from '@/lib/motionPresets';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'font-body font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-sweet-gradient text-white btn-shadow focus:ring-candy-pink',
    secondary: 'bg-candy-pink text-white hover:bg-grape-purple btn-shadow focus:ring-candy-pink',
    outline: 'border-2 border-grape-purple text-grape-purple hover:bg-grape-purple hover:text-white focus:ring-grape-purple',
    ghost: 'text-grape-purple hover:bg-grape-purple/10 focus:ring-grape-purple',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={buttonHover.hover}
      whileTap={buttonHover.tap}
    >
      {children}
    </motion.button>
  );
}
