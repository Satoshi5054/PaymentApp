

export const InputBox = ({onChange,label, placeholder})=>{
    return <div>
        <div className="text-left text-sm py-2 font-medium">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-2 border rounded border-slate-200"/>
    </div>
}