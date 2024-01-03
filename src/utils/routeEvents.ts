// src/events/routeEvents.ts

// Function to generate event names
const routeEventName = (event: string) => `route-change-${event}`;

// Interface for the event detail
interface IEventDetail {
  from?: string;
  to?: string;
}

// Dispatch the route change event
export const dispatchRouteChangeEvent = (
  event: "start" | "completed",
  data?: IEventDetail,
) => {
  window.dispatchEvent(
    new CustomEvent(routeEventName(event), {
      bubbles: false,
      cancelable: true,
      detail: data,
    }),
  );
};

// Register a listener for the route change event
export const registerRouteChangeListener = (
  event: "start" | "completed",
  fn: (data?: IEventDetail) => unknown,
) => {
  window.addEventListener(routeEventName(event), (event: Event) => {
    fn((event as CustomEvent<IEventDetail>).detail as IEventDetail);
  });
};
