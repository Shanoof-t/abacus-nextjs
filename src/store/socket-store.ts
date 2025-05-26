import { Socket } from "socket.io-client";
import { create } from "zustand";

type ISocket = {
  socket: Socket | null;
  setSocket: (s: Socket) => void;
};
export const useSocketStore = create<ISocket>((set) => ({
  socket: null,
  setSocket: (s) => set({ socket: s }),
}));
