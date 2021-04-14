import { IContentCard } from "./content-card";

export interface IContentPage {
  slug: string;
  metaData: {
    pageTitle: string;
    pageContent: string;
  };
  metaFields: IContentCard[];
}
