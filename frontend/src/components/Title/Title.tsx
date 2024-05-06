import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.scss";

const cx = classNames.bind(styles);

type Props = {
    title: string;
    description?: string;
};
const Title = function ({ title, description }: Props) {
    return (
        <header className={cx("wrapper")}>
            <h3 className={cx("title")}>{title}</h3>
            {description && <p className={cx("description")}>{description}</p>}
        </header>
    );
};

export default Title;
