// import { useDispatch } from "react-redux"
// import { changeTitle, setBackButton } from "~/redux/blog.actions"
import { Link } from "remix"

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

  return (
    <article className="hover:bg-white/5 px-7 xl:px-0 hover:px-7 py-7 rounded transition-all">
      <span className="text-white/40">1 hour ago</span>
      <Link
        //onClick={handleChangeToPost}
        to={slug} className="text-blue-50 hover:text-blue-600 transition-all"><h3 className="py-3 pb-0">{title}</h3></Link>
      <p className="text-white/70 pb-1">{description}</p>
      <div className="flex justify-between">
        <div className="flex text-white/70">
          <svg viewBox="0 0 21 21" className="transition-all cursor-pointer hover:fill-accent h-6 w-6 hover:text-accent hover:opacity-80 mr-3" xmlns="http://www.w3.org/2000/svg"><path d="m7.24264069 2.24264069c.5-2.5 4.34314571-2.65685425 6.00000001-1 1.6034073 1.60340734 1.4999617 4.3343931 0 6l-6.00000001 6.00000001-6-6.00000001c-1.65685425-1.65685425-1.65685425-4.34314575 0-6 1.54996042-1.54996043 5.5-1.5 6 1z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3.257 4.257)" /></svg>
          {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> */}
          <svg className="transition-all cursor-pointer hover:fill-blue-500 h-6 w-6 hover:text-blue-500" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" transform="translate(2 3)"><path d="m14.5.5c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2l-2.999-.001-2.29389322 2.2938932c-.36048396.360484-.92771502.3882135-1.32000622.0831886l-.09420734-.0831886-2.29389322-2.2938932-2.999.001c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /><path d="m8.49884033 8.5c.5 0 1-.5 1-1s-.5-1-1-1-.99884033.5-.99884033 1 .49884033 1 .99884033 1zm-4 0c.5 0 1-.5 1-1s-.5-1-1-1-.99884033.5-.99884033 1 .49884033 1 .99884033 1zm7.99999997 0c.5 0 1-.5 1-1s-.5-1-1-1-.9988403.5-.9988403 1 .4988403 1 .9988403 1z" fill="currentColor" /></g></svg>

        </div>
        <div className="flex">
          <svg viewBox="0 0 21 21" className="h-6 w-6 text-white/70 mr-3" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"><path d="m11.5 4.5-3.978-4-4.022 4" /><path d="m7.522.521v11.979" /><path d="m4.5 7.5h-2c-1.1045695 0-2 .8954305-2 2v4c0 1.1045695.8954305 2 2 2h10c1.1045695 0 2-.8954305 2-2v-4c0-1.1045695-.8954305-2-2-2h-2" /></g></svg>
          <svg viewBox="0 0 21 21" className="h-6 w-6 text-white/70" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fillRule="evenodd"><circle cx="10.5" cy="10.5" r={1} /><circle cx="5.5" cy="10.5" r={1} /><circle cx="15.5" cy="10.5" r={1} /></g></svg>
        </div>
      </div>
    </article>
  )
}
