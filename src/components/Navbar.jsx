import { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./navbar/SearchForm";
import NavLinks from "./navbar/NavLinks";
import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-150 dark:border-neutral-900/60 transition-colors duration-300 relative">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-neutral-800 dark:text-neutral-200 p-2 focus:outline-none hover:opacity-85 transition-opacity cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                            <span className={`w-5 h-[1.5px] bg-current transform transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-[7.25px]" : ""}`}></span>
                            <span className={`w-5 h-[1.5px] bg-current transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
                            <span className={`w-5 h-[1.5px] bg-current transform transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-[7.25px]" : ""}`}></span>
                        </div>
                    </button>

                    <Link
                        to="/"
                        className="text-lg sm:text-xl font-light tracking-[0.2em] uppercase text-neutral-900 dark:text-neutral-50 hover:opacity-80 transition-opacity"
                    >
                        e-<span className="font-semibold">Bazaar</span>
                    </Link>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 mx-6">
                    <SearchForm />
                </div>

                {/* Links - Desktop */} 
                <div className="hidden md:block">
                    <NavLinks />              
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 ml-2 rounded-full border border-neutral-200/50 dark:border-neutral-800/60 bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-50 transition-all duration-300 cursor-pointer"
                    aria-label="Toggle theme"
                >
                    <div className="relative w-4.5 h-4.5 flex items-center justify-center">
                        {theme === "light" ? (
                            <svg className="w-4.5 h-4.5 transition-transform duration-500 rotate-0 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        ) : (
                            <svg className="w-4.5 h-4.5 transition-transform duration-500 rotate-0 hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-900/60 shadow-xl shadow-neutral-950/10 dark:shadow-none px-6 py-8 space-y-6 transition-all duration-300 animate-fadeIn">
                    {/* Mobile Search */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Search Store</span>
                        <SearchForm onSearch={() => setMenuOpen(false)} />
                    </div>
                    <div className="space-y-2 border-t border-neutral-100 dark:border-neutral-900/40 pt-6">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">Navigation</span>
                        <div className="mt-3">
                            <NavLinks onClick={() => setMenuOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}