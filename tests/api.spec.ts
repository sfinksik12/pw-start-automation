import { test } from '../index';
import { OrderService } from '../src/api/orderService';

test('Get all orders', async ({ request }) => {
  const orderService = new OrderService(request);
  const response = await orderService.getPage();
  console.log(response);
});
