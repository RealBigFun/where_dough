import { Configuration, PlaidApi } from 'plaid'
import { getConfig } from '../config'

let configuration: Configuration | null = null

export function getConfiguration(): Configuration {
  if (!configuration) {
    const { PLAID_CLIENT_ID, PLAID_CLIENT_SECRET, PLAID_ENV } = getConfig()
    configuration = new Configuration({
      basePath: PLAID_ENV,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
          'PLAID-SECRET': PLAID_CLIENT_SECRET,
        },
      },
    })
  }
  return configuration
}

let plaidClient: PlaidApi | null = null
export function getPlaidClient() {
  const configuration = getConfiguration()
  if (!plaidClient)
    plaidClient = new PlaidApi(configuration)

  return plaidClient
}
