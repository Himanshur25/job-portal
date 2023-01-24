import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "kh2kvctg", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  apiVersion: "2021-08-31", // use a UTC date string
  useCdn: false, // `false` if you want to ensure fresh data
});
