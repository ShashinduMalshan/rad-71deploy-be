import axios from "axios";
import { application, Request, Response } from "express";

export const generateContent = async (req: Request, resp: Response) => {
    try {
        const { text, maxToken } = req.body;
        const apiResponse = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [
                    {
                        parts: [{ text }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: maxToken || 150


                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GOOGLE_API_KEY as string
                }
            })


        const genratedText =
            apiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
            apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No data"

        console.log(apiResponse)
        console.log(genratedText)

        console.log(resp)

        resp.status(200).json({
            success: true,
            message: "Generated Successfully",
            data: genratedText,
        });

    } catch (error) {
        resp.status(500).json({ message: "Error generating content" });
    }
}