import { test } from '../index.js';
import { OrderService } from '../src/api/orderService.js';

test('Get all orders', async ({ request }) => {
  const orderService = new OrderService(request);
  const response = await orderService.getPage();
  console.log(response);
});
