"use client";

import React from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import Search from "~/components/Filter/Search";
import Sort from "~/components/Filter/Sort";
import Verify from "~/components/Filter/Verify";
import Category from "~/components/Filter/Category";
import Container from "~/components/Product/Container";
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
                    <div className={cx("content-right")} data-aos="fade-left" data-aos-duration="1000">
                        <Container />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Marketplace;
