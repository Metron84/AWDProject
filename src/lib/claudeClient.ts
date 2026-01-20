import Anthropic from '@anthropic-ai/sdk';

let claudeClientInstance: Anthropic | null = null;

function getClaudeClient(): Anthropic {
  if (!claudeClientInstance) {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      throw new Error('Missing ANTHROPIC_API_KEY environment variable. Please set it in your Vercel environment variables.');
    }

    claudeClientInstance = new Anthropic({
      apiKey: anthropicApiKey,
    });
  }

  return claudeClientInstance;
}

export const claudeClient = new Proxy({} as Anthropic, {
  get(_target, prop) {
    const client = getClaudeClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  }
});

export default claudeClient;
