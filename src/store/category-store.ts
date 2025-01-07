import { create } from "zustand";

type NewCategoryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewCategoryStore = create<NewCategoryStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type EditCategory = {
  id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setID: (id: string) => void;
};
export const useEditCategoryStore = create<EditCategory>((set) => ({
  id: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setID: (categoryId) => set({ id: categoryId }),
}));
