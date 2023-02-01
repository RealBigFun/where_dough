import neo4j, {Driver, Session} from 'neo4j-driver'

import { getConfig } from '../config'

let driver: Driver | null = null
let session: Session | null = null

export function getDriver() {
    if (!driver) {
        const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = getConfig()
        driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD))
    }
    return driver
}

export function getSession() {
    if (!session) {
        session = getDriver().session()
    }
    return session
}

export function closeSession() {
    session?.close()
    session = null
}

export function closeDriver() {
    if (session) {
        closeSession()
    }
    driver?.close()
    driver = null
}
