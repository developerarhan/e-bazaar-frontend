import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-neutral-50/30 dark:bg-neutral-950/20 min-h-screen text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                
                {/* Header */}
                <header className="max-w-2xl">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                        Get In Touch
                    </span>
                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-neutral-50 leading-none">
                        Connect <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">with us</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                        Have a question about our curation or an active order? Reach out and our team will assist you.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-16 pt-12 border-t border-neutral-200/50 dark:border-neutral-900/60">
                    
                    {/* Brand contact details on the left */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-3">
                                Email Support
                            </span>
                            <a href="mailto:support@e-bazaar.com" className="text-sm font-light text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors">
                                support@e-bazaar.com
                            </a>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-3">
                                Phone Inquiries
                            </span>
                            <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
                                +1 (800) 456-7890
                            </p>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-3">
                                Studio Hours
                            </span>
                            <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                Monday — Friday <br />
                                09:00 AM — 06:00 PM EST
                            </p>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-3">
                                Head Office
                            </span>
                            <p className="text-sm font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                e-Bazaar Curation Labs <br />
                                145 Editorial Avenue, Suite 300 <br />
                                New York, NY 10013
                            </p>
                        </div>
                    </div>

                    {/* Interactive Form on the right */}
                    <div className="lg:col-span-7">
                        <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/40 shadow-sm shadow-neutral-100/50 dark:shadow-none">
                            {sent ? (
                                <div className="text-center py-12 px-4 animate-fadeIn">
                                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/30 dark:border-neutral-800/40 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
                                        Message Sent
                                    </h3>
                                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                                        Thank you for reaching out. A representative from our curation team will contact you shortly.
                                    </p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="mt-8 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors uppercase cursor-pointer"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-3 text-sm text-neutral-900 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-100 transition-colors duration-300 placeholder-neutral-350"
                                            placeholder="Introduce yourself"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-3 text-sm text-neutral-900 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-100 transition-colors duration-300 placeholder-neutral-350"
                                            placeholder="where should we reply?"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-3 text-sm text-neutral-900 dark:text-neutral-50 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-100 transition-colors duration-300 placeholder-neutral-350 resize-none"
                                            placeholder="What would you like to say?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:hover:bg-neutral-200 text-neutral-50 dark:text-neutral-950 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
