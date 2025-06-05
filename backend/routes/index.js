const router = require('express').Router();
const {requireAuth} = require('../middlewares/requireAuth');
const {adminAuth} = require('../middlewares/adminAuth');
const userController = require('../controllers/userController');
const currencyController = require('../controllers/currencyController')
const walletController = require('../controllers/walletController');

router.post('/register', userController.registerUser);
router.post('/register/admin', userController.registerAdmin);
router.post('/login', userController.loginUser);
router.post('/logout', requireAuth, userController.logoutUser);
router.get('/users', userController.getAllUsers);

router.get('/currency', currencyController.getAllCurrencies);
router.post('/currency', currencyController.createCurrency);
router.delete('/currency/:id', currencyController.deleteCurrency);
router.put('/currency/:id', currencyController.updateCurrency);

router.get('/wallet/user', requireAuth, walletController.getWalletsByUserId);
router.post('/wallet', requireAuth, walletController.createWallet);
router.get('/wallet/:id', requireAuth, walletController.getWalletById);
router.post('/transfer', requireAuth, walletController.transfer);


router.post('/balance', walletController.updateBalance);



module.exports = router;




