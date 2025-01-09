import { DeliveryTrackingResponse } from "@/type/order";

const TRACKER_API_URL = "https://apis.tracker.delivery/graphql";
const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/delivery`;
const CLIENT_ID = process.env.DELIVERY_CLIENT_ID;
const CLIENT_SECRET = process.env.DELIVERY_CLIENT_SECRET;

const getAuthHeader = () => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing credentials:", {
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
    });
    throw new Error("Delivery tracker credentials are not configured");
  }

  // API 키 형식 검증 추가
  if (
    !CLIENT_ID.match(/^[A-Za-z0-9]+$/) ||
    !CLIENT_SECRET.match(/^[A-Za-z0-9]+$/)
  ) {
    throw new Error("Invalid credential format");
  }

  console.log("Auth Header:", `TRACKQL-API-KEY ${CLIENT_ID}:${CLIENT_SECRET}`);

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
            events(last: 10) {
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
      console.error("API Error Details:", result.errors);
      throw new Error(result.errors[0]?.message || "Tracking query failed");
    }

    // 2. Webhook 등록 실패를 별도로 처리
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("no resgister webhook");
      } else {
        await registerWebhook(carrierId, trackingNumber);
      }
    } catch (webhookError) {
      console.error("Webhook registration failed:", webhookError);
      // Webhook 등록 실패해도 배송 조회 결과는 반환
    }

    return result;
  } catch (error) {
    console.error("Delivery tracking error details:", {
      error,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    throw error;
  }
}
