import merge from 'lodash.merge'

import { env } from '$env/dynamic/private'

const config = {
    NODE_ENV: env.NODE_ENV || 'development',

    NEO4J_URI: env.NEO4J_URI || 'bolt://localhost:7687',
    NEO4J_USER: env.NEO4J_USER || 'neo4j',
    NEO4J_PASSWORD: env.NEO4J_PASSWORD || 'password',

    PLAID_CLIENT_ID: env.PLAID_CLIENT_ID || null,
    PLAID_CLIENT_SECRET: env.PLAID_CLIENT_SECRET || null,
    PLAID_ENV: env.PLAID_ENV || 'sandbox',
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