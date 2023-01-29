import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreatePagefb($unique: String!, $caption: String!, $admin: String!, $image: String!, $postid: String!) {
      createPagefb(data: {unique: $unique, caption: $caption, admin: $admin, image: $image, postid: $postid}) { id }
      publishPagefb(where : {unique:$unique}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    unique: req.body.unique,
    caption: req.body.caption,
    admin: req.body.admin,
    image: req.body.image,
    postid: req.body.postid,
  });

  return res.status(200).send(result);
}
