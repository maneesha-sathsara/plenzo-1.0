import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Categories ලබාගැනීමට අපොහොසත් විය' });
  }
});

// Create new category
router.post('/', async (req, res) => {
  try {
    const { name, slug } = req.body;
    // slug එකක් එවලා නැත්නම් name එකෙන් auto හදාගන්නවා (eg: "Men Fashion" -> "men-fashion")
    const categorySlug = slug || name.toLowerCase().trim().replace(/\s+/g, '-');

    const category = await prisma.category.create({
      data: {
        name,
        slug: categorySlug,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Category එක සෑදීමට අපොහොසත් විය' });
  }
});

export default router;