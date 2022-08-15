import React from "react";

import { Home } from "react-feather";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";

import ReceiptIcon from "@mui/icons-material/Receipt";

import RestaurantIcon from '@mui/icons-material/Restaurant';
import { BiCategory } from "react-icons/bi";

import {  MdOutlineCategory } from "react-icons/md";

import { SUPER_ADMIN } from "./Roles";
import NoFoodIcon from '@mui/icons-material/NoFood';

const navigationConfig = [
  {
    id: "home",
    title: "home",
    type: "item",
    icon: <Home size={20} />,
    navLink: "/",
  },
  {
    id: "vendors",
    title: "vendors",
    type: "collapse",
    icon: <RestaurantIcon size={20} />,
    children: [
      {
        id: "all_vendors",
        title: "all_vendors",
        type: "item",
        icon: <RestaurantIcon  size={20} />,
        navLink: "/vendors",
        
      },
      {
        id: "vendor_categories",
        title: "vendor_categories",
        type: "item",
        icon: <BiCategory size={20} />,
        navLink: "/vendor_categories",
        
      },
      {
        id: "vendor_subcategories",
        title: "vendor_subcategories",
        type: "item",
        icon: <MdOutlineCategory size={20} />,
        navLink: "/vendor_subcategories",
        
      },
      {
        id: "vendor_items",
        title: "vendor_items",
        type: "item",
        icon: <NoFoodIcon size={20} />,
        navLink: "/vendor_items",
        
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
    id: "users",
    title: "users",
    type: "item",
    icon: <PeopleIcon />,
    navLink: "/users",
  },
 
  {
    id: "accounts",
    title: "accounts",
    type: "item",
    icon: <AdminPanelSettingsIcon />,
    permissions: [SUPER_ADMIN],
    navLink: "/accounts/view",
    
  },
];

export default navigationConfig;
