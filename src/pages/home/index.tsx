import { useState, useEffect, useCallback } from 'react'
import { FiSearch } from 'react-icons/fi'
import { GraphQLClient, gql } from 'graphql-request'
import { PostListComponent } from '../../components/posts'
import './index.module.css'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  tags: {
    id: string
    title: string
    slug: string
    icon: {
      url: string
    }
  }[]
  author: {
    name: string
    picture: {
      url: string
    }
    username: string
  }
  coverImage: {
    url: string
  }
}

const graphcms = new GraphQLClient(
  'https://api-sa-east-1.hygraph.com/v2/clmylrzyu032501ukak2i4jw7/master',
)

const query = gql`
  query {
    posts {
      id
      title
      slug
      excerpt
      content
      date
      tags {
        id
        title
        slug
        icon {
          url
        }
      }
      author {
        name
        picture {
          url
        }
        username
      }
      coverImage {
        url
      }
    }
  }
`

export function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Post[] | null>(null)

  const searchPosts = useCallback(() => {
    if (!posts) return

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    setSearchResults(filteredPosts)
  }, [posts, searchTerm])

  const fetchPosts = useCallback(async () => {
    try {
      const { posts } = await graphcms.request<{ posts: Post[] }>(query)

      const sortedPosts = posts.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA
      })

      const formattedPosts = sortedPosts.map((post) => ({
        ...post,
        tags: post.tags.map((tag) => ({
          id: tag.id,
          title: tag.title,
          slug: tag.slug,
          icon: tag.icon,
        })),
      }))

      setPosts(formattedPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="bg-neutral-800 min-h-screen">
      <div className="h-14 flex items-center justify-center bg-neutral-700 rounded-md overflow-hidden mx-auto px-4 py-2 z-10 fixed top-0 left-0 right-0">
        <div className="w-12 flex items-center justify-center">
          <FiSearch className="text-neutral-400" size={20} />
        </div>
        <input
          className="bg-transparent text-neutral-100 placeholder-neutral-400 font-robotoslab text-md outline-none py-2 flex-grow"
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              searchPosts()
            }
          }}
        />
      </div>

      <div className="fixed top-14 left-0 right-0 bottom-0 flex flex-col md:flex-row">
        <div className="w-full md:w-1/12 border-r border-green-400 hidden md:block">
          {/** AJUSTAR O NOME NO CENTRO */}
          <div className="left-[53px] top-[180px] font-robotoslab mt-96 absolute origin-top-left -rotate-90 text-white text-4xl">
            @Edilson Rogério Cuambe
          </div>
        </div>

        <div className="w-full md:w-3/4 mt-14 relative mx-auto px-0 md:px-10">
          <div className="min-w-[400px] h-14 bg-neutral-700 relative rounded-t-3xl overflow-hidden">
            <div className="flex justify-between items-center h-full px-10">
              <span className="text-neutral-100 text-xl font-semibold font-robotoslab">
                Últimos Posts
              </span>
            </div>
          </div>

          <div
            className={`w-full sm:min-w-[400px] h-[calc(100vh-14px)] relative rounded-b-3xl pb-72 overflow-y-auto ${
              posts ? 'overflow-y-scroll' : ''
            }`}
          >
            {searchResults ? (
              <PostListComponent posts={searchResults} />
            ) : (
              <PostListComponent posts={posts} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
