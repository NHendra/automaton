import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;



export const getQueries = async () => {
  const query = gql`
  query MyQuery {
    pagefbs {
      admin
      caption
      image
      postid
    }
  }
  `;

  const result = await request(graphqlAPI, query);

  return result.pagefbs;
};

export const submitQueries = async (obj) => {
  const result = await fetch('/api/postfb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};
