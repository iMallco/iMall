import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// Future routes
// import productRoutes from './product.routes';
// import vendorRoutes from './vendor.routes';
// router.use('/products', productRoutes);
// router.use('/vendors', vendorRoutes);

export default router;
