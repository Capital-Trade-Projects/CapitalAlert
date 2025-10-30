import React from 'react';

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const AddButton = ({ loading = false, className, ...props }: AddButtonProps) => {
  return (
    <button 
      className={`group cursor-pointer outline-none hover:rotate-90 duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`} 
      title="Adicionar Novo Item" 
      disabled={loading}
      {...props}
    >
      <svg 
        className={`stroke-slate-400 fill-none group-hover:fill-slate-800 group-active:stroke-slate-200 group-active:fill-slate-600 group-active:duration-0 duration-300 ${loading ? 'animate-spin' : ''}`} 
        viewBox="0 0 24 24" 
        height="50px" 
        width="50px" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
        <path strokeWidth="1.5" d="M8 12H16" />
        <path strokeWidth="1.5" d="M12 16V8" />
      </svg>
    </button>
  );
}

export default AddButton;
