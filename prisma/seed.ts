import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // clean DB
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  // Shops
  const shops = await Promise.all([
    prisma.shop.create({
      data: { name: 'Burger House', rating: 4.5 },
    }),
    prisma.shop.create({
      data: { name: 'Sweet Dreams', rating: 4.8 },
    }),
    prisma.shop.create({
      data: { name: 'Drink Hub', rating: 4.2 },
    }),
    prisma.shop.create({
      data: { name: 'Snack Point', rating: 3.9 },
    }),
  ]);

  // Generate products for each shop
  const categories = ['Burgers', 'Drinks', 'Desserts', 'Snacks'];

  function randomPrice() {
    return Number((Math.random() * 20 + 5).toFixed(2));
  }

  function randomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
  }

  for (const shop of shops) {
    const productNames = [
      'Classic Burger',
      'Cheese Burger',
      'Cola',
      'Orange Juice',
      'Chocolate Cake',
      'Fries',
    ];

    const products = Array.from({ length: 15 }).map((_, i) => ({
      name: productNames[i % productNames.length],
      price: randomPrice(),
      category: randomCategory(),
      shopId: shop.id,
    }));

    await prisma.product.createMany({
      data: products,
    });
  }

  await prisma.coupon.createMany({
    data: [
      { code: 'SAVE10', discount: 10 },
      { code: 'SAVE20', discount: 20 },
    ],
  });

  console.log('Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
