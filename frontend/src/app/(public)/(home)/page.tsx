"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import Background from "~/components/Background";
import styles from "./Home.module.scss";
import About from "~/components/About";
import Statistics from "~/components/Statistics";
import Title from "~/components/Title";
import Container from "~/components/Product/Container";
import { get } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";
import Slider from "~/components/Product/Slider";
import Skeleton from "react-loading-skeleton";

const cx = classNames.bind(styles);

type Props = {};

const Home = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplace", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    const renderSliders = ({
        repeatCount = 5,
        direction,
        data,
        duration = 10000,
    }: {
        repeatCount?: number;
        direction: "left" | "right";
        data: any;
        duration?: number;
    }) => {
        const sliders = [];
        for (let i = 0; i < repeatCount; i++) {
            sliders.push(
                <div
                    className={cx("marquee-wrapper", {
                        "slider__list-left": direction === "left",
                        "slider__list-right": direction === "right",
                    })}
                    style={
                        {
                            "--duration": `${duration}ms`,
                        } as Record<string, string>
                    }
                >
                    {data?.map(function (product: any, index: number) {
                        return (
                            <Slider
                                url={product.metadata.image}
                                type={product.metadata.mediaType}
                                key={index}
                                index={index}
                            />
                        );
                    })}
                </div>,
            );
        }
        return sliders;
    };

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />

                <section className={cx("content")}>
                    <Title title={"New Items"} description={"Explore our new products and find your favorites."} />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                            setPage={setPage}
                        />
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Trending Items"
                        description="The trending tech products of 2024. Let's shop now for the hottest products."
                    />
                    <article className={cx("marquee-section")}>
                        <div className={cx("trending__container")}>
                            <section className={cx("slider__wrapper")}>
                                <div className={cx("marquee-wrapper")}>
                                    {isLoading
                                        ? new Array(10).fill(null).map(function (value: any, index: number) {
                                              return (
                                                  <div
                                                      key={index}
                                                      className={cx("skeleton")}
                                                      data-aos="zoom-in-up"
                                                      data-aos-delay={`${100 * (index + 4)}`}
                                                      data-aos-duration={`${1000 * (index + 4)}`}
                                                  >
                                                      <Skeleton width={310} height={200} />
                                                  </div>
                                              );
                                          })
                                        : renderSliders({
                                              direction: "right",
                                              data: data?.products.slice(0, 5),
                                              duration: 20000,
                                          })}
                                </div>
                            </section>
                            <section className={cx("slider__wrapper")}>
                                <div className={cx("marquee-wrapper")}>
                                    {isLoading
                                        ? new Array(10).fill(null).map(function (value: any, index: number) {
                                              return (
                                                  <div
                                                      key={index}
                                                      className={cx("skeleton")}
                                                      data-aos="zoom-in-up"
                                                      data-aos-delay={`${100 * (index + 4)}`}
                                                      data-aos-duration={`${1000 * (index + 4)}`}
                                                  >
                                                      <Skeleton width={310} height={200} />
                                                  </div>
                                              );
                                          })
                                        : renderSliders({
                                              direction: "left",
                                              data: data?.products.slice(5, 12),
                                              duration: 20000,
                                          })}
                                </div>
                            </section>
                        </div>
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Selling Items"
                        description="Find amazing works from a variety of artists on our platform."
                    />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                        />
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Top Accounts"
                        description="Explore our most featured accounts and find the creators, entrepreneurs, and influencers you love."
                    />
                    <article className={cx("inner")}></article>
                </section>

                <Statistics />
                <About />
            </div>
        </main>
    );
};

export default Home;
