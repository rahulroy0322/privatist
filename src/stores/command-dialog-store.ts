import { create } from 'zustand'

type CommandDialogStore = {
  open: boolean
}

const useCommandDialogStore = create<CommandDialogStore>(() => ({
  open: false,
}))

const { setState: set } = useCommandDialogStore

const setOpenCommandDialog = (open: boolean) => set({ open })

const toggleCommandDialog = () => set((state) => ({ open: !state.open }))

export { setOpenCommandDialog, toggleCommandDialog, useCommandDialogStore }
