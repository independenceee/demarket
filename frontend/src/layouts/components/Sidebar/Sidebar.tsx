import React, { useContext } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.scss";
import { ModalContextType } from "~/types/contexts/ModalContextType";

import Avatar from "~/components/Avatar";
import { ClipLoader } from "react-spinners";
import ModalContext from "@/contexts/components/ModalContext";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const Sidebar = function ({ className }: Props) {
    return (
        <div className={cx("button__other", className)}>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleShowingSearch} />
            </div>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon icon={faCartShopping} onClick={toggleShowingCart} />
                <span>{cartItem.totalQuantity}</span>
            </div>
            {loadingAccount && <ClipLoader size={20} color="#7000ff" loading={loadingAccount} speedMultiplier={1} />}
            {account && <Avatar account={account} />}
        </div>
    );
};

export default Sidebar;
