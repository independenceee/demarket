import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "~/components/GuideItem/GuideItem.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

const guides = [
    {
        title: "How to get started in DEMARKET?",
        Children: function (): JSX.Element {
            return (
                <span className={cx("faq-description")}>
                    <p className={cx("faq-paragraph")}>
                        DEMARKET is developed based on Cardano, an ecosystem with a series of outstanding advantages
                        compared to other Blockchain platforms, helping users to be assured of security, personal
                        information will never be compromised. violations, costs incurred are less expensive, ...
                    </p>
                    <p className={cx("faq-paragraph")}>
                        <b className={cx("faq-bold")}>Collateral</b> DEMARKET is not only a project of BLOCKALPHA, but
                        also part of a larger mission - to contribute to the decentralization of exchanges around the
                        world.
                    </p>
                    <p className={cx("faq-paragraph")}>
                        <Image
                            className={cx("faq-image")}
                            style={{ objectFit: "contain" }}
                            src={images.eternl}
                            alt=""
                        />
                    </p>
                </span>
            );
        },
    },
    {
        title: "What is DJED's stability mechanism?",
        Children: function (): JSX.Element {
            return (
                <span>
                    <p className={cx("faq-paragraph")}>
                        <b className={cx("faq-bold")}>Collateral</b> - Djed uses exogenous collateral (ADA). A typical
                        algorithmic stablecoin uses endogenous collateral, such as: FRAX, Synthetix and UST.
                    </p>
                </span>
            );
        },
    },

    {
        title: "What happens to SHEN's price if the ratio falls below 400%?",
        Children: function (): JSX.Element {
            return (
                <span>
                    <p className={cx("faq-paragraph")}>
                        The buying price of SHEN, is determined by the equation PbRc. This means that if Ptrc (price
                        target reserve coin) is not defined, the protocol takes the minimum price. Otherwise, it takes
                        the maximum between the equity divided by the number of RC and the minimum price.
                    </p>
                    <p className={cx("faq-paragraph")}>
                        The buying price of SHEN, is determined by the equation PbRc. This means that if Ptrc (price
                        target reserve coin) is not defined, the protocol takes the minimum price. Otherwise, it takes
                        the maximum between the equity divided by the number of RC and the minimum price.
                    </p>
                </span>
            );
        },
    },
];

export default guides;
