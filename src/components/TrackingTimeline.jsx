export default function TrackingTimeline({ tracking }) {
    return (
        <div className="space-y-6">
            {tracking.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-black"></div>
                        {index !== tracking.length - 1 && (
                            <div className="w-px h-12 bg-gray-300"></div>
                        )}
                    </div>
                    <div>
                        <p className="font-medium">{step.status}</p>
                        <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}