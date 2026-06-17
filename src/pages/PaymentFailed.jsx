import { Link } from "react-router-dom";
import { AlertCircle, RefreshCw, ShoppingCart } from "lucide-react";

export default function PaymentFailed() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
            <div className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 p-6 sm:p-8 rounded-2xl shadow-sm text-center max-w-md w-full transform scale-100 transition-all duration-300">
                
                {/* Warning Alert Core Vector */}
                <div className="flex justify-center mb-5">
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-full border border-rose-100 dark:border-rose-900/30">
                        <AlertCircle size={48} className="text-rose-600 dark:text-rose-400" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Header Information Segment */}
                <h1 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white tracking-tight">
                    Payment Failed
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-xs mx-auto">
                    Your financial institution could not complete this clearance transaction. No funds were debited.
                </p>

                {/* Grid Split Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/cart" className="flex-1 order-2 sm:order-1">
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 font-medium text-sm text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                            <ShoppingCart size={15} />
                            Back to Cart
                        </button>
                    </Link>

                    <Link to="/checkout" className="flex-1 order-1 sm:order-2">
                        <button className="w-full flex items-center justify-center gap-1.5 bg-black dark:bg-white text-white dark:text-black font-medium text-sm py-3 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-50 shadow-sm transition-all cursor-pointer">
                            <RefreshCw size={14} />
                            Retry Payment
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}