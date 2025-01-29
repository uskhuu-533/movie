import Logo from "./icon/Logo"

const Footer = () => {
    return(
        <div className="w-full h-[280px] bg-[#4338CA] flex justify-center items-center">
            <div className="w-[1280px] h-[136px] flex justify-between">
                <div className="w-[248px] h-full flex flex-col gap-4">

               <Logo fill="#FAFAFA"/>
                <p className="text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
                </div>
                <div className="w-[545px] h-full flex justify-between "> 
                 
                </div>
            </div>
        </div>
    )
}
export default Footer