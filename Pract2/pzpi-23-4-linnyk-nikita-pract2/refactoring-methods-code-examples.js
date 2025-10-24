// Extract Method

// Код до рефакторингу
function processOrder(order) {
  // Перевірка валідності замовлення
  if (!order.items || order.items.length === 0) {
    throw new Error("Замовлення не містить товарів");
  }

  // Розрахунок загальної вартості
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }

  // Створення рахунку
  const invoice = {
    id: Date.now(),
    customer: order.customer,
    total: total,
  };

  // Надсилання повідомлення клієнту
  console.log(`Рахунок №${invoice.id} на суму ${invoice.total} грн відправлено клієнту ${invoice.customer}`);
}

// Код після рефакторингу
function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error("Замовлення не містить товарів");
  }
}

function calculateTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function createInvoice(order, total) {
  return {
    id: Date.now(),
    customer: order.customer,
    total: total,
  };
}

function notifyCustomer(invoice) {
  console.log(`Рахунок №${invoice.id} на суму ${invoice.total} грн відправлено клієнту ${invoice.customer}`);
}

function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order);
  const invoice = createInvoice(order, total);
  notifyCustomer(invoice);
}

// Rename Variable

// Код до рефакторингу
function processOrder(order) {
  validateOrder(order);

  let total = 0;
  for (let o of order.items) {
    total += o.price * o.quantity;
  }

  const invoice = {
    id: Date.now(),
    customer: order.customer,
    total: total,
  };

  const msg = `Рахунок №${invoice.id} на суму ${invoice.total} грн відправлено клієнту ${invoice.customer}`;
  console.log(msg);
}

// Код після рефакторингу
function processOrder(order) {
  validateOrder(order);

  let totalOrderAmount = 0;
  for (let item of order.items) {
    totalOrderAmount += item.price * item.quantity;
  }

  const customerInvoice = {
    id: Date.now(),
    customerName: order.customer,
    totalAmount: totalOrderAmount,
  };

  const customerNotificationMessage = 
    `Рахунок №${customerInvoice.id} на суму ${customerInvoice.totalAmount} грн ` +
    `відправлено клієнту ${customerInvoice.customerName}`;

  console.log(customerNotificationMessage);
}


// Extract Class

// Код до рефакторингу
function processOrder(order) {
  // Перевірка
  if (!order.items || order.items.length === 0) {
    throw new Error("Замовлення не містить товарів");
  }

  // Розрахунок
  let totalOrderAmount = 0;
  for (let item of order.items) {
    totalOrderAmount += item.price * item.quantity;
  }

  // Створення рахунку
  const customerInvoice = {
    id: Date.now(),
    customerName: order.customer,
    totalAmount: totalOrderAmount,
  };

  // Повідомлення клієнта
  const customerNotificationMessage =
    `Рахунок №${customerInvoice.id} на суму ${customerInvoice.totalAmount} грн ` +
    `відправлено клієнту ${customerInvoice.customerName}`;

  console.log(customerNotificationMessage);
}

// Код після рефакторингу
class OrderValidator {
  static validate(order) {
    if (!order.items || order.items.length === 0) {
      throw new Error("Замовлення не містить товарів");
    }
  }
}

class InvoiceService {
  static calculateTotal(order) {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  static createInvoice(order) {
    const totalAmount = this.calculateTotal(order);
    return {
      id: Date.now(),
      customerName: order.customer,
      totalAmount: totalAmount,
    };
  }
}

class NotificationService {
  static notifyCustomer(invoice) {
    const message =
      `Рахунок №${invoice.id} на суму ${invoice.totalAmount} грн ` +
      `відправлено клієнту ${invoice.customerName}`;
    console.log(message);
  }
}

// Тепер головна функція — лише координує процес:
function processOrder(order) {
  OrderValidator.validate(order);
  const invoice = InvoiceService.createInvoice(order);
  NotificationService.notifyCustomer(invoice);
}
