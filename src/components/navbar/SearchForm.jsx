import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchForm({ onSearch }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        navigate(`/products?search=${search}`);
        setSearch("");
        onSearch && onSearch();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="hidden md:flex flex-1 mx-6"
        >
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-black text-white px-4 rounded-r-lg cursor-pointer"
            >
                Search
            </button>
        </form>
    );
}
