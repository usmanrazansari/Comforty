'use client'
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
      <section className="w-full max-w-[1300px] mx-auto px-4 py-4">
        <div className="relative aspect-[16/10] w-full">
          <Link href="/shop">
            <Image 
              src="/images/Header.png"
              alt="Hero Image"
              fill
              priority
              className="object-fill rounded-lg"
              sizes="(max-width: 1300px) 100vw, 1300px"
              quality={100}
            />
          </Link>
        </div>
      </section>
    )
  }