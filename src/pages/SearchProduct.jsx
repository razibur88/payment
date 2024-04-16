import React from "react";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {
  let location = useLocation();

  console.log(location.state.searchproduct);
  return <>SearchProduct</>;
};

export default SearchProduct;
