import React from 'react'
import ProductCarousel from "./ProductCarousel";
import FeaturedProductsGrid from "./FeaturedProductsGrid";
import ProductGallery from "./ProductGallery";

export default function Hero() {
  return (
    <div className='flex flex-col'>
			<ProductCarousel />
			<FeaturedProductsGrid/>
				<ProductGallery />

    </div>
  )
}
