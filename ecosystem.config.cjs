module.exports = {
  apps: [
    {
      name: 'polar-backend',
      script: 'backend/src/server.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        HOST: '0.0.0.0'
      }
    },
    {
      name: 'polar-frontend',
      script: 'npm',
      args: '--prefix frontend run preview -- --host 0.0.0.0 --port 5173',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
