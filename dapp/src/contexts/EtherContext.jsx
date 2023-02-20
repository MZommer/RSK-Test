import { createContext } from "react";
import etherHelper from "../utils/etherHelper";

export const EtherContext = createContext(new etherHelper());