import type { AIProvider, AIProviderConfig } from './types';

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor(config: AIProviderConfig) {
    this.apiKey = config.apiKey;
    const rawUrl = config.apiUrl || 'https://api.openai.com/v1/chat/completions';
    this.apiUrl = rawUrl.endsWith('/chat/completions')
      ? rawUrl
      : rawUrl.replace(/\/+$/, '') + '/chat/completions';
    this.model = config.model || 'gpt-4o';
  }

  get providerName(): string {
    return 'openai';
  }

  get modelName(): string {
    return this.model;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: Array<{ role: string; content: string }> = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Failed to generate email';
  }
}

export default OpenAIProvider;
