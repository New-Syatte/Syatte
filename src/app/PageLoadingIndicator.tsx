"use client";

import { useEffect, useState } from "react";
import { registerRouteChangeListener } from "@/utils/routeEvents";
import Loader from "@/components/loader/Loader";

export default function PageLoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    registerRouteChangeListener("start", () => {
      console.log("route start");
      setIsLoading(true);
    });

    registerRouteChangeListener("completed", () => {
      console.log("route complete");
      setIsLoading(false);
    });
  }, []);

  return <>{isLoading && <Loader />}</>;
}
