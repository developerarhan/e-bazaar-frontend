import { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./navbar/SearchForm";
import NavLinks from "./navbar/NavLinks";
import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const {theme, toggleTheme} = useTheme();

    return (
        <nav className="sticky top-0 z-50 bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-3">

                    {/* Mobile menu */}
                    <button 
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>

                    {/* Center: Logo */}
                    <Link to="/" className="text-xl font-semibold">
                        e-Bazaar
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 mx-6">
                    <SearchForm />
                </div>

                {/* Links */} 
                <div className="hidden md:block">
                    <NavLinks />              
                </div>
                <button
                    onClick={toggleTheme}
                    className="px-3 py-2 ml-3 rounded-lg border dark:border-gray-700"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>


            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
                    {/* Mobile Search */}
                    <SearchForm onSearch={() => setMenuOpen(false)} />
                    <NavLinks onClick={() => setMenuOpen(false)} />
                </div>
            )}
        </nav>
    );
}