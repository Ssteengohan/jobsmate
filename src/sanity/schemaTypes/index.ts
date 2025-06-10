import { type SchemaTypeDefinition } from 'sanity'
import { navbar } from './navbar'
import { heroBanner } from './heroBanner'
import { tabsSection } from './tabsSection'
import { sliderSection } from './sliderSection'
import { timeline } from './timeline'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [navbar, heroBanner, tabsSection, sliderSection, timeline],
}
