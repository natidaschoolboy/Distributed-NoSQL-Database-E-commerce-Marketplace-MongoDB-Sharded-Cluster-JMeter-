const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🚀 Connected to DB. Seeding...');
    seedData();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

async function seedData() {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});

    const users = [];

    // Create 5 users
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['buyer', 'seller']),
        password: faker.internet.password(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country()
        }
      });
      await user.save();
      users.push(user);
    }

    const sellers = users.filter(u => u.role === 'seller');
    const buyers = users.filter(u => u.role === 'buyer');

    // Create 15 products
    const products = [];
    for (let i = 0; i < 15; i++) {
      const seller = faker.helpers.arrayElement(sellers);
      const product = new Product({
        seller: seller._id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        condition: faker.helpers.arrayElement(['New', 'Gently Used', 'Fair']),
        price: parseFloat(faker.commerce.price()),
        size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
        images: [faker.image.urlPicsumPhotos()],
        tags: faker.helpers.multiple(faker.commerce.productAdjective, { count: 3 }),
        stock: faker.number.int({ min: 1, max: 20 })
      });
      await product.save();
      products.push(product);
    }

    // Create 8 orders
    for (let i = 0; i < 8; i++) {
      const buyer = faker.helpers.arrayElement(buyers);
      const orderItems = faker.helpers.multiple(() => {
        const product = faker.helpers.arrayElement(products);
        return {
          product: product._id,
          quantity: faker.number.int({ min: 1, max: 3 })
        };
      }, { count: faker.number.int({ min: 1, max: 4 }) });

      const total = orderItems.reduce((sum, item) => {
        const prod = products.find(p => p._id.equals(item.product));
        return sum + (prod.price * item.quantity);
      }, 0);

      const order = new Order({
        buyer: buyer._id,
        items: orderItems,
        totalAmount: total.toFixed(2),
        paymentStatus: 'Paid',
        deliveryAddress: `${buyer.address.street}, ${buyer.address.city}`,
        orderDate: faker.date.recent({ days: 14 })
      });

      await order.save();

      // Write reviews for some items in the order
      for (let item of orderItems) {
        if (Math.random() > 0.5) {
          const review = new Review({
            reviewer: buyer._id,
            product: item.product,
            rating: faker.number.int({ min: 3, max: 5 }),
            comment: faker.lorem.sentence(),
            createdAt: faker.date.recent({ days: 10 })
          });
          await review.save();
        }
      }
    }

    console.log('✅ Seeding complete: users, products, orders, reviews!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}
