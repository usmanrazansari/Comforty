'use client'

import ProductDetails from '../../../components/ProductDetails'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <ProductDetails id={params.id} />
      </main>
      <Footer />
    </>
  )
}