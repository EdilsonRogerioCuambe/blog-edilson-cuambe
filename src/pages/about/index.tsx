import { useState, useEffect, useCallback } from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import { IoArrowBackSharp } from 'react-icons/io5'
import './index.module.css'
import { Link } from 'react-router-dom'

interface Me {
  name: string
  picture: {
    url: string
  }
  areaAtuacao: string
  biography: string
}

const graphcms = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/clmylrzyu032501ukak2i4jw7/master',
)

const query = gql`
  query {
    author(where: { id: "clmyrmb6w3q1k0blzpc827oqz" }) {
      name
      picture {
        url
      }
      biography
      username
    }
  }
`

export function AboutMe() {
  const [me, setMe] = useState<Me>()

  const getMe = useCallback(async () => {
    const { author } = await graphcms.request<{ author: Me }>(query)
    setMe(author)
  }, [])

  useEffect(() => {
    getMe()
  }, [getMe])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col text-[#c4c4cc] items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl text-green-400 font-extrabold">{me?.name}</h2>
        </div>
        <img
          src={me?.picture.url}
          alt={me?.name}
          className="w-48 h-48 rounded-md object-cover"
        />
        <p className="mt-4 text-lg font-semibold">{me?.biography}</p>
      </div>
      <Link to="/" className="flex items-center justify-center text-white">
        <IoArrowBackSharp className="mr-2" />
        Voltar
      </Link>
    </div>
  )
}
