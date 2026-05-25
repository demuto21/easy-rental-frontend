// FILE: apps/mfe-agency/src/components/AuthInput.tsx
'use client';
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ icon, type = "text", placeholder, label, ...props }, ref) => (
    <div className="space-y-1.5 group w-full text-left">
      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest ml-1 italic transition-colors group-focus-within:text-[#0528d6]">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0528d6] transition-colors">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...props}
          className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-700 dark:text-white outline-none focus:bg-white dark:focus:bg-[#0f1323] focus:border-[#0528d6] transition-all shadow-sm"
        />
      </div>
    </div>
  )
);
AuthInput.displayName = "AuthInput";