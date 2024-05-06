"use client";

import React from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

type Props = {};
const Home = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />
            </div>
        </main>
    );
};

export default Home;
