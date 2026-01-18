import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Add to cart
    const addToCart = (product, quantity) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if(existing) {
                return prev.map((item) => 
                    item.id === product.id
                        ? { ...item, quantity:item.quantity + quantity}
                        : item
                );
            }

            return [...prev, {...product, quantity}];
        });
    };

    // Remove item
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id!== id));
    };

    // Increase quantity
    const increaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCart(
            cart.map((item) => 
                item.id === id ? {...item, quantity: item.quantity - 1} : item    
            )
        );
    };

    // Clear Cart
    const clearCart = () => {
        setCart([]);
    }

    // Total price
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Delivery Charges
    const deliveryCharges = total > 500 ? 50 : 0

    // Calculate Tax
    const tax = Number((0.05 * (total + deliveryCharges)).toFixed(2));

    // Grand Total
    const grandTotal = total + deliveryCharges + tax

    return (
        <CartContext.Provider
            value ={{
                cart,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart,
                total,
                deliveryCharges, 
                grandTotal,
                tax
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);