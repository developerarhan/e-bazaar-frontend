export default function SummaryText({ text }) {
    const lines = text.split('\n').filter(line => line.trim());

    return (
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {lines.map((line, idx) => {
                // Bold headers: **Overall Verdict:** etc.
                if (line.startsWith('**') && line.includes(':**')) {
                    const [header, ...rest] = line.split(':**');
                    const headerText = header.replace(/\*\*/g, '');
                    const content = rest.join(':**').trim();

                    return (
                        <div key={idx}>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {headerText}:
                            </span>
                            {content && (
                                <span className="ml-1">{content}</span>
                            )}
                        </div>
                    );
                }

                 // Bullet points
                if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                    const content = line.trim().replace(/^[•\-]\s*/, '');
                    return (
                        <div key={idx} className="flex gap-2 ml-3">
                            <span className="text-violet-500 flex-shrink-0 mt-0.5">•</span>
                            <span>{content}</span>
                        </div>
                    );
                }

                // Regular text
                return (
                    <p key={idx}>{line}</p>
                );
            })}
        </div>
    );
}