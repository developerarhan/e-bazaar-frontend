export default function Footer() {
    return (
        <footer className="border-t mt-12 bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold">e-Bazaar</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Your one-stop shop for modern products.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 text-sm">
                        <div className="flex flex-col gap-2">
                            <span className="font-medium">Company</span>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-medium">Legal</span>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-gray-500">
                    © 2026 e-Bazaar. All rights reserved.
                </p>
            </div>
        </footer>
    )
}