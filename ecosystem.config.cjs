module.exports = {
  apps: [
    {
      name: 'polar-backend',
      script: 'backend/src/server.js',
      cwd: __dirname,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        HOST: '0.0.0.0'
      }
    },
    {
      name: 'polar-frontend',
      script: 'node_modules/vite/bin/vite.js',
      args: 'preview --host 0.0.0.0 --port 5173',
      cwd: './frontend',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
