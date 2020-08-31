import { Router } from 'express';

import { getCustomRepository, TransactionRepository } from 'typeorm'
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transaction = await transactionsRepository.find();

  const balance = await transactionsRepository.getBalance();

  response.json({transaction,balance})
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

  const transactionsRepository = getCustomRepository(TransactionsRepository);





  return response.status(204).json({});

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
