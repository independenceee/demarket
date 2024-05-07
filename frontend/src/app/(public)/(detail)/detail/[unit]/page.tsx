"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import classNames from "classnames/bind";
import Skeleton from "react-loading-skeleton";
import Container from "~/components/Product/Container";
import Link from "next/link";
import styles from "./Detail.module.scss";
import Title from "~/components/Title";
import Card from "~/components/Card";
import icons from "~/assets/icons";
import History from "~/components/History";
import { get } from "~/utils/http-request";
import { useQuery } from "@tanstack/react-query";
const cx = classNames.bind(styles);
type Props = {};

const Detail = function ({}: Props) {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplace", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
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

                            <div className={cx("detail")}>
                                <Card title="NftItem" icon={icons.glass} />
                                <Card title="NftItem" icon={icons.glass} />
                                <Card title="NftItem" icon={icons.glass} />
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <History
                        page={null!}
                        setPage={null!}
                        data={null!}
                        isError={null!}
                        isLoading={null!}
                        className={cx("orders")}
                    />
                </section>

                <section className={cx("other")}>
                    <Title title="More Items" />
                    <article className={cx("inner")}>
                        <Container
                            products={data?.products}
                            page={page}
                            loading={isLoading}
                            totalPage={data?.totalPage}
                        />
                    </article>
                </section>
            </div>
        </main>
    );
};

export default Detail;
