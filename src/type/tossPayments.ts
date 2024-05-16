export interface PaymentResponse {
  version: string;
  paymentKey: string;
  type: string;
  orderId: string;
  orderName?: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status: string;
  requestedAt: string;
  approvedAt?: string;
  useEscrow: boolean;
  lastTransactionKey?: string | null;
  suppliedAmount?: number;
  vat?: number;
  cultureExpense?: boolean;
  taxFreeAmount?: number;
  taxExemptionAmount?: number;
  cancels?: Cancel[];
  card?: Card;
  virtualAccount?: VirtualAccount;
  mobilePhone?: MobilePhone;
  receiptUrl?: string;
  giftCertificate?: GiftCertificate;
  transfer?: Transfer;
  receipt?: Receipt;
  checkout?: Checkout;
  easyPay?: EasyPay;
  country?: string;
  failure?: Failure;
  cashReceipt?: CashReceipt;
}

interface Cancel {
  cancelAmount: number;
  cancelReason: string;
  taxFreeAmount?: number;
  taxExemptionAmount?: number;
  refundableAmount?: number;
  easyPayDiscountAmount?: number;
  canceledAt?: string;
  transactionKey: string;
  receiptKey?: string | null;
  cancelStatus: string;
  cancelRequestId?: string | null;
  isPartialCancelable: boolean;
}

interface Card {
  amount: number;
  issuerCode: string;
  acquirerCode?: string | null;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
  isInterestFree: boolean;
  interestPayer?: string;
}

interface VirtualAccount {
  accountType: string;
  accountNumber: string;
  bankCode: string;
  customerName: string;
  dueDate: string;
  refundStatus: string;
  refundReceiveAccount: RefundReceiveAccount;
  secret?: string | null;
  expired: boolean;
  settlementStatus: string;
}

interface RefundReceiveAccount {
  bankCode: string;
  accountNumber: string;
  holderName: string;
}

interface MobilePhone {
  customerMobilePhone: CustomerMobilePhone;
  masking: string;
  settlementStatus: string;
  receiptUrl: string;
}

interface CustomerMobilePhone {
  plain: string;
  masking: string;
}

interface GiftCertificate {
  approveNo: string;
  settlementStatus: string;
}

interface Transfer {
  bankCode: string;
  settlementStatus: string;
}

interface Receipt {
  url: string;
}

interface Checkout {
  url: string;
}

interface EasyPay {
  provider: string;
  amount: number;
  discountAmount: number;
}

interface CashReceipt {
  type: string;
  receiptKey: string;
  issueNumber: string;
  receiptUrl: string;
  businessNumber: string;
  transactionType: string;
  amount: number;
  taxFreeAmount: number;
  issueStatus: string;
  failure?: Failure;
  customerIdentityNumber?: CustomerIdentityNumber;
  requestedAt: string;
}

interface Failure {
  code: string;
  message: string;
}

interface CustomerIdentityNumber {
  // Define the structure based on different types of customer identity numbers
}
