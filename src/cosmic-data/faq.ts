import { ICosmicNode, ICosmicObjectType } from "./cosmic";

export interface IFaq {
    question: string;
    answer: string;
}

export function mapToFAQs(data: { allCosmicjsFaqs: { edges: Array<ICosmicObjectType<IFaq>>} }): Array<IFaq> {
  return data.allCosmicjsFaqs.edges.map(e => e.node.metadata);
}