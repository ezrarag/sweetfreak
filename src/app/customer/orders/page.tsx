import { getServerSession } from '@/lib/auth';
import CustomerOrdersClient from '@/components/customer/CustomerOrdersClient';

export default async function CustomerOrdersPage() {
  const session = await getServerSession();

  return <CustomerOrdersClient customerId={session?.uid ?? 'anonymous'} />;
}
