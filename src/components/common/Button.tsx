'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  asChild?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  asChild = false, 
  className = '', 
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-body transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#2E6B8A] text-white elegant-shadow hover:elegant-shadow-lg',
    secondary: 'bg-[#C9A227] text-white elegant-shadow hover:elegant-shadow-lg',
    outline: 'border-2 border-[#2E6B8A] text-[#2E6B8A] hover:bg-[#E8F4F8]',
    ghost: 'text-[#2E6B8A] hover:bg-[#E8F4F8]'
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (asChild && typeof children === 'object' && 'props' in children) {
    return <Link {...props} className={classes}>{children}</Link>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}