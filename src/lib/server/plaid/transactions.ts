import { format } from '../utils/datetime'
import { getPlaidClient } from './_setup'

export async function getTransactions(access_token: string, startDate: Date, endDate: Date = new Date()) {
  const plaidClient = getPlaidClient()

  const response = await plaidClient.transactionsGet({
    access_token,
    start_date: format(startDate, 'yyyy-MM-dd'),
    end_date: format(endDate, 'yyyy-MM-dd'),
  })
  const transactions = response.data.transactions
  return transactions
}
