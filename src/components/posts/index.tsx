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
              <div className="w-full pb-4 top-0 relative font-robotoslab ml-0 sm:ml-24 pr-0 sm:pr-20">
                <div className="text-2xl font-bold sm:text-xl md:text-4xl text-green-400 break-all pr-0 sm:pr-20">
                  {post.title}
                </div>
                <div className="text-lg sm:text-base md:text-lg break-all text-white pr-0 sm:pr-20">
                  {post.excerpt.split(' ').slice(0, 250).join(' ')}
                </div>
              </div>
              <div className="w-full sm:w-20 font-robotoslab absolute top-0 left-0 h-full lg:flex flex-col justify-between sm:justify-start items-center hidden sm:block">
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
              <div className="sm:hidden w-full flex justify-between items-center h-full px-10 pl-0 sm:pl-24">
                <div className="text-white text-md">
                  @{post.author.username}
                </div>
                <div className="text-white text-md font-semibold">
                  {post.date.split('-')[2]}{' '}
                  {new Date(post.date).toLocaleString('pt-BR', {
                    month: 'short',
                  })}
                  <br />
                </div>
              </div>
              <div className="flex flex-wrap justify-start items-center h-full px-10 mt-3 pl-0 sm:pl-24">
                {post?.tags?.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="inline-flex text-xs sm:text-sm text-white border-green-40 border-2 px-2 py-1 rounded-full items-center mr-2 mb-2"
                  >
                    <span className="inline-block">#</span>
                    <img
                      src={tag?.icon?.url}
                      alt={tag?.title}
                      className="w-4 h-4 mr-2 object-contain"
                    />
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
