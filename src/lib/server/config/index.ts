import merge from 'lodash.merge'

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    NEO4J_URI: process.env.NEO4J_URI || 'bolt://localhost:7687',
    NEO4J_USER: process.env.NEO4J_USER || 'neo4j',
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || 'password',

    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID || null,
    PLAID_CLIENT_SECRET: process.env.PLAID_CLIENT_SECRET || null,
    PLAID_ENV: process.env.PLAID_ENV || 'sandbox',
}

interface SpecialConfigs {
    PLAID_ENV: 'sandbox' | 'development' | 'production'
}

export function setConfig(newConfig: Partial<typeof config & SpecialConfigs>) {
    merge(config, newConfig)
}

export function getConfig() {
    return config
}