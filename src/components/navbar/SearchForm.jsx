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
            className="flex w-full items-center relative group"
        >
            <div className="absolute left-4 text-neutral-400 dark:text-neutral-500 pointer-events-none transition-colors group-focus-within:text-neutral-600 dark:group-focus-within:text-neutral-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-100/50 dark:bg-neutral-900/40 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm pl-11 pr-24 py-2.5 rounded-full border border-neutral-200/50 dark:border-neutral-800/60 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-all duration-200"
            />
            <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-neutral-50 dark:text-neutral-950 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
            >
                Search
            </button>
        </form>
    );
}
