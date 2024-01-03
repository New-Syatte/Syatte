"use client";

import { useEffect } from "react";
import { dispatchRouteChangeEvent } from "@/utils/routeEvents";

export default function RouteComplete({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("route complete");
    dispatchRouteChangeEvent("completed");
  }, [children]);
  return <div>{children}</div>;
}
