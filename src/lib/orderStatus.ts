export const orderStatuses = [
  'pending',
  'confirmed',
  'in_progress',
  'ready',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
