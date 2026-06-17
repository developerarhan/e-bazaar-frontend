export const PRICING = {
    DELIVERY_CHARGE: 50,           // ₹50 delivery charge
    DELIVERY_THRESHOLD: 500,       // free delivery above ₹500
    FREE_DELIVERY: 0,
    TAX_RATE: 0.05,                // 5% tax
};

/**
 * Calculate order totals.
 * Mirrors backend calculate_totals() function exactly.
 * 
 * @param {Array} items - array of {price, quantity}
 * @returns {Object} - {subtotal, deliveryCharges, tax, grandTotal}
 */
export function calculateOrderTotals(items) {
    // subtotal
    const subtotal = items.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity));
    }, 0);

    // delivery
    const deliveryCharges = subtotal > PRICING.DELIVERY_THRESHOLD
        ? PRICING.FREE_DELIVERY
        : PRICING.DELIVERY_CHARGE

    // tax
    const tax = Math.round(
        (subtotal + deliveryCharges) * PRICING.TAX_RATE * 100
    ) / 100;

    //  grand total
    const grandTotal = subtotal + deliveryCharges + tax;

    return {
        subtotal: Number(subtotal.toFixed(2)),
        deliveryCharges: Number(deliveryCharges.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        grandTotal: Number(grandTotal.toFixed(2)),
    };
}