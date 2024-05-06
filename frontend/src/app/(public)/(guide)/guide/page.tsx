"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
import GuideItem from "~/components/GuideItem";
import guides from "~/data/guides";
import Banner from "~/components/Banner";
import Title from "~/components/Title";

const cx = classNames.bind(styles);

type Props = {};

const Guide = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <Banner
                title="Guide Center"
                description="Welcome to Demarket Guide - Cardano's test platform on-chain NFT Marketplace. Lets build and connect with the community together in the world."
            />

            <Title
                title="How can I help You?"
                description="You dont Know how to use feature of platform. Let me give you some Manual document."
            />
            <section className={cx("container")}>
                {guides.map(function (guide, index: number) {
                    return <GuideItem key={index} Children={guide.Children} title={guide.title} />;
                })}
            </section>
        </div>
    );
};

export default Guide;
