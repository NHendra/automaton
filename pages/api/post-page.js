// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getQueriesApi, submitQueriesApi } from '@/services';
const { default: axios } = require('axios');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }


  const { secret } = req.query
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  const PAGE_ID = process.env.PAGE_ID

  if ( secret === process.env.API_KEY){
    getQueriesApi().then((result) => {
      console.log(result[0]);
      const message =`${result[0].caption} %0D%0A%0D%0A-${result[0].admin}`
      axios
      .post(`https://graph.facebook.com/${PAGE_ID}/photos?url=${result[0].image}&message=${message}&access_token=${ACCESS_TOKEN}`, null)
      .then(function(response){
        if (response.data.post_id) {
          const postObj = {
            unique: result[0].unique,
            postid: response.data.post_id,
          };
          submitQueriesApi(postObj)
            .then((oke) => {
              console.log(oke);
              if (oke.updatePagefb) {
                res.status(200).json({ message: 'OK' })
              }
            }
          );
        }
      })
      .catch(function(error){
        console.log(error)
      })
    });
  } else {
    res.status(405).send({ message: 'Buu Buu' })
  }

}
