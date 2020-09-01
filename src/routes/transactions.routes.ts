import { Router } from 'express';

import multer from 'multer'
import uploadConfig from '../config/upload'

import { getCustomRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const upload = multer(uploadConfig)

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  console.log(transactions)
  const balance = await transactionsRepository.getBalance();

  response.json({transactions,balance})
});

transactionsRouter.post('/', async (request, response) => {
    const { title, value,type, category } = request.body;

    const CreateTransaction = new CreateTransactionService();

    const newTransaction = await CreateTransaction.execute({
      title,
      value,
      type,
      category
    })

    return response.json(newTransaction)

});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService

  await deleteTransaction.execute(id);

  return response.status(204).json({});

});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransactions = new ImportTransactionsService()

  const transactions = await importTransactions.execute(request.file.path)

  return response.json(transactions)
});

export default transactionsRouter;
