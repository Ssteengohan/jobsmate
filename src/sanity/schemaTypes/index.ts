import { type SchemaTypeDefinition } from 'sanity'
import { navbar } from './navbar'
import { heroBanner } from './heroBanner'
import { tabsSection } from './tabsSection'
import { sliderSection } from './sliderSection'
import { timeline } from './timeline'
import { freeTrialCard } from './freeTrialCard'
import { pricingCard } from './pricingCard'
import { footer } from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [navbar, heroBanner, tabsSection, sliderSection, timeline, freeTrialCard, pricingCard, footer],
}
