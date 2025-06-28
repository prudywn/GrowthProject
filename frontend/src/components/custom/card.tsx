import Image from "next/image";

export type CardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
};

export const Card = ({ title, description, imageSrc }: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-[48px] overflow-hidden w-full max-w-xs mx-auto text-center  min-w-[85%] md:min-w-0 snap-center flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-36 w-full overflow-hidden rounded-t-[48px]">
        <Image
          src={imageSrc || ""}
          alt=""
          title={title}
          width={400}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-6 h-40">
        <h3 className="text-base font-bold text-[#195872] mb-2">{title}</h3>
        <p className="text-base w-[221px] mx-auto text-black">{description}</p>
      </div>
    </div>
  );
};
