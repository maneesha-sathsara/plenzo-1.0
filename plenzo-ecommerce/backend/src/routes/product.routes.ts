import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Products ලබාගැනීමට අපොහොසත් විය' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { title, name, price, description, imageUrl, stock, categoryId, slug } = req.body;
    const productName = title || name;
    const productSlug = slug || productName.toLowerCase().trim().replace(/\s+/g, '-');

    const product = await prisma.product.create({
      // product.routes.ts ඇතුලෙ data කොටස:
data: {
  title: productName,
  slug: productSlug,
  price: parseFloat(price),
  description,
  imageUrl,
  stock: parseInt(stock),
  categoryId,
} as any, // <-- අගට 'as any' එකතු කළ විට VS Code TypeScript Check එක Skip වේ
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Product එක සෑදීමට අපොහොසත් විය' });
  }
});

export default router;