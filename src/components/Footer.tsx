import { Film, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";


const Footer = () => {
  const router = useRouter()
  return (
    <div className="w-full h-[280px] text-white  bottom-0 bg-[#4338CA] flex justify-center">
      <div className="max-w-[1280px] w-full h-[136px] lg:flex-row flex flex-col mt-10 px-8 lg:px-0 lg:justify-between gap-4">
        <div className="h-full flex flex-col gap-2">
        <div onClick={()=> router.push("/")} className="flex gap-2 font-bold italic items-center text-white"><Film stroke="white" strokeWidth={1.2}/> Movie Z</div>
          <p className="text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="w-2/5 h-full flex justify-between gap-8 text-[14px]">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[15px]">Contact Information</p>
            <div className="flex items-center gap-2">
              <Mail width={16} height={16} />
              <div>
                <p className="font-semibold">Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Phone width={16} height={16} />
              <div>
                <p className="font-semibold">Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-[15px] line-1">Follow us</p>
            <div className="flex flex-col lg:flex-row lg:gap-4 gap-2">
              <a href="">Facebook</a>
              <a href="">Instagram</a>
              <a href="">Twiter</a>
              <a href="">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
