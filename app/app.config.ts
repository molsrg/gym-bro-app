export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: false,
    duration: 2000,
  },
  theme: {
    radius: 0.25,
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
      lime: 'lime',
      rose: 'rose',
      gray: 'gray',
      stone: 'stone',
      cyan: 'cyan',
      black: 'black',
      indigo: 'indigo',
      orange: 'orange',
    },
    modal: {
      slots: {
        content: 'top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[95%] h-auto  rounded-[calc(var(--ui-radius)*2)] shadow-lg ring ring-(--ui-border)',
        footer: 'justify-end',
      },
    },
    slideover: {
      slots: {
        footer: 'justify-end',
      },
    },
  },
})
