module.exports = {
  experimental: {
    async rewrites() {
      return [
        { source: "/host/:id", destination: "/host/test" },
        { source: "/quiz/:id", destination: "/quiz/[id].html" },
        { source: "/join/:id", destination: "/join/[id].html" },
      ];
    },
  },
};
