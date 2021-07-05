module.exports = {
  apps: [
    {
      name: 'LittleVictories',
      script: './server/src/index.ts',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'localhost:3000',
      key: '~/.ssh/little-victories-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:ryguy-coder-guys/LittleVictories.git',
      path: '/home/ubuntu/LittleVictories',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
