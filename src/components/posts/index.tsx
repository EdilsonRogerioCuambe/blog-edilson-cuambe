import { NavLink } from 'react-router-dom'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
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
  tags: {
    id: string
    slug: string
    title: string
    icon: {
      url: string
    }
  }[]
}

interface PostListComponentProps {
  posts: Post[] | null
}

export function PostListComponent({ posts }: PostListComponentProps) {
  return (
    <>
      {posts?.map((post, index) => (
        <NavLink key={index} to={`/post/${post.slug}`}>
          <div className="w-full sm:min-w-[400px] px-10 relative rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 mt-0 first:mt-10 sm:px-0 sm:mt-0 sm:mb-10">
            <div className="w-full relative">
              <div className="w-full ml-24 pb-4 top-0 relative font-robotoslab pr-24">
                <div className="text-base font-bold sm:text-lg md:text-4xl text-green-400">
                  {post.title}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-white">
                  {post.excerpt.split(' ').slice(0, 250).join(' ')}
                </div>
              </div>
              <div className="w-full sm:w-20 font-robotoslab absolute top-0 left-0 h-full lg:flex flex-col justify-between sm:justify-start items-center">
                <div className="left-[53px] top-[180px] absolute origin-top-left -rotate-90 text-white text-md">
                  @{post.author.username}
                </div>
                <div className="w-20 h-20 left-0 top-0 absolute text-right text-white text-3xl font-semibold">
                  {post.date.split('-')[2]}
                  <br />
                  {new Date(post.date).toLocaleString('pt-BR', {
                    month: 'short',
                  })}
                  <br />
                </div>
              </div>
              <div className="md:flex justify-between pl-24 items-center h-full px-10">
                {post?.tags?.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="border border-green-400 rounded-md px-4 py-2 text-green-400 font-robotoslab text-md"
                  >
                    #
                    <img
                      src={tag?.icon?.url}
                      alt={tag?.title}
                      className="w-4 h-4 inline-block mr-2"
                    />{' '}
                    {tag?.slug}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  )
}
