import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"

export default function NavLinks({ onClick }) {
    const { user} = useAuth();
    const { cart } = useCart();

    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 w-full md:w-auto">
            <Link
                to="/"
                onClick={onClick}
                className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-200 py-1"
            >
                Home
            </Link>
            <Link
                to="/products"
                onClick={onClick}
                className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-200 py-1"
            >
                Shop
            </Link>

            {user ? (
                <>
                    <Link
                        to="/orders"
                        onClick={onClick}
                        className="px-4 py-2 border border-neutral-200 dark:border-neutral-800/80 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-all text-xs font-medium tracking-wide text-center cursor-pointer"
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/profile"
                        onClick={onClick}
                        className="px-4 py-2 border border-neutral-200 dark:border-neutral-800/80 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-all text-xs font-medium tracking-wide text-center cursor-pointer"
                    >
                        Profile
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        onClick={onClick}
                        className="px-4 py-2 border border-neutral-200 dark:border-neutral-800/80 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-all text-xs font-medium tracking-wide text-center cursor-pointer"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        onClick={onClick}
                        className="px-4 py-2 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-xs font-medium tracking-wide text-center cursor-pointer"
                    >
                        Register
                    </Link>                               
                </>
            )}

            {/* Cart */}
            <Link
                to="/cart"
                onClick={onClick}
                className="relative p-2 rounded-full hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 transition-colors flex items-center justify-center cursor-pointer w-9 h-9 md:w-auto md:h-auto"
                aria-label={`Cart (${cart.length} items)`}
            >
                <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 md:-top-1 md:-right-1 text-[9px] bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-full w-[18px] h-[18px] flex items-center justify-center font-bold tracking-tighter">
                        {cart.length}
                    </span>
                )}
            </Link>
        </div> 
    );
}