import { beforeEach, describe, expect, it } from 'vitest'
import {
  setOpenCommandDialog,
  toggleCommandDialog,
  useCommandDialogStore,
} from '@/stores/command-dialog-store'

describe('Command Dialog Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    setOpenCommandDialog(false)
  })

  describe('initial state', () => {
    it('should have open set to false initially', () => {
      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })
  })

  describe('setOpenCommandDialog', () => {
    it('should set open to true', () => {
      setOpenCommandDialog(true)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })

    it('should set open to false', () => {
      setOpenCommandDialog(true)
      setOpenCommandDialog(false)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })
  })

  describe('toggleCommandDialog', () => {
    it('should toggle from false to true', () => {
      toggleCommandDialog()

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })

    it('should toggle from true to false', () => {
      setOpenCommandDialog(true)
      toggleCommandDialog()

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })

    it('should toggle multiple times correctly', () => {
      // Initial state: false
      let state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)

      // First toggle: true
      toggleCommandDialog()
      state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)

      // Second toggle: false
      toggleCommandDialog()
      state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)

      // Third toggle: true
      toggleCommandDialog()
      state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })
  })

  describe('state transitions', () => {
    it('should handle opening dialog', () => {
      setOpenCommandDialog(true)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })

    it('should handle closing dialog', () => {
      setOpenCommandDialog(true)
      setOpenCommandDialog(false)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })

    it('should handle toggle to open', () => {
      toggleCommandDialog()

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })

    it('should handle toggle to close', () => {
      setOpenCommandDialog(true)
      toggleCommandDialog()

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })
  })

  describe('combined operations', () => {
    it('should handle set then toggle correctly', () => {
      setOpenCommandDialog(true)
      toggleCommandDialog()

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })

    it('should handle toggle then set correctly', () => {
      toggleCommandDialog()
      setOpenCommandDialog(false)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(false)
    })

    it('should handle multiple set operations', () => {
      setOpenCommandDialog(true)
      setOpenCommandDialog(true)
      setOpenCommandDialog(false)
      setOpenCommandDialog(true)

      const state = useCommandDialogStore.getState()
      expect(state.open).toBe(true)
    })
  })
})
