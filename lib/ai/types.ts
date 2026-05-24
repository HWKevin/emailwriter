export interface AIProvider {
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  readonly providerName: string;
  readonly modelName: string;
}

export interface AIProviderConfig {
  apiKey: string;
  apiUrl: string;
  model: string;
  protocol?: 'openai' | 'anthropic';
}
