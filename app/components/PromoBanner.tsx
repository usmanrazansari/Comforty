import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
    return (
      <section className="w-full max-w-[1000px] mx-auto px-4 py-2 -mt-24">
        <div className="relative aspect-[16/8] w-full">
          <Link href="/shop">
            <Image 
              src="/images/Company Logo.png"
              alt="Promotional Banner"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1000px) 100vw, 1000px"
            />
          </Link>
        </div>
      </section>
    )
}