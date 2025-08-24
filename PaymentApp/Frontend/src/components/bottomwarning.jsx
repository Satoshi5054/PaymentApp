import { Link } from "react-router-dom"

export const BottomBody = ({label,buttonText,to})=>{
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer hover:text-blue-600"x to={to}>
        {buttonText}
      </Link>
    </div>
}