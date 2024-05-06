import classNames from "classnames/bind";
import Image from "next/image";
import React from "react";
import images from "~/assets/images";
import Link from "next/link";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);
type Props = {
    className?: string;
};

function Logo({ className }: Props) {
    return (
        <Link href={"/"} className={cx("logo-wrapper", className)}>
            <Image className={cx("logo-image")} src={images.logo} alt="dmm-logo" />
        </Link>
    );
}

export default Logo;
