import { FilterBy, ICheckboxFilter, IFilters, IPriceFilter } from "../../types/filters";

import { IProduct } from "../../types/product";
import { getCheckedValues } from "./filter-data";

const filterByProductType = (products: IProduct[], filterField: ICheckboxFilter) => {
  const filterValue = getCheckedValues(filterField);
  
  return products.filter((product) => {
    const productValue = product[FilterBy.productType];
    const intersection = productValue.filter((value) => filterValue.includes(value));
    return intersection.length > 0;
  });
}

const filterByProducer = (products: IProduct[], filterField: ICheckboxFilter) => {
  const filterValue = getCheckedValues(filterField);

  return products.filter((product) => {
    const productValue = product[FilterBy.producer];
    return filterValue.includes(productValue);
  });
}

const filterByPrice = (products: IProduct[], filterField: IPriceFilter) => {
  const { priceMin, priceMax } = filterField;
  return products.filter((product) => {
    const productValue = product[FilterBy.price];

    if (priceMax > 0) {
      return productValue > priceMin && productValue < priceMax;
    } else {
      return productValue > priceMin;
    }
  });
}

export const filterProducts = (products: IProduct[], filter: IFilters) => {
  let filteredProducts = products;
  
  filteredProducts = filterByProductType(filteredProducts, filter[FilterBy.productType]);
  filteredProducts = filterByProducer(filteredProducts, filter[FilterBy.producer]);
  filteredProducts = filterByPrice(filteredProducts, filter[FilterBy.price]);
  
  return filteredProducts;
}
