import { create } from 'zustand'

const useListing = create((set) => ({
    listings: {},
    setListing: (listing) => set((state) => ({ listings: listing })),
    removeListing: () => set({ listings: {} }),
  }))
export default useListing