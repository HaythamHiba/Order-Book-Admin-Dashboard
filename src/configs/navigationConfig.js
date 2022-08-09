import React from "react";

import { Home } from "react-feather";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GavelIcon from '@mui/icons-material/Gavel';
import { RiAdvertisementFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { BsInfoSquareFill, BsShop } from "react-icons/bs";
import { MdPrivacyTip, MdOutlineCategory } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { AiFillQuestionCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import MessageIcon from '@mui/icons-material/Message';

import { SUPER_ADMIN } from "./Roles";

const navigationConfig = [
  {
    id: "home",
    title: "home",
    type: "item",
    icon: <Home size={20} />,
    navLink: "/",
  },
  {
    id: "google_analytics",
    title: "google_analytics",
    type: "item",
    icon: <SiGoogleanalytics size={20} />,
    navLink: "/google-analytics",
  },

  {
    id: "categories",
    title: "categories",
    type: "item",
    icon: <BiCategory size={20} />,
    navLink: "/categories",
  },
  {
    id: "subcategories",
    title: "subcategories",
    type: "item",
    icon: <MdOutlineCategory size={20} />,
    navLink: "/subcategories",
  },
  {
    id: "owner_products",
    title: "owner_products",
    type: "item",
    icon: <AiOutlineShoppingCart size={20} />,
    navLink: "/owner-products/view-all",
  },
  {
    id: "shops",
    title: "shops",
    type: "collapse",
    icon: <BsShop size={20} />,
    children: [
      {
        id: "allShops",
        title: "all_shops",
        type: "item",
        icon: <BsShop  size={20} />,
        navLink: "/shops",
        
      },
      {
        id: "shop_categories",
        title: "shop_categories",
        type: "item",
        icon: <BiCategory size={20} />,
        navLink: "/shop_categories",
        
      },

    
    ]
  },
  {
    id: "orders",
    title: "orders",
    type: "item",
    icon: <ReceiptIcon size={20} />,
    navLink: "/all-orders",
  },
  {
    id:"auctions",
    title:"auctions",
    type:"item",
    icon:<GavelIcon size={20}/>,
    navLink:"/auctions/all",
  },
  {
    id:"auctions_orders",
    title:"auctions_orders",
    type:"item",
    icon:<GavelIcon size={20}/>,
    navLink:"/auctions_orders/all",
  },
  {
    id: "advertisements",
    title: "advertisements",
    type: "item",
    icon: <RiAdvertisementFill size={20} />,
    navLink: "/advertisements",
  },
  {
    id: "currencies",
    title: "currencies",
    type: "item",
    icon: <AccountBalanceIcon size={20} />,
    navLink: "/currencies",
  },
  {
    id: "discounts",
    title: "discounts",
    type: "item",
    icon: <LocalOfferIcon size={20} />,
    navLink: "/discounts",
  },
  {
    id: "social_media",
    title: "social_media",
    type: "item",
    icon: <FacebookIcon size={20} />,
    navLink: "/social_media",
  },
  {
    id: "information",
    title: "information",
    type: "collapse",
    icon: <InfoIcon size={20} />,
    children: [
      {
        id: "privacy",
        title: "privacy",
        type: "item",
        icon: <MdPrivacyTip size={20} />,
        navLink: "/information/privacy",
      },
      {
        id: "conditions",
        title: "conditions",
        type: "item",
        icon: <TiDocumentText size={20} />,
        navLink: "/information/conditions",
      },

      {
        id: "about_us",
        title: "about_us",
        type: "item",
        icon: <AiFillQuestionCircle size={20} />,
        navLink: "/information/about-us",
      },
      {
        id: "company_info",
        title: "company_info",
        type: "item",
        icon: <BsInfoSquareFill size={20} />,
        navLink: "/information/company-info",
      },
    ],
  },
  {
    id: "users",
    title: "users",
    type: "item",
    icon: <PeopleIcon />,
    navLink: "/users",
  },
  {
    id: "messages",
    title: "messages",
    type: "item",
    icon: <MessageIcon />,
    navLink: "/messages",
  },
  {
    id: "accounts",
    title: "accounts",
    type: "collapse",
    icon: <AdminPanelSettingsIcon />,
    permissions: [SUPER_ADMIN],
    children: [
      {
        id: "view_accounts",
        title: "view_accounts",
        type: "item",
        icon: <PeopleIcon />,
        navLink: "/accounts/view",
        permissions: [SUPER_ADMIN],
      },
      {
        id: "add_account",
        title: "add_account",
        type: "item",
        icon: <PersonAddIcon />,
        navLink: "/accounts/add",
        permissions: [SUPER_ADMIN],
      },
    ],
  },
];

export default navigationConfig;
