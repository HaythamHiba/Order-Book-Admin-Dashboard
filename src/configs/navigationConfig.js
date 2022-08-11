import React from "react";

import { Home } from "react-feather";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";

import ReceiptIcon from "@mui/icons-material/Receipt";

import RestaurantIcon from '@mui/icons-material/Restaurant';


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
    id: "vendors",
    title: "vendors",
    type: "item",
    icon: <RestaurantIcon size={20} />,
    navLink: "/vendors",
   
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
