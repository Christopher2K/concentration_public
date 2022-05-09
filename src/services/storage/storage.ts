import AsyncStorage from '@react-native-async-storage/async-storage'

import { type SchemaKey, type Schema, initialData } from './schema'

type PersistArgs<K extends SchemaKey> = {
  key: K
  data: Schema[K]
}
export async function persist<K extends SchemaKey>({
  key,
  data,
}: PersistArgs<K>): Promise<Schema[K]> {
  await AsyncStorage.setItem(key, JSON.stringify(data))
  return data
}

type ReadArgs<K extends SchemaKey, C extends boolean> = {
  key: K
  createIfNotExists?: C
}

export async function read<K extends SchemaKey>({
  key,
  createIfNotExists,
}: ReadArgs<K, false>): Promise<Schema[K] | null>
export async function read<K extends SchemaKey>({
  key,
  createIfNotExists,
}: ReadArgs<K, true>): Promise<Schema[K]>
export async function read<K extends SchemaKey>({
  key,
  createIfNotExists,
}: ReadArgs<K, boolean>): Promise<Schema[K] | null> {
  const data = await AsyncStorage.getItem(key)

  if (data !== null) {
    return JSON.parse(data) as Schema[K]
  } else if (createIfNotExists) {
    return persist({ key, data: initialData[key] })
  } else {
    return null
  }
}

type PurgeArgs<K extends SchemaKey> = {
  key: K
}
export async function purge<K extends SchemaKey>({
  key,
}: PurgeArgs<K>): Promise<void> {
  return AsyncStorage.removeItem(key)
}
