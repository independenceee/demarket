"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("~/contexts/providers/LucidProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return <LucidProvider>{children}</LucidProvider>;
};

export default ContextProvider;
