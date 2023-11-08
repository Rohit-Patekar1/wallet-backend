import express from 'express'
import { fetchWallet } from './controllers/fetch-wallet';
import { saveWallet } from './controllers/setup-wallet';
import { fetchTransactionList, transaction } from './controllers/transaction';
import { transactionValidation, walletSetupValidation } from './middleware/validators';
import { ping } from './controllers/test';
const router = express.Router()

router.post('/setup',walletSetupValidation, saveWallet);
router.get('/wallet/:id',fetchWallet);
router.post('/transact/:walletId',transactionValidation,transaction);
router.get('/transactions',fetchTransactionList);
router.get('/ping',ping)

export {router}