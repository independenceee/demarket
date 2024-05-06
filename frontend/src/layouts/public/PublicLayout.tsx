"use client";

import React, { ReactNode, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PublicLayout.module.scss";
import Loading from "~/app/(loading)/loading";
import Form from "~/layouts/components/Form";
import Notification from "~/layouts/components/Notification";
import Header from "~/layouts/components/Header";
import Footer from "~/layouts/components/Footer";
type Props = {
    children: ReactNode;
};

const cx = classNames.bind(styles);
const LOADING_TIME = 3000;
const PublicLayout = function ({ children }: Props) {
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setPageLoading(false);
        }, LOADING_TIME);
    }, []);

    return (
        <main className={cx("wrapper")}>
            <Form />
            {/* <Header /> */}
            <div>
                {children}
                <Footer/>
            </div>
            
            <Notification />
            {pageLoading && <Loading />}
        </main>
    );
};

export default PublicLayout;
