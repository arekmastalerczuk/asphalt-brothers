import React from "react";
import ProductList from "@/components/shared/product/ProductList";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ViewAllProductsButton from "@/components/ViewAllProductsButton";

export const metadata = {
  title: "Home",
};

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Stuff" limit={4} />
      <ViewAllProductsButton />
    </>
  );
};

export default Homepage;
