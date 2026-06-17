import { createContext, useContext, useState } from "react";
import { calculateOrderTotals } from "../config/pricing";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Add to cart
    const addToCart = (product, quantity) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            const availableStock = product.available_stock ?? product.stock;

            if(existing) {
                // Don't exceed available stock
                const newQty = Math.min(
                    existing.quantity + quantity,
                    availableStock
                );
                return prev.map((item) => 
                    item.id === product.id
                        ? { ...item, quantity: newQty}
                        : item
                );
            }

            // Cap initial quantity at available stock
            const cappedQty = Math.min(quantity, availableStock);
            if (cappedQty <= 0) return prev; // out of stock - don't add

            return [...prev, {...product, quantity: cappedQty}];
        });
    };

    // Remove item
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Increase quantity
    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;

                const availableStock = item.available_stock ?? item.stock;
                // Don't go above available stock
                const newQty = Math.min(item.quantity + 1, availableStock);
                return { ...item, quantity: newQty };
            })
        );
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Clear Cart
    const clearCart = () => {
        setCart([]);
    }

    const totals = calculateOrderTotals(cart);  

    return (
        <CartContext.Provider
            value ={{
                cart,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart,

                total: totals.subtotal,
                deliveryCharges: totals.deliveryCharges,
                tax: totals.tax,
                grandTotal: totals.grandTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);