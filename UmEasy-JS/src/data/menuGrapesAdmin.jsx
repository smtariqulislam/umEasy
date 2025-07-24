import {
  AiOutlineCluster,
  AiOutlineTeam,
  AiFillDelete,
  AiOutlineBars,
  AiOutlineKey,
  AiOutlineControl,
  AiOutlineMenu,
} from "react-icons/ai";

export const menuGrapesAdmin = {
  menuData: [
    {
      name: "Users",
      link: "/grapes/user/list",
      icon: "AiOutlineSolution",
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/grapes/settings",
      icon: "AiOutlineSetting",
    },
  ],
  subSettingMenuData: [
    {
      name: "Query Execute",
      link: "/grapes/settings/query/execute",
      Icon: AiOutlineCluster,
    },
    {
      name: "Clear Database",
      link: "/grapes/clearDatabase",
      Icon: AiFillDelete,
    },
    {
      name: "Role",
      link: "/grapes/settings/role",
      Icon: AiOutlineTeam,
    },
    {
      name: "Modules",
      link: "/grapes/settings/module/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Menu",
      link: "/grapes/settings/menu/list",
      Icon: AiOutlineMenu,
    },
    {
      name: "Menu Assign",
      link: "/grapes/settings/menu/assign/list",
      Icon: AiOutlineKey,
    },
    {
      name: "Sub Menu",
      link: "/grapes/settings/sub/menu/list",
      Icon: AiOutlineBars,
    },

    {
      name: "Sub Menu Assign",
      link: "/grapes/settings/submenu/assign/list",
      Icon: AiOutlineControl,
    },
  ],
};
