export default function PrivacyPolicy() {
    return (
        <div className="bg-neutral-50/30 dark:bg-neutral-950/20 min-h-screen text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                
                {/* Header */}
                <header className="max-w-2xl">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                        Last Updated // June 2026
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-none">
                        Privacy <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">Policy</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                        We value your trust. This document outlines how e-Bazaar collects, uses, and safeguards your personal data when utilizing our e-commerce platform and services.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-16 pt-12 border-t border-neutral-200/50 dark:border-neutral-900/60">
                    
                    {/* Sticky navigation index on the left */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6">
                        <div className="p-6 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/40">
                            <span className="text-xs font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase block mb-4">
                                DOCUMENT INDEX
                            </span>
                            <nav className="flex flex-col gap-3.5 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                                <a href="#collection" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">01 /</span> Information Collection
                                </a>
                                <a href="#usage" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">02 /</span> Usage of Data
                                </a>
                                <a href="#cookies" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">03 /</span> Cookies & Caching
                                </a>
                                <a href="#protection" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">04 /</span> Security & Protection
                                </a>
                                <a href="#rights" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">05 /</span> Your Legal Rights
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Policy sections on the right */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* Section 1 */}
                        <section id="collection" className="scroll-mt-28">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>01</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Collection</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Information Collection
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                We gather details that you explicitly supply when creating an account, initiating purchases, or communicating with our help desk. This typically includes your legal name, billing/shipping addresses, phone contact, email address, and payment token references.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Additionally, telemetry details such as client browser user-agents, active IP addresses, page routing histories, and interface clicks are logged automatically to assist in storefront load optimization.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section id="usage" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>02</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Usage</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Usage of Data
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Your collected details serve multiple functional roles:
                            </p>
                            <ul className="mt-4 space-y-2.5 pl-5 list-disc text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                <li>Processing cart payments and verifying transactional checks.</li>
                                <li>Fulfilling product deliveries to your specified shipping addresses.</li>
                                <li>Broadcasting automated shipping notices and real-time tracking logs.</li>
                                <li>Analyzing shopper movements to streamline catalog navigation and product layouts.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section id="cookies" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>03</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Telemetry</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Cookies & Caching
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                e-Bazaar utilizes basic local cookies to manage core store states. These files enable persistent shopping cart records, store theme configurations (maintaining dark/light modes), and support user authorization sessions.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                You can manually block or erase active cookies in your client browser preference panel, though this may sign you out or clear active carts.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section id="protection" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>04</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Security</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Security & Protection
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                We employ secure protocols (TLS/SSL encryption) to guard data packets during transit. Payment updates are handled strictly via certified checkout providers (such as Razorpay), ensuring e-Bazaar never saves raw financial card details on its servers.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section id="rights" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>05</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Rights</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Your Legal Rights
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Depending on your regional legislation, you retain the legal right to request a formal copy of your personal data records, demand modifications to outdated address details, or request full account deletion from our databases. For data deletion inquiries, please reach out to our legal compliance office.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
