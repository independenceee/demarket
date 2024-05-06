import React from "react";
import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import Image from "next/image";

const cx = classNames.bind(styles);

type Props = {
    image: any;
    video: any;
    className?: string;
};

const Video = function ({ className, image, video }: Props) {
    return (
        <div className={cx("wrapper", className)}>
            <Image className={cx("image")} src={image} alt="" />
            <video className={cx("video")} autoPlay={true} loop={true} playsInline={true}>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    );
};

export default Video;
