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
                        />
                    </article>
                </section>

                <section className={cx("content")}>
                    <Title
                        title="Trending Items"
                        description="The trending tech products of 2024. Let's shop now for the hottest products."
                    />
                    <article className={cx("inner")}>
                        <div className={cx("trending__container")}>
                            <section className={cx("slider__wrapper")}>
                                <div className={cx("slider__list-left")}>
                                    {isLoading
                                        ? new Array(10).fill(null).map(function (value: any, index: number) {
                                              return (
                                                  <div
                                                      className={cx("skeleton")}
                                                      data-aos="zoom-in-up"
                                                      data-aos-delay={`${100 * (index + 4)}`}
                                                      data-aos-duration={`${1000 * (index + 4)}`}
                                                  >
                                                      <Skeleton width={310} height={200} />
                                                  </div>
                                              );
                                          })
                                        : data.products.slice(0, 5).map(function (product: any, index: number) {
                                              return (
                                                  <Slider
                                                      url={product.metadata.image}
                                                      type={product.metadata.mediaType}
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
                                          })}
                                </div>
                            </section>
                            <section className={cx("slider__wrapper")}>
                                <div className={cx("slider__list-right")}>
                                    {isLoading
                                        ? new Array(10).fill(null).map(function (value: any, index: number) {
                                              return <></>;
                                          })
                                        : data.products.slice(5, 12).map(function (product: any, index: number) {
                                              return (
                                                  <Slider
                                                      url={product.metadata.image}
                                                      type={product.metadata.mediaType}
                                                      key={index}
                                                      index={index}
                                                  />
                                              );
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
