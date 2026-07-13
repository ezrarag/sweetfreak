import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { orderStatusLabel, orderStatuses, type OrderStatus } from '@/lib/orderStatus';

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, notes, sendCustomerUpdate } = (await request.json()) as {
      status?: OrderStatus;
      notes?: string;
      sendCustomerUpdate?: boolean;
    };

    if (!status || !orderStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid order status.' }, { status: 400 });
    }

    const orderRef = getFirebaseAdminDb().collection('orders').doc(id);
    const orderSnapshot = await orderRef.get();

    if (!orderSnapshot.exists) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    const orderData = orderSnapshot.data() as {
      customerId?: string;
      customerEmail?: string;
      customerName?: string;
    };

    await orderRef.update({
      status,
      notes: notes ?? '',
      updatedAt: FieldValue.serverTimestamp(),
    });

    if (sendCustomerUpdate && orderData.customerId) {
      const message = `Your Sweet Freak order is now ${orderStatusLabel[status].toLowerCase()}.`;

      await getFirebaseAdminDb().collection('notifications').add({
        type: 'order_status',
        recipientId: orderData.customerId,
        message,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      });

      const resend = getResend();
      if (resend && orderData.customerEmail) {
        await resend.emails.send({
          from: 'Sweet Freak <orders@sweetfreakjollies.com>',
          to: orderData.customerEmail,
          subject: `Order update: ${orderStatusLabel[status]}`,
          html: `<p>Hi ${orderData.customerName ?? 'there'},</p><p>${message}</p>`,
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to update order status:', error);
    return NextResponse.json({ error: 'Unable to update order status.' }, { status: 500 });
  }
}
