export type AppTimestamp = Date | string | null;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Candied Fruits' | 'Adult Drinks' | 'Bundles' | 'Seasonal' | 'Gift Sets';
  imageUrl: string;
  inventory: number;
  active: boolean;
  stripeProductId: string | null;
  stripePriceId: string | null;
  createdAt: AppTimestamp;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'ready' | 'delivered' | 'cancelled';
  notes: string;
  createdAt: AppTimestamp;
  updatedAt: AppTimestamp;
}

export interface Customer {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: AppTimestamp;
  orderHistory: string[];
}

export interface Notification {
  id: string;
  type: string;
  recipientId: string;
  message: string;
  read: boolean;
  createdAt: AppTimestamp;
}

export interface SocialPost {
  id: string;
  message: string;
  platforms: string[];
  imageUrl?: string;
  scheduledAt?: AppTimestamp;
  postedAt?: AppTimestamp;
  status: 'draft' | 'scheduled' | 'queued' | 'posted' | 'failed';
}
