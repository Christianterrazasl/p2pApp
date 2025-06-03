const router = require('express').Router();
const {requireAuth} = require('../middlewares/requireAuth');
const userController = require('../controllers/userController');
const currencyController = require('../controllers/currencyController')
const walletController = require('../controllers/walletController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', requireAuth, userController.logoutUser);
router.get('/users', userController.getAllUsers);

router.get('/currency', currencyController.getAllCurrencies);
router.post('/currency', currencyController.createCurrency);

router.get('/wallet', requireAuth, walletController.getWalletsByUserId);
router.post('/wallet', requireAuth, walletController.createWallet);

module.exports = router;




