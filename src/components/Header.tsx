const Header = () =>{
   return(
    <div className="w-full z-40 h-[60px] flex justify-center items-center fixed bg-[#09090B]">
        <div className="w-max-[1280px] w-[1280px] h-[60px] flex justify-between items-center">
            <img src="Logo.webp" className="h-6"/>
           <div className="w-[488px] gap-3 flex">
           <button className="w-[96px] z-30 h-[36px] bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center font-bold">Genre</button>
           <input className="w-[380px] h-9 bg-[#09090B] border rounded-md border-[#27272A] flex items-center justify-center" />
           </div> 
           <div className="w-9 h-9 flex items-center justify-center border rounded-md border-[#27272A]">
            <img src="moon.png" />
           </div>
        </div>
    </div>
   )
}
export default Header