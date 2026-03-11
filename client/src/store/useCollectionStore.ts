import { create } from 'zustand';

type CollectionState = {
  featuredCount: number;
  draftCollections: string[];
  incrementFeatured: () => void;
};

export const useCollectionStore = create<CollectionState>((set) => ({
  featuredCount: 3,
  draftCollections: ['Nature Moodboard', 'Street Photography', 'Minimal Interiors'],
  incrementFeatured: () => set((state) => ({ featuredCount: state.featuredCount + 1 })),
}));
