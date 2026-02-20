import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    onClick,
    type = "button", 
    variant = "primary",
    isLoading = false,
    disabled = false,
    className = "", 
    ...props
    }) => {
    const baseStyles = "px-6 py-2 font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800 border-2 border-black focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:border-white",
        secondary: "bg-white text-black hover:bg-gray-100 border-2 border-black focus:ring-gray-500 dark:bg-black dark:text-white dark:hover:bg-gray-900 dark:border-white",
        danger: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            {children}
        </button>
    );
};

export default Button;
