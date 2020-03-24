import { ProviderKeyUsages } from "../types";
import { DhProvider } from "./base";

export interface DhRawParams extends Algorithm { }

export abstract class DhRawProvider extends DhProvider {

    public readonly name = "DH-RAW";

    public usages: ProviderKeyUsages = {
        privateKey: ["decrypt", "unwrapKey", "sign"],
        publicKey: ["encrypt", "wrapKey", "verify"],
    };

    public abstract onEncrypt(algorithm: DhRawParams, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    public abstract onDecrypt(algorithm: DhRawParams, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    public abstract onSign(algorithm: DhRawParams, key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer>;
    public abstract onVerify(algorithm: DhRawParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer): Promise<boolean>;

}