"use client";

import {
    Data,
    Lucid,
    TxHash,
    TxSigned,
    UTxO,
    Credential,
    Lovelace,
    Address,
    Constr,
    PolicyId,
    Script,
} from "lucid-cardano";
import React, { ReactNode, useContext, useState } from "react";
import SmartContractContext from "~/contexts/components/SmartContractContext";
import { WalletContextType } from "~/types/contexts/WalletContextType";
import WalletContext from "~/contexts/components/WalletContext";
import readValidator from "~/utils/read-validator";
import { MarketplaceDatum } from "~/constants/datum";
import { MarketplaceRedeemer } from "~/constants/redeemer";
import { toast } from "react-toastify";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { refresh } = useContext<WalletContextType>(WalletContext);
    const [txHashRefund, setTxHashRefund] = useState<TxHash>("");
    const [waiting, setWaiting] = useState<boolean>(false);

    const buy = function ({ lucid }: { lucid: Lucid }) {};

    const sell = function ({ lucid }: { lucid: Lucid }) {};

    const refund = async function ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: PolicyId;
        assetName: string;
    }) {
        try {
            const validator: Script = readValidator();

            const scriptAddress: string = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(scriptAddress);
            let existAsset: any;

            const utxos = scriptUtxos.filter((asset: any, index: number) => {
                const checkAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
                    existAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                    return true;
                }
                return false;
            });

            const tx = await lucid
                .newTx()
                .collectFrom(utxos, MarketplaceRedeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            const success = await lucid.awaitTx(txHash);
            if (success) {
                setTxHashRefund(txHash);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setWaiting(false);
        }
    };

    return (
        <SmartContractContext.Provider
            value={{
                waiting,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
