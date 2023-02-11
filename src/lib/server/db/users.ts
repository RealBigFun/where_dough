import { v4 as uuidv4 } from 'uuid'

import { getSession } from './_connection'

import type { User } from '$lib/types/users'

export async function getUserById(id: string) {
  const connection = getSession()

  const result = await connection.executeRead(tx =>
    tx.run('MATCH (u:User {id: $id}) RETURN u', { id }),
  )

  if (result.records.length === 0)
    return null

  return result.records[0].get('u').properties as User
}

export async function writeUser(user: User) {
  const connection = getSession()

  const result = await connection.executeWrite(tx =>
    tx.run('MERGE (u:User {id: $id}) SET u = $user', { id: user.id || uuidv4(), user }),
  )

  if (result.records.length === 0)
    return null

  return result.records[0].get('u').properties as User
}

export async function getUsers() {
  const connection = getSession()

  const result = await connection.executeRead(tx =>
    tx.run('MATCH (u:User) RETURN u'),
  )

  return result.records.map(record => record.get('u').properties as User)
}
