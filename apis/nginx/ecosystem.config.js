module.exports = {
    apps: [
      {
        name: "auth-service",
        script: "npm",
        args: "start",
        cwd: "./auth",
        env: { PORT: 3001 }
      },
      {
        name: "wellness-service",
        script: "npm",
        args: "start",
        cwd: "./wellness",
        env: { PORT: 3002 }
      },
      {
        name: "care-service",
        script: "npm",
        args: "start",
        cwd: "./care",
        env: { PORT: 3003 }
      },
      {
        name: "community-service",
        script: "npm",
        args: "start",
        cwd: "./community",
        env: { PORT: 3004 }
      },
      {
        name: "progress-service",
        script: "npm",
        args: "start",
        cwd: "./progress",
        env: { PORT: 3005 }
      }
    ]
  };
  