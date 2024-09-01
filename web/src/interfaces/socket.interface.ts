import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../common/socket/interface";

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
