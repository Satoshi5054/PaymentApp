export const Button = ({label, onClick})=>{
    return <button onClick={onClick} type="button" className="cursor-pointer w-full text-white bg-gray-900 hover:bg-gray-700
     focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3" >
        {label}
    </button>
}