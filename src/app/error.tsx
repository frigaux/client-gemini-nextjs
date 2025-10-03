'use client' // Error boundaries must be Client Components

export default function Error({
                                  error
                              }: {
    error: Error & { digest?: string }
}) {
    return (
        <div>
            <h2>{message(error)}</h2>
        </div>
    )
}

function message(error: Error): string {
    if (Object.hasOwn(error, 'message')) {
        try {
            const json = JSON.parse(error.message);
            if ('error' in json) {
                const error = json.error;
                if ('message' in error) {
                    return error.message;
                }
            }
        } catch(e) {
            return error.message;
        }
    }
    return JSON.stringify(error);
}