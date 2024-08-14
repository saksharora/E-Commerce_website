import { Link } from "react-router-dom";
import { HERO_INFO } from "~/constants";
import ManImg from "~assets/women.png";

const Hero = () => {
  const {  saleTitle, underTitle,description } = HERO_INFO;
  return (
    <section
      className="
      h-[800px]
    bg-lightBlueCustom bg-opacity-70
    bg-no-repeat bg-cover bg-center
    py-24
                "
    >
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
          
          </div>
          <div className="text-7xl xs:text-8xl sm:text-7xl xl:text-[60px] leading-[1.1] font-light mb-4 uppercase">
          <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl">
          {underTitle}
</h1>
<p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
  {saleTitle}
</p>
       
          </div>
          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 border-primary"
          >
            {description}
          </Link>
        </div>
        <div className="hidden lg:block">
        <img
  className="ml-auto mr-[-70px] -mt-[100px] h-[800px] w-auto"
  src={ManImg}
  alt="Man"
/>


        </div>
      </div>
    </section>
  );
};
export default Hero;
