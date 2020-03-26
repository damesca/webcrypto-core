import { ProviderCrypto } from "../provider";

export interface OtParams extends Algorithm {
    isSender?: boolean,
    privateKey?: CryptoKey | CryptoKey[],
    publicKey?: CryptoKey | CryptoKey[],
    choice?: number | number[];
}

export abstract class OtProvider extends ProviderCrypto {

    public abstract onSetup(algorithm: OtParams): Promise<ArrayBuffer[][]>;
    public abstract onObliviousPublicKeyDerivation(algorithm: OtParams, publicDataSender: ArrayBuffer[], fixedDataReceiver: ArrayBuffer[][]): Promise<ArrayBuffer[]>;
    public abstract onObliviousEncrypt(algorithm: OtParams, obliviousPublicKey: ArrayBuffer[], fixedDataSender: ArrayBuffer[][], clearMessages: ArrayBuffer[]): Promise<ArrayBuffer[]>;
    public abstract onObliviousDecrypt(algorithm: OtParams, publicDataSender: ArrayBuffer[], privateDataReceiver: ArrayBuffer[], encryptedMessages: ArrayBuffer[]): Promise<ArrayBuffer[]>;

}