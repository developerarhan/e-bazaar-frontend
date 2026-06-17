export default function TrackingTimeline({ tracking }) {
    if (!tracking || tracking.length === 0) {
        return (
            <div className="text-center py-6">
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                    No log parameters updated for shipment route yet.
                </p>
            </div>
        );
    }
    
    return (
        <div className="relative pl-1">
            {tracking.map((step, index) => {
                const isLatest = index === 0;
                return (
                    <div key={index} className="relative flex gap-x-4 group">
                        {/* Timeline Architecture Line Elements */}
                        <div className="flex flex-col items-center shrink-0 w-4">
                            {/* Node Graphic Point */}
                            <div className={`w-3 h-3 rounded-full z-10 transition-all ${
                                isLatest 
                                ? "bg-black dark:bg-white ring-4 ring-gray-100 dark:ring-gray-800 animate-pulse" 
                                : "bg-gray-300 dark:bg-gray-700"
                            }`} />
                            
                            {/* Vertical Spacer Line vector */}
                            {index !== tracking.length - 1 && (
                                <div className="w-[1.5px] bg-gray-200 dark:bg-gray-800 my-1 grow min-h-[44px]" />
                            )}
                        </div>

                        {/* Content Descriptor Segment */}
                        <div className="pb-6 flex-1">
                            <p className={`font-semibold text-sm leading-none ${
                                isLatest ? "text-gray-900 dark:text-white text-base font-bold" : "text-gray-600 dark:text-gray-400"
                            }`}>
                                {step.status}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
                                {new Date(step.time).toLocaleString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}