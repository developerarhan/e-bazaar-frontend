const orders = [
    {
    id: "ORD123",
    date: "2026-01-11",
    total: 2499,
    status: "Shipped",
    tracking: [
        { status: "Placed", time: "10:00 AM" },
        { status: "Confirmed", time: "10:05 AM" },
        { status: "Packed", time: "12:00 PM" },
        { status: "Shipped", time: "4:30 PM" }
    ]
    }
]

export default orders;