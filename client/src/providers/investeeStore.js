import { create } from 'zustand'

const useInvestee = create((set) => ({
    investees: {},
    setInvestee: (investee) => set((state) => ({ investees: investee })),
    removeInvestee: () => set({ investees: {} }),
}))
export default useInvestee