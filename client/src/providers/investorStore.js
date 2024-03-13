import { create } from 'zustand'

const useInvestor = create((set) => ({
    investors: {},
    setInvestor: (investor) => set((state) => ({ investors: investor })),
    removeInvestor: () => set({ investors: {} }),
  }))
export default useInvestor