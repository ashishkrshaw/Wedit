
import type { EditedResult, CommunityPrompt, ChatMessage } from '../types';

// Helper to convert a File to a base64 string and mimeType
const fileToBase64 = (file: File): Promise<{ data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1];
      resolve({
        data: base64Data,
        mimeType: file.type,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const classifyImageForMale = async (imageFile: File): Promise<boolean> => {
    const imageData = await fileToBase64(imageFile);
    const response = await fetch('/api/classify-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }
    const data = await response.json();
    return data.classification.trim().toLowerCase().includes('yes');
};

export const improvePrompt = async (prompt: string): Promise<string> => {
    if (!prompt.trim()) {
        throw new Error("Prompt cannot be empty.");
    }
    const response = await fetch('/api/improve-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }
    const data = await response.json();
    return data.improvedPrompt;
};

export const editImageWithNanoBanana = async (imageFile: File, prompt: string): Promise<EditedResult> => {
    const imageData = await fileToBase64(imageFile);

    const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData, prompt }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    return response.json();
};

export const combineImagesWithNanoBanana = async (image1File: File, image2File: File, prompt: string): Promise<EditedResult> => {
    const [image1Data, image2Data] = await Promise.all([
        fileToBase64(image1File),
        fileToBase64(image2File),
    ]);

    const response = await fetch('/api/combine-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image1Data, image2Data, prompt }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    return response.json();
};

export const generateVideoWithVeo = async (prompt: string, imageFile: File | null, onProgress: (message: string) => void): Promise<EditedResult> => {
    onProgress("Initializing video generation...");

    const imageData = imageFile ? await fileToBase64(imageFile) : null;

    const startResponse = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageData }),
    });

    if (!startResponse.ok) {
        const errorData = await startResponse.json();
        throw new Error(errorData.error || `Server responded with status ${startResponse.status}`);
    }

    const { operationName } = await startResponse.json();
    onProgress("Video request sent. Waiting for generation to start...");

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000));

        const statusResponse = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
        });

        if (!statusResponse.ok) {
            const errorData = await statusResponse.json();
            throw new Error(errorData.error || `Polling failed with status ${statusResponse.status}`);
        }

        const statusData = await statusResponse.json();
        onProgress(statusData.metadata?.progressMessage || "Processing video...");

        if (statusData.done) {
            onProgress("Finalizing video...");
            if (statusData.result) {
                return statusData.result;
            } else {
                throw new Error("Video generation completed, but no result was returned.");
            }
        }
    }
};


export const getCommunityPrompts = async (): Promise<CommunityPrompt[]> => {
    const response = await fetch('/api/community/prompts');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }
    return response.json();
};

export const sendMessageToBot = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, newMessage }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.reply;
};
