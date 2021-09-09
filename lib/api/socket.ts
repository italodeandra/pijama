import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import socketIOClient, { Socket } from "socket.io-client";
import { isServer } from "../utils/isBrowser";

declare global {
  // noinspection ES6ConvertVarToLetConst
  var io: SocketServer;
}

// noinspection JSUnusedGlobalSymbols
export function setupSocketServer(server: Server) {
  global.io = new SocketServer(server);
}

let cachedSocked: SocketServer | Socket;

const socket = new Proxy<SocketServer | Socket>({} as any, {
  get: function (target, prop) {
    return (...props: any) => {
      cachedSocked = cachedSocked || isServer ? global.io : socketIOClient();
      return (cachedSocked as any)[prop](...props);
    };
  },
});

export default socket;
