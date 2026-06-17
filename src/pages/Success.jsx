import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
            <div className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 p-6 sm:p-8 rounded-2xl shadow-sm text-center max-w-md w-full transform scale-100 transition-all duration-300">
                
                {/* Micro-animating Checked Ring */}
                <div className="flex justify-center mb-5">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle2 size={48} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Text Typography Wrapper */}
                <h1 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">
                    Order Confirmed!
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-xs mx-auto">
                    Thank you for shopping with <span className="font-semibold text-gray-900 dark:text-white">e-Bazaar</span>. Your transaction was processed successfully.
                </p>

                {/* Action Controls layout block */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/orders"
                        className="flex-1 order-2 sm:order-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 font-medium text-sm text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
                    >
                        <ShoppingBag size={15} />
                        View Orders
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 order-1 sm:order-2 flex items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-black font-medium text-sm py-3 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-50 shadow-sm transition-all cursor-pointer"
                    >
                        <span>Continue</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
}