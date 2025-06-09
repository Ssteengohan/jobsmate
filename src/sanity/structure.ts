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
      ...S.documentTypeListItems().filter(
        (listItem) => !['heroBanner', 'navbar'].includes(listItem.getId() as string)
      ),
    ])
