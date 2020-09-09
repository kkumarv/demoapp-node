module.exports = {
    apps: [
      {
        name: 'SERVER',
        script: 'bin/server.js',
        watch: true,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
        ignore_watch: [
          'node_modules',
          'files',
          'coverage',
          'logs',
          'newrelic_agent.log',
          '.git',
          'resources',
        ],
      },
    ],
  };
  