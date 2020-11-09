/// <reference lib="webworker" />

const funcList = {
  "@": (bill, user) => bill.user === user,
  "#": (bill, category) => bill.category === category,
  ":": (bill, shop) => bill.shop === shop,
  "/": (bill, date) => bill.date === date
}

addEventListener('message', ({ data }) => {
  // parse space
  const tokens = data.str.split(" ");

  // take first caracter
  // map to a list of filter functions
  const filtFun = tokens.filter(token => token.length > 1).map(token => {
    return {
      func: funcList[token[0]],
      arg: token.slice(1)
    };
  });

  // apply filters
  let billsLocal = data.bills.filter(bill => true); // copy
  filtFun.forEach(filt => {
    if(filt.func) {
      billsLocal = billsLocal.filter(bill => filt.func(bill, filt.arg));
    }
  });

  postMessage(billsLocal);
});
