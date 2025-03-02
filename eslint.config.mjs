import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['**/*.toml'],
    rules: {
      'no-inline-comments': 'error',
      'spaced-comment': ['error', 'always', {
        exceptions: ['-', '+'],
        markers: ['/'],
      }],
      'no-warning-comments': ['error', { terms: ['fixme', 'xxx'], location: 'start' }],
    },
  },

  {
    files: ['src/**/*.{js,ts,vue}'],
  },
)
