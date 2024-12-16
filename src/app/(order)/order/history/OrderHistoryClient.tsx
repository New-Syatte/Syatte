"use client";

import StatusProgress from "./StatusProgress";
import PeriodSelector from "@/layouts/periodSelector/PeriodSelector";
import OrderList from "./OrderList";
import Loader from "@/components/loader/Loader";
import Heading from "@/components/heading/Heading";
import { useOrders } from "@/hooks/useOrders";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { ServerActionResult } from "@/type/action";

interface WebhookRefreshResponse {
  success: boolean;
  summary?: {
    total: number;
    succeeded: number;
    failed: number;
  };
  error?: string;
}

export default function OrderHistoryClient() {
  const { orders, error, isLoading } = useOrders();
  const [isPending, startTransition] = useTransition();

  const refreshWebhooks = async () => {
    if (process.env.NODE_ENV === "development") {
      startTransition(async () => {
        try {
          const response = await fetch("/api/dev/refresh-webhook");
          const data: WebhookRefreshResponse = await response.json();

          if (data.success && data.summary) {
            toast.success(
              `Webhooks refreshed: ${data.summary.succeeded} succeeded, ${data.summary.failed} failed`,
            );
          } else {
            toast.error(data.error || "Failed to refresh webhooks");
          }
        } catch (error) {
          console.error("Error refreshing webhooks:", error);
          toast.error(
            error instanceof Error
              ? error.message
              : "Error refreshing webhooks",
          );
        }
      });
    }
  };

  if (error) {
    return (
      <div className="w-full text-center text-red-500 py-4">
        주문 내역을 불러오는데 실패했습니다.
        <br />
        <span className="text-sm text-gray-500">
          {error instanceof Error ? error.message : String(error)}
        </span>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <section className="w-full flex flex-col gap-y-40 sm:gap-y-10 font-kor">
      <div className="flex flex-col justify-start items-start">
        <Heading title="배송상황" fontSize="3xl" />
        <div className="border-b border-lightGray mb-7 w-full" />
        <StatusProgress />
        {process.env.NODE_ENV === "development" && (
          <button
            onClick={refreshWebhooks}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Refreshing..." : "Refresh Webhooks (Dev Only)"}
          </button>
        )}
      </div>
      <div>
        <div className="flex justify-between sm:flex-col mb-[30px] sm:mb-10 sm:pb-4 border-b border-lightGray">
          <Heading title="주문내역" fontSize="3xl" />
          <PeriodSelector />
        </div>
        <OrderList />
      </div>
    </section>
  );
}
