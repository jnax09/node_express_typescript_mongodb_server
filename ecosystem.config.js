module.exports = {
  apps: [{
    name: 'express-typescript-mongodb',
    script: 'dist/server.js',
    args: 'one two',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'yarn install && pm2 reload ecosystem.config.js --env production'
    }
  }
};