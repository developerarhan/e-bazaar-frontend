export default function TermsOfService() {
    return (
        <div className="bg-neutral-50/30 dark:bg-neutral-950/20 min-h-screen text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                
                {/* Header */}
                <header className="max-w-2xl">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                        Last Updated // June 2026
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-none">
                        Terms of <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">Service</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                        Please read these terms carefully. They govern your use of the e-Bazaar storefront, services, products, and related transactions.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-16 pt-12 border-t border-neutral-200/50 dark:border-neutral-900/60">
                    
                    {/* Sticky side navigation index */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6">
                        <div className="p-6 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/40">
                            <span className="text-xs font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase block mb-4">
                                TERMS INDEX
                            </span>
                            <nav className="flex flex-col gap-3.5 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                                <a href="#acceptance" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">01 /</span> Acceptance of Terms
                                </a>
                                <a href="#accounts" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">02 /</span> User Accounts
                                </a>
                                <a href="#transactions" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">03 /</span> Transactions & Payments
                                </a>
                                <a href="#shipping" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">04 /</span> Shipping & Returns
                                </a>
                                <a href="#liability" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-neutral-400">05 /</span> Limitation of Liability
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Terms sections */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* Section 1 */}
                        <section id="acceptance" className="scroll-mt-28">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>01</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Acceptance</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Acceptance of Terms
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                By entering, viewing, or placing orders on the e-Bazaar storefront, you formally acknowledge and agree to be bound by the protocols set out in these Terms of Service. If you disagree with any segment of these clauses, please immediately discontinue use of our site and online catalog.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section id="accounts" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>02</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Membership</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                User Accounts
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                To complete certain orders, you may need to register an account profile. You represent that all details submitted are accurate. You assume full responsibility for safeguarding your access keys and passwords.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                e-Bazaar retains the absolute right to suspend profiles, terminate accounts, or cancel active orders at our discretion if profile actions violate local regulations or show deceptive intent.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section id="transactions" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>03</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Finance</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Transactions & Payments
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                All items are billed in the currency specified during checkout. We leverage secure, external transactional processors to coordinate checkouts. By supplying card data, you authorize us to pass billing details to our secure financial partners.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                We reserve the right to cancel orders arising from catalog listing errors, technical price calculation glitches, or checkout verification flags.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section id="shipping" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>04</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Logistics</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Shipping & Returns
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Delivery timeframes provided are estimations based on logistical carrier updates and are not contractually binding. e-Bazaar cannot be held responsible for carrier delays or custom check holdouts.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                Returns and exchanges must follow our structured return policies. All returned merchandise must remain in its original packings with tags intact.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section id="liability" className="scroll-mt-28 border-t border-neutral-100 dark:border-neutral-900/30 pt-10">
                            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mb-4">
                                <span>05</span>
                                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                                <span>Disclaimer</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-light text-neutral-900 dark:text-neutral-50">
                                Limitation of Liability
                            </h2>
                            <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                e-Bazaar services and products are provided to you on an 'as-is' and 'as-available' status. To the maximum limit allowed by relevant legislation, e-Bazaar disclaims all express or implied warranties.
                            </p>
                            <p className="mt-3 text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                                e-Bazaar shall not be liable for any direct, indirect, accessory, punitive, or consequential losses (including profit loss or operational blockages) that result from the use of, or inability to use, our web catalog.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
