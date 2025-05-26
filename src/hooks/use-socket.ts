"use client";
import { useSocketStore } from "@/store/socket-store";
import { connectSocket } from "@/utils/socket";

export const useSocket = () => {
  const { setSocket } = useSocketStore();

  function init() {
    const socket = connectSocket();    
    setSocket(socket);
  }

  return { init };
};
