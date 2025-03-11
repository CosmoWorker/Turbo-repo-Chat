
interface PropType {
    placeholder: string;
    size: "big" | "small",
    value: string,
    onchange: (value :string)=>void;
}

export function TextInput({
    placeholder,
    size,
    value,
    onchange
}: PropType) {
    return <input placeholder={placeholder} style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor: "black",
        borderWidth: 0,
        borderRadius: "5px"
    }} value={value} onChange={(e)=>onchange(e.target.value)}></input>
}