"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import CountUp from "react-countup";
import styles from "./Item.module.scss";
import images from "~/assets/images";
import convertIpfsAddressToUrl from "~/helpers/convert-ipfs-to-url";
import checkMediaType from "~/helpers/check-media-type";
import convertHexToString from "~/helpers/convert-hex-to-string";
import Copy from "~/components/Copy";
import { ProductType } from "~/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {
    product: ProductType;
    index: number;
};

const ProductItem = function ({ product, index }: Props) {
    const router = useRouter();

    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div
                className={cx("container")}
                onClick={() => router.push(`/detail/${product.policyId + product.assetName}`)}
            >
                <section className={cx("image__wrapper")}>
                    {checkMediaType(product?.type, "image") && (
                        <img className={cx("image")} src={String(convertIpfsAddressToUrl(product?.image))} alt="" />
                    )}
                    {checkMediaType(product?.type, "video") && (
                        <video autoPlay muted loop className={cx("image")}>
                            <source src={String(convertIpfsAddressToUrl(product?.image))} type="video/mp4" />
                        </video>
                    )}

                    {checkMediaType(product?.type, "application") && (
                        <iframe className={cx("image")} src={String(convertIpfsAddressToUrl(product?.image))}></iframe>
                    )}

                    {checkMediaType(product?.type, "audio") && (
                        <audio controls>
                            <source src={String(convertIpfsAddressToUrl(product?.image))} type="audio/mpeg" />
                        </audio>
                    )}
                </section>
                <section className={cx("content")}>
                    <h3 className={cx("content__title")}>{convertHexToString(product?.assetName)}</h3>
                    <h3 className={cx("content__title")}>{product?.type ? product?.type.split("/").pop() : ""}</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Image
                            width={2000}
                            height={2000}
                            className={cx("avatar")}
                            src={product?.avatar !== null ? convertIpfsAddressToUrl(product?.avatar) : images.user}
                            alt=""
                        />

                        {/* {product.price && <h3 className={cx("name")}>{product.sellerAddress}</h3>}
                        {!product.price && <h3 className={cx("name")}>{product.currentAddress}</h3>} */}
                    </div>
                    {product.price && (
                        <h3 className={cx("price")}>
                            <CountUp start={0} end={Number(product.price) / 1000000 || 0} duration={2} delay={0} /> ₳
                        </h3>
                    )}
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>
                        <span className={cx("policyId__convert")}>{product.policyId}</span>{" "}
                        <span>{product.policyId.slice(-5)}</span>
                    </p>
                    <Copy value={product.policyId} />
                </section>
            </div>
        </div>
    );
};

export default ProductItem;
