import React from "react";
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { FloatingDock } from "./FloatingDock";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full " />,
      href: "#",
    },

    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full " />,
      href: "#",
    },

    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full " />,
      href: "#",
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-full w-full " />,
      href: "#",
    },
    {
      title: "Youtube",
      icon: <IconBrandYoutube className="h-full w-full " />,
      href: "#",
    },
  ];
  return (
    <div className="flex w-full ">
      <FloatingDock
        // only for demo, remove for production
        mobileClassName="translate-y-6"
        items={links}
      />
    </div>
  );
}
