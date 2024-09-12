const dev = process.env.NODE_ENV !== 'production';
export const PAHIRAM_BACKEND_API_URL = process.env.NEXT_PUBLIC_PAH_BACKEND;

export const server = dev ? process.env.NEXT_PUBLIC_PAH_BACKEND : 'https://your_deployment.server.com';