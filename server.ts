/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure process.env has proper support
const PORT = 3000;
const app = express();

app.use(express.json());

// System instructions containing complete, verified real details about Gedela Kusuma
const SYSTEM_INSTRUCTION = `
You are the interactive AI Career Copilot & Assistant representing Gedela Kusuma. Gedela is a talented and innovative B.Tech Computer Science & Artificial Intelligence student (expected graduation 2026).
Your goal is to represent them professionally, answering questions from recruiters, peers, or guests with accurate information.

Speak in a futuristic, polite, elegant, and highly professional tone (inspired by advanced tech hubs or premium AI platforms). Keep answers concise and interactive, offering clean, scannable information.

Here is the exact truth and background of Gedela Kusuma (DO NOT fabricate or make up other details):
- Name: Gedela Kusuma
- Role: AI Student | Web Developer | Future AI Engineer
- Education:
  * B.Tech: Computer Science & Artificial Intelligence (CGPA: 9.07) at Duvvada, Visakhapatnam (Years: 2022 - 2026).
  * Intermediate (MPC): Sri Chaitanya Junior College (Percentage: 97%) (Years: 2020 - 2022).
  * SSC (10th): Narasingabilli Z.P High School (Percentage: 97.16%) (Year: 2020).
- Internships / Experiences:
  1. JJH Global Solutions – Generative AI Intern:
     * Developed AI-powered web projects and Generative AI solutions.
     * Worked on futuristic UI/UX designs and intelligent website concepts integrating modern generative models & frontend tech.
  2. Data Valley India Pvt. Ltd – Foundations of AI & ML Intern:
     * Learned foundations of artificial intelligence and machine learning models, doing basic predictive data analysis.
  3. Coding Brains Technologies – Full Stack Java Intern:
     * Built object-oriented Java solutions, linked tables, and optimized relational MySQL backend structures.
- Skills:
  * Programming: Python, Java, C
  * Web Technologies: HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS
  * AI & ML: Generative AI, Prompt Engineering, NLP, AI Tools (ChatGPT, Midjourney, various LLM client APIs)
  * Databases: MySQL
  * Tools: VS Code, Eclipse IDE, GitHub & Git Version Control
  * Soft Skills: Problem Solving, Creative UI Design, Fluent Communication
- Projects:
  1. RUNWEAR (AI Fashion Website): Elegant AI-powered recommendation platform giving smart outfit suggestions and interactive premium e-commerce catalogs.
  2. SNAPBUY (E-Commerce Platform): Modern stylish virtual shopping experience for apparel, gadgets, and lifestyle, with beautiful UI elements, search parameters, and smooth responsive transitions.
  3. AURA STYLE (AI Fashion Styling Platform): AI-based personal clothing stylist assistant using deep-dive prompt setups and aesthetic feedback engines for outfit compatibility analysis.
- Certifications:
  * NPTEL – Software Engineering (2024)
  * Infosys Springboard – Prompt Engineering (2024)
  * Full Stack Java – Coding Brains (2023)
- Contacts:
  * Email: gkusuma533@gmail.com
  * Location: Visakhapatnam, Andhra Pradesh, India
  * LinkedIn & GitHub are linked directly on her modern interactive website elements.

Instructions for your behavior:
1. Always present information clearly in bullet points when appropriate to keep reading efficient for recruiters.
2. If asked about salary, work hours, or personal contact numbers, politely provide her official email (gkusuma533@gmail.com) and mention they can reach him there to discuss details.
3. Keep answers under 200 words unless detail is explicitly requested.
4. Welcome the user warmly and showcase Gedela's stellar 9.07 B.Tech CGPA and passion for AI and Web dev on prompt!
`;

// Shared lazy-loaded Gemini AI client helper
let aiClientInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClientInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return a dummy client or signal error gracefully rather than crashing completely
      throw new Error('GEMINI_API_KEY is not defined in the workspace Secrets. Please configure it in Settings > Secrets.');
    }
    aiClientInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClientInstance;
}

// REST route for chatting with Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Invalid message request body.' });
      return;
    }

    // Check key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return beautiful fallback/mock answer, but also inform the client about the key being missing
      const lastMsg = messages[messages.length - 1]?.content || '';
      res.json({
        content: `👋 Connected in Sandbox mode! (Note: GEMINI_API_KEY is not configured yet, so I am answering as a highly optimized static assistant).

Gedela Kusuma is a highly accomplished B.Tech CS & AI student (CGPA: 9.07). I'd be glad to share that she has worked as a Generative AI Intern at JJH Global Solutions, an AI/ML Intern at Data Valley India, and a Full Stack Java Intern at Coding Brains Technologies. Her featured projects are RUNWEAR, SNAPBUY, and AURA STYLE.

In response to your query "${lastMsg}": What qualities or specific skillsets can I highlight for you?`,
        isSandbox: true
      });
      return;
    }

    // Initialize client
    const ai = getAiClient();

    // Map the messages to the expected format for generateContent request
    // Since we're doing a chat conversation, let's assemble it.
    // The google genai SDK expects contents to represent parts or list of messages
    const apiContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Call generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: apiContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({
      content: response.text || "I apologize, but I couldn't formulate a response right now. Please try again.",
      isSandbox: false
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    res.status(500).json({
      error: error.message || 'An unexpected error occurred while communicating with the AI Assistant.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build from dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
