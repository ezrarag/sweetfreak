import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';
import type { Notification, Order, Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(getFirebaseDb(), 'products');
  const snapshot = await getDocs(query(productsCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Product, 'id'>),
  }));
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const snapshot = await getDoc(doc(getFirebaseDb(), 'products', id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Product, 'id'>),
  };
};

export const createProduct = async (
  data: Omit<Product, 'id' | 'createdAt'>
): Promise<string> => {
  const productsCollection = collection(getFirebaseDb(), 'products');
  const snapshot = await addDoc(productsCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });

  return snapshot.id;
};

export const updateProduct = async (
  id: string,
  data: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<void> => {
  await updateDoc(doc(getFirebaseDb(), 'products', id), data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(getFirebaseDb(), 'products', id));
};

export const getOrders = async (): Promise<Order[]> => {
  const ordersCollection = collection(getFirebaseDb(), 'orders');
  const snapshot = await getDocs(query(ordersCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Order, 'id'>),
  }));
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const snapshot = await getDoc(doc(getFirebaseDb(), 'orders', id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Order, 'id'>),
  };
};

export const updateOrderStatus = async (
  id: string,
  status: Order['status']
): Promise<void> => {
  await updateDoc(doc(getFirebaseDb(), 'orders', id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const createNotification = async (
  data: Omit<Notification, 'id' | 'createdAt' | 'read'> & Partial<Pick<Notification, 'read'>>
): Promise<string> => {
  const notificationsCollection = collection(getFirebaseDb(), 'notifications');
  const snapshot = await addDoc(notificationsCollection, {
    ...data,
    read: data.read ?? false,
    createdAt: serverTimestamp(),
  });

  return snapshot.id;
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const notificationsCollection = collection(getFirebaseDb(), 'notifications');
  const snapshot = await getDocs(
    query(
      notificationsCollection,
      where('recipientId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    )
  );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Notification, 'id'>),
  }));
};

export const markNotificationRead = async (id: string): Promise<void> => {
  await updateDoc(doc(getFirebaseDb(), 'notifications', id), {
    read: true,
  });
};
