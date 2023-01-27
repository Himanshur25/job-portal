import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "kh2kvctg",
  dataset: "production",
  useCdn: false,
});
