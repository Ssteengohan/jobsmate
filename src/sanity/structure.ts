import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navbar')
        .child(
          S.document()
            .schemaType('navbar')
            .documentId('navbar')
        ),
      S.listItem()
        .title('Hero Banner')
        .child(
          S.document()
            .schemaType('heroBanner')
            .documentId('heroBanner')
        ),
      S.listItem()
        .title('Tabs Section')
        .child(
          S.document()
            .schemaType('tabsSection')
            .documentId('tabsSection')
        ),
      S.listItem()
        .title('Slider Section')
        .child(
          S.document()
            .schemaType('sliderSection')
            .documentId('sliderSection')
        ),
      S.listItem()
        .title('Timeline')
        .child(
          S.document()
            .schemaType('timeline')
            .documentId('timeline')
        ),
      S.listItem()
        .title('Free Trial Card')
        .child(
          S.document()
            .schemaType('freeTrialCard')
            .documentId('freeTrialCard')
        ),
      S.listItem()
        .title('Pricing Card')
        .child(
          S.document()
            .schemaType('pricingCard')
            .documentId('pricingCard')
        ),
      S.listItem()
        .title('Footer')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['heroBanner', 'navbar', 'tabsSection', 'sliderSection', 'timeline', 'freeTrialCard', 'pricingCard', 'footer'].includes(listItem.getId() as string)
      ),
    ])
