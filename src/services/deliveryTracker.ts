import axios from "axios";

// accessToken를 발급받는 함수
export const getAccessToken = async () => {
  const url = "https://auth.tracker.delivery/oauth2/token";
  const clientId = process.env.DELIVERY_CLIENT_ID as string;
  const clientSecret = process.env.DELIVERY_CLIENT_SECRET as string;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const response = await axios.post(url, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const accessToken = response.data.access_token;

  return accessToken;
};

// 배송 조회 함수
export async function trackDelivery(
  carrierId: string,
  trackingNumber: string,
  accessToken: string,
) {
  try {
    const response = await axios.post(
      "https://apis.tracker.delivery/graphql",
      {
        query: `
        query Track($carrierId: ID!, $trackingNumber: String!) {
          track(carrierId: $carrierId, trackingNumber: $trackingNumber) {
            lastEvent {
              time
              status {
                code
              }
            }
          }
        }
      `,
        variables: {
          carrierId,
          trackingNumber,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    // API 응답에서 에러를 확인
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;

      // UNAUTHENTICATED 에러가 있는지 확인
      const unauthenticatedError = errors.find(
        (err: any) =>
          err.extensions && err.extensions.code === "UNAUTHENTICATED",
      );

      if (unauthenticatedError) {
        // UNAUTHENTICATED 에러가 있으면 특정 에러를 던짐
        throw new Error("UNAUTHENTICATED");
      }
    }

    // 다른 에러를 그대로 던짐
    throw error;
  }
}
