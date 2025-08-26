"use client";

import MainPanel from "./mainPanel";
import Navigation from "./navigation";
import { useState } from "react";

const ControlPanel = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [menu, setMenu] = useState<boolean>(true);

  return (
    <div className="md:h-dvh flex">
      <Navigation menu={menu} setMenu={setMenu} />
      <MainPanel menu={menu}>{children}</MainPanel>
    </div>
  );
};

export default ControlPanel;
