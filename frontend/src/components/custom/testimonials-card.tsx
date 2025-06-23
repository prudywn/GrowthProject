import { motion } from "framer-motion";
import Image from "next/image";

type CardProps = {
  title?: string;
  description: string;
  className?: string;
};

export const TestimonialsCard = ({ description, className }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`bg-white shadow-lg rounded-[32px] p-6 text-left w-full max-w-sm min-w-[85%] md:min-w-0 snap-center flex-shrink-0 ${className}`}
    >
      <div className="  mb-4">
        <Image src={"/images/quotes2.png"} alt="" width={20} height={20} />
      </div>
      <p className="text-sm text-black leading-relaxed mb-6">{description}</p>
      <div className="flex justify-end items-center">
        <Image src={"/images/quotes.png"} alt="" width={20} height={20} />
      </div>
      <hr className="mb-4 border-t" />
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
        <p className="text-sm font-bold text-black">Name, Role, Company</p>
      </div>
    </motion.div>
  );
};
