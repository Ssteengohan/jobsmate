import { type SchemaTypeDefinition } from 'sanity'
import { navbar } from './navbar'
import { heroBanner } from './heroBanner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [navbar, heroBanner],
}
