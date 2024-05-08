"use client";

import React from "react";
import { Pagination, Stack } from "@mui/material";
import { ProductType } from "~/types/GenericsType";

type Props = {
    page?: number;
    totalPage?: number;
    loading?: boolean;
    onChange?: (event: React.ChangeEvent<unknown>, value: number) => {};
};

const Paginate = function ({ page, loading, totalPage, onChange }: Props) {
    if (!loading) {
        return (
            <Stack spacing={10}>
                <Pagination count={totalPage} shape="rounded" page={page} onChange={onChange} />
            </Stack>
        );
    }
};
export default Paginate;
