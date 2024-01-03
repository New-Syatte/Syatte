"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { dispatchRouteChangeEvent } from "@/utils/routeEvents";

export default function useNextRouter() {
  const router = useRouter();
  const routerProxyRef = useRef(null);

  useEffect(() => {
    const routerProxy = new Proxy(router, {
      get: (target, prop) => {
        if (prop === "push" || prop === "back") {
          return (...args) => {
            dispatchRouteChangeEvent("start");

            // Call the original method with the provided arguments
            return target[prop](...args);
          };
        }

        // For other properties/methods, return the original value
        return target[prop];
      },
    });

    routerProxyRef.current = routerProxy;

    return () => {
      routerProxyRef.current = null;
    };
  }, [router]);

  return routerProxyRef.current || router;
}
