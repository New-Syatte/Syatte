import { DeliveryTrackingResponse } from "@/type/order";

const TRACKER_API_URL = "https://apis.tracker.delivery/graphql";
const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/delivery`;
const CLIENT_ID = process.env.DELIVERY_CLIENT_ID;
const CLIENT_SECRET = process.env.DELIVERY_CLIENT_SECRET;

const getAuthHeader = () => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Delivery tracker credentials are not configured");
  }
  return `TRACKQL-API-KEY ${CLIENT_ID}:${CLIENT_SECRET}`;
};

export async function registerWebhook(
  carrierId: string,
  trackingNumber: string,
  expirationHours: number = 48, // 기본값 48시간
) {
  try {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + expirationHours);

    const response = await fetch(TRACKER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        query: `mutation RegisterTrackWebhook($input: RegisterTrackWebhookInput!) {
          registerTrackWebhook(input: $input)
        }`,
        variables: {
          input: {
            carrierId,
            trackingNumber,
            callbackUrl: WEBHOOK_URL,
            expirationTime: expirationTime.toISOString(),
          },
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "Webhook registration failed");
    }

    return data;
  } catch (error) {
    console.error("Error registering webhook:", error);
    throw error;
  }
}

// Webhook 등록 해제 함수
export async function unregisterWebhook(
  carrierId: string,
  trackingNumber: string,
) {
  // expirationTime을 현재 시간으로 설정하여 즉시 만료
  return registerWebhook(carrierId, trackingNumber, 0);
}

export async function trackDelivery(
  carrierId: string,
  trackingNumber: string,
): Promise<DeliveryTrackingResponse> {
  try {
    const response = await fetch(TRACKER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        query: `query Track($carrierId: ID!, $trackingNumber: String!) {
          track(carrierId: $carrierId, trackingNumber: $trackingNumber) {
            lastEvent {
              status {
                code
              }
              time
            }
            events {
              edges {
                node {
                  status {
                    code
                  }
                  time
                  description
                }
              }
            }
          }
        }`,
        variables: {
          carrierId,
          trackingNumber,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || "Tracking query failed");
    }

    // 배송 추적 성공 시 webhook 등록
    await registerWebhook(carrierId, trackingNumber);

    return result;
  } catch (error) {
    console.error("배송 조회 중 오류가 발생했습니다:", error);
    throw error;
  }
}
