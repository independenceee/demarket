"use client";

import React from "react";

import classNames from "classnames/bind";
import Background from "~/components/Background";
// import NftContainer from "@/components/NftContainer";
// import Search from "@/components/Search/Search";
// import Category from "@/components/Category";
// import Verify from "@/components/Verify";
// import SortBy from "@/components/SortBy";

import styles from "./Marketplace.module.scss";
const cx = classNames.bind(styles);

type Props = {};

const Marketplace = function ({}: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <title>Marketplace - Demarket</title>
            <div className={cx("container")}>
                <Background />
                <section className={cx("content")}>
                    {/* <div className={cx("content__left--wrapper")}>
                        <div className={cx("content__left--container")} data-aos="fade-right" data-aos-duration="1000">
                            <Search searchValueParam={searchValueParam} setSearchValueParam={setSearchValueParam} />
                            <Category
                                categorySearchParam={categorySearchParam}
                                setCategorySearchParam={setCategorySearchParam}
                            />
                            <SortBy sortBySearchParam={sortBySearchParam} setSortBySearchParam={setSortBySearchParam} />
                            <Verify verifySearchParam={verifySearchParam} setVerifySearchParam={setVerifySearchParam} />
                        </div>
                    </div>
                    <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer nfts={assetsFilter} itemsPerPage={12} loading={loadingAssetsFromSmartContract} />
                    </div> */}
                </section>
            </div>
        </div>
    );
};

export default Marketplace;
