import type { ComponentType } from "react";
import Example1 from "./example1/Example1";
import Example1ProductPage from "./example1/ProductPage";
import Example2 from "./example2/Example2";
import Example2ProductPage from "./example2/ProductPage";
import Example3 from "./example3/Example3";
import Example3ProductPage from "./example3/ProductPage";
import Example4 from "./example4/Example4";
import Example4ProductPage from "./example4/ProductPage";
import Example5 from "./example5/Example5";
import Example5ProductPage from "./example5/ProductPage";
import Example6 from "./example6/Example6";
import Example6ProductPage from "./example6/ProductPage";
import Example7 from "./example7/Example7";
import Example7ProductPage from "./example7/ProductPage";
import Example8 from "./example8/Example8";
import Example8ProductPage from "./example8/ProductPage";
import Example9 from "./example9/Example9";
import Example9ProductPage from "./example9/ProductPage";
import Example10 from "./example10/Example10";
import Example10ProductPage from "./example10/ProductPage";
import Example11 from "./example11/Example11";
import Example11ProductPage from "./example11/ProductPage";
import Example12 from "./example12/Example12";
import Example12ProductPage from "./example12/ProductPage";
import example1 from "./example1/config.json";
import example2 from "./example2/config.json";
import example3 from "./example3/config.json";
import example4 from "./example4/config.json";
import example5 from "./example5/config.json";
import example6 from "./example6/config.json";
import example7 from "./example7/config.json";
import example8 from "./example8/config.json";
import example9 from "./example9/config.json";
import example10 from "./example10/config.json";
import example11 from "./example11/config.json";
import example12 from "./example12/config.json";
import type { ShowcaseConfig } from "../types/showcase";

export type ShowcaseProps = { navigate: (path: string) => void };
export const showcaseRegistry: Record<
  string,
  {
    config: ShowcaseConfig;
    component: ComponentType<ShowcaseProps>;
    productComponent: ComponentType<{
      config: ShowcaseConfig;
      product: ShowcaseConfig["products"][number];
      navigate: (path: string) => void;
    }>;
  }
> = {
  example1: {
    config: example1,
    component: Example1,
    productComponent: Example1ProductPage,
  },
  example2: {
    config: example2,
    component: Example2,
    productComponent: Example2ProductPage,
  },
  example3: {
    config: example3,
    component: Example3,
    productComponent: Example3ProductPage,
  },
  example4: {
    config: example4,
    component: Example4,
    productComponent: Example4ProductPage,
  },
  example5: {
    config: example5,
    component: Example5,
    productComponent: Example5ProductPage,
  },
  example6: {
    config: example6,
    component: Example6,
    productComponent: Example6ProductPage,
  },
  example7: {
    config: example7,
    component: Example7,
    productComponent: Example7ProductPage,
  },
  example8: {
    config: example8,
    component: Example8,
    productComponent: Example8ProductPage,
  },
  example9: {
    config: example9,
    component: Example9,
    productComponent: Example9ProductPage,
  },
  example10: {
    config: example10,
    component: Example10,
    productComponent: Example10ProductPage,
  },
  example11: {
    config: example11,
    component: Example11,
    productComponent: Example11ProductPage,
  },
  example12: {
    config: example12,
    component: Example12,
    productComponent: Example12ProductPage,
  },
};
