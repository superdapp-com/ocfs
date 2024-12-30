import { evmProtocolList } from "./protocol/evm.js";
import { evmTokenList } from "./token/evm.js";
import { svmProtocolList } from "./protocol/svm.js";
import { svmTokenList } from "./token/svm.js";



export const buildTokenList = async () => {
    evmTokenList();
    // svmTokenList();
}

export const buildProtocolList = async () => {
    evmProtocolList();
    // svmProtocolList();
}

export const buildLists = async () => {
    buildTokenList();
    buildProtocolList();
}