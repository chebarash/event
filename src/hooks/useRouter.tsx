"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const RouterContext = createContext<{
  isHome: boolean;
  pathname: string;
  back: () => any;
  push: (href: string) => () => any;
  replace: (href: string) => any;
}>({
  isHome: true,
  pathname: `/`,
  back: () => {},
  push: () => () => {},
  replace: () => {},
});

export function useRouterContext() {
  return useContext(RouterContext);
}

export default function RouterProvider({ children }: { children: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);
  const [length, setLength] = useState(1);

  useEffect(() => {
    if (pathname == `/`) {
      setIsHome(true);
      setLength(2);
    } else {
      if (length <= 1) router.prefetch(`/`);
      setIsHome(length <= 1);
      setLength((l) => ++l);
    }
  }, [pathname]);

  const back = () => {
    if (pathname === "/") return;
    if (isHome) {
      setLength(1);
      return router.push(`/?`);
    }
    setLength((l) => (l - 2 > 1 ? l - 2 : 1));
    router.back();
  };

  const replace = (href: string) => {
    setLength((l) => (l - 2 > 1 ? l - 2 : 1));
    router.replace(href);
  };

  const push = (href: string) => {
    router.prefetch(href);
    return () => router.push(href);
  };

  return (
    <RouterContext.Provider value={{ isHome, pathname, back, push, replace }}>
      {children}
    </RouterContext.Provider>
  );
}
