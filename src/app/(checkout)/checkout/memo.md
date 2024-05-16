```tsx
import dayjs from "dayjs";
import { saveCart } from "@/services/sanity/cart";
import { Order } from "@/type/order";
import {
  REMOVE_CHECKED_ITEMS_FROM_CART,
  selectCheckedCartItems,
  selectCheckedTotalAmount,
  selectCheckedTotalQuantity,
} from "@/redux/slice/cartSlice";

  const userEmail = session?.user?.email;
    const dispatch = useDispatch();
  const router = useRouter();
    const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
    const cartTotalQuantity = useSelector(selectCheckedTotalQuantity);
      const secretkey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

        .then(async function (data) {
          const { orderId, paymentKey, amount } = data;
          const url = "https://api.tosspayments.com/v1/payments/confirm";
          const basicToken = Buffer.from(`${secretkey}:`, "utf-8").toString(
            "base64",
          );
          await fetch(url, {
            method: "post",
            body: JSON.stringify({
              orderId,
              paymentKey,
              amount,
            }),
            headers: {
              Authorization: `Basic ${basicToken}`,
              "Content-Type": "application/json",
            },
          });

          const today = new Date();
          const date = today.toDateString();
          const time = today.toLocaleTimeString();

          const orderData = {
            _id: orderId,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: amount,
            orderStatus: "payed",
            orderCount: cartTotalQuantity,
            cartItems: cartItems,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            shippingInfo: {
              trackingNumber: "",
              carrierId: "",
            },
          };
          await saveCart(orderData as Order);
          // db에 저장
          dispatch(REMOVE_CHECKED_ITEMS_FROM_CART());
          router.push(`${URLS.CHECKOUT_SUCCESS}?orderId=${orderId}`);
        })
        .catch(error => {
          if (error.code === "USER_CANCEL") {
            toast.error("결재창이 닫아졌습니다.");
          } else {
            toast.error("결재에 실패했습니다. 잠시 후 다시 시도해주세요.");
            console.error("error", error);
          }
        });
```
