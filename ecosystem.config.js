module.exports = {
  apps: [
    {
      name: 'LittleVictories',
      script: './server/src/index.ts'
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-131-151-82.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/little-victories-key.pem',
      ref: 'origin/main',
      repo: 'git@github.com:ryguy-coder-guys/LittleVictories.git',
      path: '/home/ubuntu/LittleVictories',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js'
    }
  }
};
