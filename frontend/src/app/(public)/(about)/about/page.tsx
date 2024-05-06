"use client";

import React from "react";
import classNames from "classnames/bind";
import Statistics from "~/components/Statistics";
import Founder from "~/components/Founder";
import Title from "~/components/Title";
import styles from "./About.module.scss";
import founders from "~/data/founders";
import About from "~/components/About";
import Banner from "~/components/Banner";

const cx = classNames.bind(styles);

const AboutPage = function () {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <Banner
                    title="About Us"
                    description="Blockalpha brings an exciting solution to access the WEB3 platform for everyone, with the ultimate goal of transforming the model from WEB2 to WEB3. We provide technologies to address issues related to transparency, information security, and eliminate third-party interference."
                />
                <Title title="About Us" className={cx("title-wrapper")} />
                <About />
                <Statistics />
                <section className={cx("founder-wrapper")}>
                    <Title
                        title="Our Foundation"
                        description="We are impartial and independent, and every day we create distinctive, world-class
                            programmes and develop"
                    />

                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder: any, index: number) {
                            return (
                                <Founder
                                    index={index}
                                    role={founder.role}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder.company}
                                    avatar={founder.avatar}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;
