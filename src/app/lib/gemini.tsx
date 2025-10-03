'use client'

import {GoogleGenAI, Schema} from "@google/genai";

const CLE_API_GEMINI = 'CLE_API_GEMINI';

export default async function fetchGemini(contents: string, responseSchema: Schema): Promise<object | string> {
    const ai = new GoogleGenAI({apiKey: chargerCleAPIGemini()});
    return new Promise((resolve, reject) => {
        ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        }).then(value => {
            console.log('Résultat :', value);
            if (value && value.candidates && value.candidates.length > 0) {
                const candidate = value.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    const part = candidate.content.parts[0];
                    if (part.text) {
                        resolve(JSON.parse(part.text));
                    }
                }
            }
            resolve({});
        }).catch(reason => {
            const json = JSON.parse(reason.message);
            reject(json.error.message);
        });
    });
}

export function chargerCleAPIGemini(): string | undefined {
    return window.localStorage.getItem(CLE_API_GEMINI) || undefined;
}

export function enregistrerCleAPIGemini(cleAPIGemini: string): void {
    window.localStorage.setItem(CLE_API_GEMINI, cleAPIGemini);
}