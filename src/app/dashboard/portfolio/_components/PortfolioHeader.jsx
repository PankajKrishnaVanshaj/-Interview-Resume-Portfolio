"use client";
import { BarChart, Brush, Layers3, Settings } from "lucide-react";
import React, { useState } from "react";

const PortfolioHeader = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const menuList = [
    { id: 1, name: "Pages", icon: Layers3 },
    { id: 2, name: "Style", icon: Brush },
    { id: 3, name: "Stats", icon: BarChart },
    { id: 4, name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex justify-center items-center pl-5 bg-transparent my-1">
      {menuList.map((menu) => (
        <div
          key={menu.id}
          className={`rounded-xl flex items-center justify-center p-2 m-1 ${
            selectedMenu === menu.id ? "bg-primary" : "bg-secondary"
          }`}
          data-tip={menu.name}
          onClick={() => setSelectedMenu(menu.id)}
        >
          <menu.icon className="text-center" />
        </div>
      ))}
    </div>
  );
};

export default PortfolioHeader;
