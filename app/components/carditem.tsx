import { useDispatch } from "react-redux"
import { Link } from "remix"
import { changeTitle, setBackButton } from "~/redux/blog.actions"

interface CardItemProps {
  title: string,
  slug: string,
  description: string
}

export const CardItem: React.FC<CardItemProps> = ({
  slug,
  title,
  description
}) => {

  const dispatch = useDispatch()

  const handleChangeToPost = () => {
    dispatch(changeTitle(title))
    dispatch(setBackButton())
  }

  return (
    <article className="hover:bg-white/5 hover:px-8 py-8 rounded transition-all">
      <span className="text-white/40">1 hour ago</span>
      <Link
        onClick={handleChangeToPost}
        to={slug} className="text-blue-50 hover:text-blue-600 transition-all"><h3 className="py-3 pb-0">{title}</h3></Link>
      <p className="text-white/70 pb-1">{description}</p>
      <div className="flex justify-between">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
        </div>
      </div>
    </article>
  )
}
