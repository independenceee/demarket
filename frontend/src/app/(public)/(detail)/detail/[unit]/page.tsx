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
import checkMediaType from "~/helpers/check-media-type";
import convertIpfsAddressToUrl from "~/helpers/convert-ipfs-to-url";
import { LucidContextType } from "~/types/contexts/LucidContextType";
import LucidContext from "~/contexts/components/LucidContext";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType";
import SmartContractContext from "~/contexts/components/SmartContractContext";
const cx = classNames.bind(styles);
type Props = {};

const Detail = function ({}: Props) {
    const [page, setPage] = useState<number>(1);
    const { unit }: any = useParams();
    const [policyId] = useState<string>(unit.slice(0, 56));
    const [assetName] = useState<string>(unit.slice(56));
    const { lucid } = useContext<LucidContextType>(LucidContext);
    const { sell, buy, refund } = useContext<SmartContractContextType>(SmartContractContext);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["Marketplaces", page],
        queryFn: () => get(`/marketplaces?page=${page}&pageSize=12`),
    });

    const {
        data: product,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
    } = useQuery({
        queryKey: ["Product", page],
        queryFn: () => get(`/marketplaces?policyId=${policyId}&assetName=${assetName}`),
        enabled: Boolean(policyId) || Boolean(assetName),
    });

    const {
        data: histories,
        isLoading: isLoadingHistories,
        isError: isErrorHistories,
    } = useQuery({
        queryKey: ["Histories", page],
        queryFn: () => get(`/histories?page=${page}&pageSize=12`),
        enabled: Boolean(policyId) || Boolean(assetName),
    });
    console.log(histories);

    const handleSell = async function () {
        await sell({
            lucid: lucid,
            policyId: product.policyId,
            assetName: product.assetName,
            authorAddress: product.authorAddress,
            price: BigInt(100000000),
            royalties: BigInt(100000000 / 100),
        });
    };

    const handleBuy = async function () {
        await buy({
            lucid: lucid,
            products: [product],
        });
    };

    const handleRefund = async function () {
        await refund({
            lucid: lucid,
            policyId: product.policyId,
            assetName: product.assetName,
        });
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <section className={cx("about")}>
                    <div className={cx("stats-inner")}>
                        <div className={cx("about-inner")}>
                            <div className={cx("video-iframe-wrapper")}>
                                {checkMediaType(product?.metadata?.mediaType, "image") && (
                                    <img
                                        className={cx("video-iframe")}
                                        src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                        alt=""
                                    />
                                )}

                                {checkMediaType(product?.metadata?.mediaType, "video") && (
                                    <video autoPlay muted loop className={cx("video-iframe")}>
                                        <source
                                            src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}

                                {checkMediaType(product?.metadata?.mediaType, "application") && (
                                    <iframe
                                        frameBorder={"none"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        className={cx("video-iframe")}
                                        src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                    ></iframe>
                                )}

                                {checkMediaType(product?.metadata?.mediaType, "audio") && (
                                    <audio controls>
                                        <source
                                            src={String(convertIpfsAddressToUrl(product?.metadata?.image))}
                                            type="audio/mpeg"
                                        />
                                    </audio>
                                )}
                            </div>

                            <button onClick={handleSell}>Sell</button>
                            <button onClick={handleBuy}>Buy</button>
                            <button onClick={handleRefund}>Refund</button>

                            <div className={cx("detail")}>
                                {/* <Card title="NftItem" icon={icons.glass} />
                                <Card title="NftItem" icon={icons.glass} /> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <History
                        page={page}
                        setPage={setPage}
                        data={histories?.histories}
                        isError={isErrorHistories}
                        isLoading={isLoadingHistories}
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
