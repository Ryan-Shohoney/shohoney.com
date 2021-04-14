import { IContentPage } from "../cosmic-data/content-page";

export function toContentPageData(data: any): IContentPage {
  return {
    slug: data.cosmicjsContentPages.slug,
    metaData: {
      pageTitle: data.cosmicjsContentPages.metadata.page_title,
      pageContent: data.cosmicjsContentPages.metadata.page_content,
    },
    metaFields: data.cosmicjsContentPages.metafields
      .filter((m) => m.object_type === "content-cards")[0]
      .objects.map((o) => ({
        cardTitle: o.metadata.card_title,
        cardBody: o.metadata.card_body,
        cardImage: {
          imgixUrl: o.metadata.card_image.imgix_url,
          local: {
            id: o.metadata.card_image.local.id,
          },
        },
      })),
  };
}
