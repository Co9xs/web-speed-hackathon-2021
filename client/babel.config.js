module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: '3.19',
        modules: 'auto',
        useBuiltIns: 'usage',
        targets: 'last 1 Chrome major version'
      },
    ],
    [
      "@babel/preset-react",
      {
        throwIfNamespace: false,
        runtime: 'automatic',
        development: process.env.NODE_ENV
      }
    ]
  ]
};
