import FeaturedProducts from './components/FeaturedProducts'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Navbar from './components/Navbar'
import PromoBanner from './components/PromoBanner'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col bg-gray-100">
        <Hero />
        <div className="-mt-[1vw] sm:-mt-[2vw] md:-mt-[2.5vw] lg:-mt-[2vw]">
          <PromoBanner />
        </div>
        <Categories />
        <FeaturedProducts />
        <Footer />
      </main>
    </>
  )
}