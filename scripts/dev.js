import { spawn } from 'child_process';

console.log('🚀 Starting full-stack development workspace...');

// Spawn Vite frontend server on port 3000
const vite = spawn('npx', ['vite', '--port=3000', '--host=0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '3000' }
});

// Spawn NestJS backend server on port 3001
const server = spawn('npx', ['tsx', 'server.ts'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '3001' }
});

// Handle graceful shutdown
const cleanup = () => {
  console.log('\nStopping development processes...');
  vite.kill('SIGINT');
  server.kill('SIGINT');
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
