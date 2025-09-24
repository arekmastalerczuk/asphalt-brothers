import React from "react";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/ProductList";

export const metadata = {
  title: "Home",
};

const Homepage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Stuff" limit={4} />
    </>
  );
};

export default Homepage;
