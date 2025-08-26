"use client";

import { EllipsisVertical, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const MainPanel = ({
  children,
  menu,
}: Readonly<{ children: React.ReactNode; menu: boolean }>) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main
      className={`w-full md:w-[calc(100%-64px)] ${
        menu ? "lg:w-5/6" : "lg:w-[calc(100%-64px)]"
      } md:overflow-y-auto duration-200`}
    >
      <header className="flex justify-between items-center h-14 px-4 border-b border-zinc-300 bg-zinc-100">
        <Link href="#">
          <Image
            src="/ASALA DESIGN 1.png"
            alt="ASALA DESIGN"
            width={120}
            height={32}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <h4 className="flex items-center gap-2">
            <UserRound size={20} />
            <span>{`${user.lastName} ${user.firstName}`}</span>
          </h4>
          <EllipsisVertical size={20} className="cursor-pointer" />
        </div>
      </header>
      {children}
    </main>
  );
};

export default MainPanel;
