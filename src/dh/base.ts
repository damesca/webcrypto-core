import { ProviderCrypto } from "../provider";

export abstract class DhProvider extends ProviderCrypto {

    public checkGenerateKeyParams(algorithm: DhKeyGenParams) {
        // generator
        this.checkRequiredProperty(algorithm, "generator");
        // TODO: check if generator format is correct

        // prime
        this.checkRequiredProperty(algorithm, "prime");
        // TODO: check if prime format is correct
    }

    public checkImportParams(algorithm: DhImportKeyParams) {
        // generator
        this.checkRequiredProperty(algorithm, "generator");
        // TODO: check if generator format is correct

        // prime
        this.checkRequiredProperty(algorithm, "prime");
        // TODO: check if prime format is correct
    }

    public abstract onGenerateKey(algorithm: DhKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>;
    public abstract onExportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
    public abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: DhImportKeyParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;

}