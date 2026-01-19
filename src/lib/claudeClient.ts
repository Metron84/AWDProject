import Anthropic from '@anthropic-ai/sdk';

/**
 * Initializes the Anthropic Claude client with the API key from environment variables.
 * @returns {Anthropic} Configured Claude client instance.
 */
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  throw new Error('Missing ANTHROPIC_API_KEY environment variable');
}

export const claudeClient = new Anthropic({
  apiKey: anthropicApiKey,
});

export default claudeClient;
