import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import { encode } from "cbor-x";
import * as marketplace from "../libs/marketplace";

class MarketPlaceValidator {
    read(): SpendingValidator {
        const marketplaceValidator = marketplace.default.validators.find(function (validator) {
            return validator.title === "contract.contract";
        });

        if (!marketplaceValidator) {
            throw new Error("Marketplace validator not found");
        }

        const marketplaceScript: string = toHex(encode(fromHex(marketplaceValidator.compiledCode)));

        return {
            type: "PlutusV2",
            script: marketplaceScript,
        };
    }
}

export default MarketPlaceValidator;
