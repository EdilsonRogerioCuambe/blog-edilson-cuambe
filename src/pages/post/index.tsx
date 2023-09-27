import { useEffect, useState, useCallback } from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styles from './index.module.css'
import rehypeRaw from 'rehype-raw'

interface PostData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  tags: {
    id: string
    slug: string
    title: string
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

export function Post() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<PostData | null>(null)

  document.title = `${post?.title} | Edilson Cuambe`

  const fetchPost = useCallback(async () => {
    try {
      const { post } = await graphcms.request<{ post: PostData }>(
        gql`
          query {
            post(where: { slug: "${slug}" }) {
              id
              title
              slug
              excerpt
              content
              date
              tags {
                id
                slug
                title
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
        `,
      )
      setPost(post)
    } catch (error) {
      console.error(error)
    }
  }, [slug])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) {
    return (
      <div className="bg-neutral-700 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-neutral-600 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-600 rounded"></div>
                <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-neutral-600 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-600 rounded"></div>
                <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-neutral-600 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-600 rounded"></div>
                <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen text-white font-robotoslab text-md ${styles.bg}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/** AUTHOR: NAME, IMAGE, WHEN IT WAS POSTED */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-md object-cover"
              src={post.author.picture.url}
              alt={post.author.name}
            />
            <div className="ml-4 text-lg font-extrabold">
              <p>{post.author.name}</p>
              <p>{post.date}</p>
            </div>
          </div>
          {/** TAGS */}
          <div className="flex items-center">
            {post?.tags?.map((tag, tagIndex) => (
              <div
                key={tagIndex}
                className="border border-green-400 rounded-md px-4 py-2 text-green-400 font-robotoslab text-md"
              >
                #
                <img
                  src={tag?.icon?.url}
                  alt={tag?.title}
                  className="inline w-4 h-4 ml-2"
                />
                {tag?.slug}
              </div>
            ))}
          </div>
        </div>
        <ReactMarkdown
          className="markdown"
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  language={match[1]}
                  style={a11yDark}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}
          rehypePlugins={[rehypeRaw as never]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
