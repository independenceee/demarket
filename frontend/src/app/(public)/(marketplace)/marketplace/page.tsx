"use client";

import React from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import Search from "~/components/Filter/Search";
import Sort from "~/components/Filter/Sort";
import Verify from "~/components/Filter/Verify";
import Category from "~/components/Filter/Category";

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
                    <div className={cx("content-left")}>
                        <div className={cx("content-left-inner")} data-aos="fade-right" data-aos-duration="1000">
                            <Search />
                            <Category />
                            <Sort sortBySearchParam="" setSortBySearchParam={null!} />
                            <Verify />
                        </div>
                    </div>
                    {/* <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer nfts={assetsFilter} itemsPerPage={12} loading={loadingAssetsFromSmartContract} />
                    </div> */}
                </section>
            </div>
        </div>
    );
};

export default Marketplace;
