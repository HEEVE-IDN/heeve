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
import Example13 from "./example13/Example13";
import Example13ProductPage from "./example13/ProductPage";
import Example14 from "./example14/Example14";
import Example14ProductPage from "./example14/ProductPage";
import Example15 from "./example15/Example15";
import Example15ProductPage from "./example15/ProductPage";
import Example16 from "./example16/Example16";
import Example16ProductPage from "./example16/ProductPage";
import Example17 from "./example17/Example17";
import Example17ProductPage from "./example17/ProductPage";
import Example18 from "./example18/Example18";
import Example18ProductPage from "./example18/ProductPage";
import Example19 from "./example19/Example19";
import Example19ProductPage from "./example19/ProductPage";
import Example20 from "./example20/Example20";
import Example20ProductPage from "./example20/ProductPage";
import Example21 from "./example21/Example21";
import Example21ProductPage from "./example21/ProductPage";
import Example22 from "./example22/Example22";
import Example22ProductPage from "./example22/ProductPage";
import Example23 from "./example23/Example23";
import Example23ProductPage from "./example23/ProductPage";
import Example24 from "./example24/Example24";
import Example24ProductPage from "./example24/ProductPage";
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
import example13 from "./example13/config.json";
import example14 from "./example14/config.json";
import example15 from "./example15/config.json";
import example16 from "./example16/config.json";
import example17 from "./example17/config.json";
import example18 from "./example18/config.json";
import example19 from "./example19/config.json";
import example20 from "./example20/config.json";
import example21 from "./example21/config.json";
import example22 from "./example22/config.json";
import example23 from "./example23/config.json";
import example24 from "./example24/config.json";
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
  example13: {
    config: example13,
    component: Example13,
    productComponent: Example13ProductPage,
  },
  example14: {
    config: example14,
    component: Example14,
    productComponent: Example14ProductPage,
  },
  example15: {
    config: example15,
    component: Example15,
    productComponent: Example15ProductPage,
  },
  example16: {
    config: example16,
    component: Example16,
    productComponent: Example16ProductPage,
  },
  example17: {
    config: example17,
    component: Example17,
    productComponent: Example17ProductPage,
  },
  example18: {
    config: example18,
    component: Example18,
    productComponent: Example18ProductPage,
  },
  example19: {
    config: example19,
    component: Example19,
    productComponent: Example19ProductPage,
  },
  example20: {
    config: example20,
    component: Example20,
    productComponent: Example20ProductPage,
  },
  example21: {
    config: example21,
    component: Example21,
    productComponent: Example21ProductPage,
  },
  example22: {
    config: example22,
    component: Example22,
    productComponent: Example22ProductPage,
  },
  example23: {
    config: example23,
    component: Example23,
    productComponent: Example23ProductPage,
  },
  example24: {
    config: example24,
    component: Example24,
    productComponent: Example24ProductPage,
  },
};
