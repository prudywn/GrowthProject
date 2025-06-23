import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a UTC date string
  token: process.env.SANITY_API_TOKEN, // or leave blank for unauthenticated usage
}) 