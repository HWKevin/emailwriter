import { OpenAIProvider } from './openaiProvider';
import { AnthropicProvider } from './anthropicProvider';
import type { AIProvider, AIProviderConfig } from './types';

export { OpenAIProvider } from './openaiProvider';
export { AnthropicProvider } from './anthropicProvider';
export type { AIProvider, AIProviderConfig } from './types';

export const SYSTEM_PROMPT = `You are an expert email writing assistant for professionals, students, founders, sales teams, and job seekers. Your task is to write clear, useful emails tailored to the user's context.

Requirements:
- Return a ready-to-copy email with a subject line and body
- Use the requested language, tone, and length
- Be specific to the recipient, goal, and key points
- Do not invent facts, names, offers, metrics, or commitments not provided by the user
- Avoid robotic phrasing, hype, and generic filler
- Keep the email concise unless the user asks for a detailed version
- For replies, acknowledge the original message when context is provided
- Do not include placeholders like [Your Name] unless the user explicitly asks for a template

Return only the email content, no explanations or meta-commentary.`;

/**
 * 根据协议类型选择 AI Provider。
 *
 * 环境变量：
 *   AI_PROTOCOL    = 'openai' | 'anthropic'（默认 openai）
 *   AI_API_KEY     = 你的 API 密钥
 *   AI_API_URL     = 服务端地址
 *   AI_MODEL       = 模型名称
 *
 * 兼容所有兼容 OpenAI / Anthropic 协议的 AI 服务商（包括阿里云百炼、DeepSeek 等）。
 */
export default function getAIProvider(): AIProvider {
  const protocol = process.env.AI_PROTOCOL || 'openai';
  const apiKey = process.env.AI_API_KEY || '';
  const apiUrl = process.env.AI_API_URL || '';
  const model = process.env.AI_MODEL || '';

  if (protocol === 'anthropic') {
    return new AnthropicProvider({
      apiKey,
      apiUrl: apiUrl || 'https://api.anthropic.com/v1/messages',
      model: model || 'claude-sonnet-4-20250514',
    });
  }

  // Default: openai 兼容协议
  return new OpenAIProvider({
    apiKey,
    apiUrl: apiUrl || 'https://api.openai.com/v1/chat/completions',
    model: model || 'gpt-4o',
  });
}
