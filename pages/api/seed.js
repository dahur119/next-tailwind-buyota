import User from '../../models/User';
import data from '../../utilis/data';
import db from '../../utilis/db';
import Product from '../../models/Products';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;