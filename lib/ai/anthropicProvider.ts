import type { AIProvider, AIProviderConfig } from './types';

export class AnthropicProvider implements AIProvider {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor(config: AIProviderConfig) {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl || 'https://api.anthropic.com/v1/messages';
    this.model = config.model || 'claude-sonnet-4-20250514';
  }

  get providerName(): string {
    return 'anthropic';
  }

  get modelName(): string {
    return this.model;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        { role: 'user', content: prompt },
      ],
    };
    if (systemPrompt) {
      body.system = systemPrompt;
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.content?.[0]?.text || 'Failed to generate email';
  }
}

export default AnthropicProvider;
