// app/search/products/page.js
import { Suspense } from "react";
import SearchProductsPage from "./SearchProductsPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SearchProductsPage />
    </Suspense>
  );
}
