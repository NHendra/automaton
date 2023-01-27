// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const { secret } = req.query

  if ( secret === process.env.API_KEY){
    res.status(200).json({ name: 'John Doe' })
  } else {
    res.status(405).send({ message: 'Buu Buu' })
  }

}
