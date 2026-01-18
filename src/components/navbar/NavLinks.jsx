import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"

export default function NavLinks({ onClick }) {
    const { user} = useAuth();
    const { cart } = useCart();

    return (
        <div className="flex items-center gap-4">
            <Link to="/" onClick={onClick} className="hover:text-gray-600">Home</Link>
            <Link to="/products" onClick={onClick} className="hover:text-gray-600">Shop</Link>
            <Link to="/about" onClick={onClick} className="hover:text-gray-600">About</Link>

            {user ? (
                <>
                    <Link
                        to="/orders"
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        onClick={onClick}
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/profile"
                        onClick={() => onClick && onClick()}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Profile
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="px-4 py-2 border rounded-lg hover:bg-gray-300"
                        onClick={onClick}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        onClick={onClick}
                    >
                        Register
                    </Link>                               
                </>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-xl">
                🛒
                {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-2">
                    {cart.length}
                </span>
                )}
            </Link>
        </div> 
    );
}