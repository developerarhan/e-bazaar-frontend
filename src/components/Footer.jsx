import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-100 dark:border-neutral-900/60 mt-16 bg-neutral-50/20 dark:bg-neutral-950 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

                    {/* Brand */}
                    <div className="md:col-span-6 flex flex-col items-start">
                        <h3 className="text-lg font-light tracking-[0.2em] uppercase text-neutral-900 dark:text-neutral-50">
                            e-<span className="font-semibold">Bazaar</span>
                        </h3>
                        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
                            Your one-stop shop for modern products. Designed with simplicity, utility, and refined aesthetics.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                            Company
                        </span>
                        <div className="flex flex-col gap-3">
                            <Link 
                                to="/contact"
                                className="text-sm font-light text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-250 w-fit"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <span className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                            Legal
                        </span>
                        <div className="flex flex-col gap-3">
                            <Link 
                                to="/privacy"
                                className="text-sm font-light text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-250 w-fit"
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                to="/terms"
                                className="text-sm font-light text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-250 w-fit"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 md:mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-900/40 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono tracking-wide">
                        © 2026 e-Bazaar. All rights reserved.
                    </p>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                        Designed for Everyday Life
                    </span>
                </div>
            </div>
        </footer>
    );
}
