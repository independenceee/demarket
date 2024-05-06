"use client";

import React, { ChangeEvent, useContext, useState, useCallback, memo } from "react";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "~/components/Icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CategoryItemType } from "~/types/GenericsType";
import styles from "./Category.module.scss";

const cx = classNames.bind(styles);

type Props = {};

const Category = function ({}: Props) {
    const [openCategory, setOpenCategory] = useState<boolean>(true);
    const handleOpenCategory = function () {
        setOpenCategory(!openCategory);
    };

    const handleChangeCategory = useCallback(function (event: ChangeEvent<HTMLInputElement>) {}, []);

    return (
        <section className={cx("content__filter")}>
            <header className={cx("content__filter--header")} onClick={handleOpenCategory}>
                <h3 className={cx("content__filter--title")}>Category</h3>
                {!openCategory ? (
                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                ) : (
                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                )}
            </header>

            {openCategory && (
                <article className={cx("content__filter--option")}>
                    {true
                        ? new Array(5).fill(null).map(function (category: any, index) {
                              return (
                                  <section key={index} className={cx("content__filter--group")}>
                                      <SkeletonTheme highlightColor="#7000ff" />
                                      <Skeleton width={150} height={20} />
                                      <Skeleton width={40} height={20} />
                                  </section>
                              );
                          })
                        : new Array().slice(0, 5).map(function (category: CategoryItemType, index: number) {
                              return (
                                  <section key={index} className={cx("content__filter--group")}>
                                      <h4 className={cx("content__filter--name")}>{category.name}</h4>
                                      <input
                                          value={category.slug}
                                          className={cx("content__filter--control")}
                                          type="radio"
                                          name="category"
                                          onChange={handleChangeCategory}
                                      />
                                  </section>
                              );
                          })}
                </article>
            )}
        </section>
    );
};

export default memo(Category);
