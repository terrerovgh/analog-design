import { defineConfig } from 'astro/config';

const owner = 'terrerovgh';
const repo = 'analog-design';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// Analog Design — Astro config
export default defineConfig({
  site: `https://${owner}.github.io`,
  base: isGitHubActions ? `/${repo}` : undefined,
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
