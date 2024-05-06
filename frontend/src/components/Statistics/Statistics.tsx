"use client";
import React from "react";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import styles from "./Statistics.module.scss";

const cx = classNames.bind(styles);

type Props = {};
const Statistics = function ({}: Props) {
    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <ul className={cx("statistics")}>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="500">
                        <h2>
                            <CountUp start={0} end={120} duration={2} delay={0} />
                        </h2>
                        <p>PRODUCT</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1000">
                        <h2>
                            <CountUp start={0} end={120} duration={2} delay={0} />
                        </h2>
                        <p>TRANSACTION</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="1500">
                        <h2>
                            <CountUp start={0} end={120} duration={2} delay={0} />
                        </h2>
                        <p>TRENDING</p>
                    </li>
                    <li className={cx("statistic")} data-aos="fade-up" data-aos-duration="2000">
                        <h2>
                            <CountUp start={0} end={120} duration={2} delay={0} />
                        </h2>
                        <p>AUTHOR</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
