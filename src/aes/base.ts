import { ProviderCrypto } from "../provider";

export abstract class AesProvider extends ProviderCrypto {

  public checkGenerateKeyParams(algorithm: AesKeyGenParams) {
    // length
    this.checkRequiredProperty(algorithm, "length");
    if (typeof algorithm.length !== "number") {
      throw new TypeError("length: Is not of type Number");
    }
    switch (algorithm.length) {
      case 128:
      case 192:
      case 256:
        break;
      default:
        throw new TypeError("length: Must be 128, 192, or 256");
    }
  }

  public checkDerivedKeyParams(algorithm: AesKeyGenParams) {
    this.checkGenerateKeyParams(algorithm);
  }

  public abstract onGenerateKey(algorithm: AesKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  public abstract onExportKey(format: KeyFormat, key: CryptoKey): Promise<JsonWebKey | ArrayBuffer>;
  public abstract onImportKey(format: KeyFormat, keyData: JsonWebKey | ArrayBuffer, algorithm: Algorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;

}
