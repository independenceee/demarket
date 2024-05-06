import React from "react";
import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Video from "~/components/Video";
import Button from "~/components/Button";
import images from "~/assets/images";
import routes from "~/configs/routes";

const cx = classNames.bind(styles);

const About = function () {
    return (
        <section className={cx("about")}>
            <div className={cx("stats-inner")}>
                <div className={cx("about-inner")}>
                    <div className={cx("video-iframe-wrapper")}>
                        <iframe
                            className={cx("video-iframe")}
                            src="https://www.youtube.com/embed/DCWY93O_QAU"
                            title="Daultarget - Mục Tiêu Kép"
                            frameBorder={"none"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                    <div className={cx("about-content-wrapper")}>
                        <h2 className={cx("about-title")}>About Demarket</h2>
                        <p className={cx("about-description")}>Open Your Own Marketplace</p>
                        <span className={cx("about-content")}>
                            In the era of digital transformation with the rise of digital art, NFT has gradually changed
                            the concept of ownership and created a revolution connecting with digital assets. demarket,
                            a decentralized NFT exchange on the Cardano Blockchain platform from BlockAlpha.
                        </span>
                        <span className={cx("about-content")}>
                            Demarket is a decentralized NFT exchange project developed by the BlockAlpha team. The
                            project has received high ratings from the review (CR) community with a score of 4.61, and
                            ranked 2nd in the ranking in the Startup & Onboarding for Students category of Project
                            Catalyst Fund 10.
                        </span>
                        <Button className={cx("stat-button")} href={routes.guide}>
                            Contact us
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
