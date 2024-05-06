import React, { useContext } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderUtilities.module.scss";
import { ClipLoader } from "react-spinners";

const cx = classNames.bind(styles);

type Props = {
    className?: string;
};

const HeaderUtilities = function ({ className }: Props) {
    // const { cartItem } = useContext<CartContextType>(CartContext);
    // const { account, loadingAccount } = useContext<AccountContextType>(AccountContext);
    // const { toggleShowingSearch, toggleShowingCart } = useContext<ModalContextType>(ModalContext);
    return (
        <div className={cx("button__other", className)}>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    // onClick={toggleShowingSearch}
                />
            </div>
            <div className={cx("icon__container")}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    // onClick={toggleShowingCart}
                />
                {/* <span>{cartItem.totalQuantity}</span> */}
            </div>
            {/*
           
            {loadingAccount && <ClipLoader size={20} color="#7000ff" loading={loadingAccount} speedMultiplier={1} />}
            {account && <Avatar account={account} />} */}
        </div>
    );
};

export default HeaderUtilities;
