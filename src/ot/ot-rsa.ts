import { ProviderKeyUsages } from "../types";
import { OtProvider } from "./base";

export abstract class OtRsaProvider extends OtProvider {

    public readonly name = "OT-RSA";

    public usages: ProviderKeyUsages = {
        privateKey: ["decrypt", "unwrapKey"],
        publicKey: ["encrypt", "wrapKey"],
      };

}