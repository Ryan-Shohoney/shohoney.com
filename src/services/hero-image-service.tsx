import { graphql, useStaticQuery } from "gatsby";

interface HeroImageQL {
  page: string;
  images: string[];
}

export const heroImageService = (forPage = ""): HeroImageQL => {
  const data = useStaticQuery(graphql`
    query HeroImageQuery {
      allCosmicjsLandingPages {
        edges {
          node {
            slug
            metadata {
              hero_images {
                hero_image {
                  imgix_url
                }
              }
            }
          }
        }
      }
    }
  `);

  let results = data.allCosmicjsLandingPages.edges;
  if (forPage) {
    results = [results.find((e) => e.node.slug === forPage)];
  }
  return results.map((r) => ({
    page: r.node.slug,
    images: r.node.metadata.hero_images.map((h) => h.hero_image.imgix_url),
  }));
};
