export const aiService = {
    async chat(message) {
        const response = await fetch(`${process.env.OPENROUTER_BASE_URL}/chat/completions`, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Prodhub App",
                
                },
                body: JSON.stringify({
                    model: process.env.OPENROUTER_MODEL,
                    messages: [
                        {
                            role: "user",
                            content: message,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error("AI_REQUEST_FAILED");
            }
            
            const data = await response.json();
            return data.choices?.[0]?.message?.content ?? "No response from Ai.";
        },
};