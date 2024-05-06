import routes from "~/configs/routes";

const publicRouters = [
    { name: "Home", redirect: routes.home },
    { name: "Marketplace", redirect: routes.marketplace },
    { name: "Mint", redirect: routes.mint },
    { name: "About", redirect: routes.about },
    { name: "Guide", redirect: routes.guide },
];

export { publicRouters };
