"use client";

import { useEffect } from "react";
import { dispatchRouteChangeEvent } from "@/utils/routeEvents";

export default function RouteComplete({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    dispatchRouteChangeEvent("completed");
  }, [children]);
  return <div>{children}</div>;
}
