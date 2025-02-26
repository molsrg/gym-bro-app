import { v4 as uuidv4 } from 'uuid'

export default defineNuxtPlugin(() => {
  if (typeof globalThis.crypto?.randomUUID !== 'function') {
    Object.defineProperty(globalThis.crypto, 'randomUUID', {
      value: uuidv4,
      configurable: true,
    })
  }
})
