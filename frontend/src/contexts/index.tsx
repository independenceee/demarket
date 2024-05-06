"use client";

import React, { ReactNode, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const SmartContractProvider = lazy(() => import("~/contexts/providers/SmartContractProvider"));
const WalletProvider = lazy(() => import("~/contexts/providers/WalletProvider"));
const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));
const ModalProvider = lazy(() => import("~/contexts/providers/ModalProvider"));

const NetworkProvider = lazy(() => import("~/contexts/providers/NetworkProvider"));

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

const ContextProvider = function ({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <NetworkProvider>
                    <LucidProvider>
                        <WalletProvider>
                            <SmartContractProvider>{children}</SmartContractProvider>
                        </WalletProvider>
                    </LucidProvider>
                </NetworkProvider>
            </ModalProvider>
        </QueryClientProvider>
    );
};

export default ContextProvider;
