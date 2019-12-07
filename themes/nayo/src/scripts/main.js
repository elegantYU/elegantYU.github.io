require("@scripts/extends");
require("@styles/styles.scss");

import { addLoadEvent } from "@scripts/dom";
import Lazyload from "@scripts/lazyload";
// import Totop from '@scripts/totop'
import ActiveNav from "@scripts/activeNav";
import Header from "@scripts/header";
import Search from "@scripts/search";
import Mobile from "@scripts/mobile";

addLoadEvent(() => {
  const funcs = [ActiveNav, Header, Lazyload, Search, Mobile];

  for (let fn of funcs) {
    fn.init();
  }
});

// JUST SAY HELLO WORLD.
console.log("及时行乐");
