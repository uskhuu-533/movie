import Logo from "./icon/Logo"

const Footer = () => {
    return(
        <div className="w-full h-[280px]  bottom-0 bg-[#4338CA] flex justify-center items-center">
            <div className="max-w-[1280px] h-[136px] flex justify-between">
                <div className="w-1/4 h-full flex flex-col gap-4">

               <Logo fill="#FAFAFA"/>
                <p className="text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
                </div>
                <div className="w-1/2 h-full flex justify-between "> 
                 
                </div>
            </div>
        </div>
    )
}
export default Footer