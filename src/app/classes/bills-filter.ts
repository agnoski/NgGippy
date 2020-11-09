export class BillsFilter {
  funcList = {
    "@": (bill, user) => bill.user === user,
    "#": (bill, category) => bill.category === category,
    ":": (bill, shop) => bill.shop === shop,
    "/": (bill, date) => bill.date === date
  }
 
  filter(input: string, bills: any[]) {
    const tokens = this.parseInput(input);
    const filterFunctions = this.getFilterFunctions(tokens);
    return this.applyFilterFunctions(filterFunctions, bills);
  }

  parseInput(input: string): string[] {
    // parse space
    return input.split(" ");
  }

  getFilterFunctions(tokens: string[]): any[] {
    // take first caracter
    // map to a list of filter functions
    return tokens.filter(token => token.length > 1).map(token => {
      return {
        func: this.funcList[token[0]],
        arg: token.slice(1)
      };
    });
  }

  applyFilterFunctions(filterFunctions: any[], bills: any[]): any[] {
    // apply filters
    let billsLocal = bills;
    filterFunctions.forEach(filt => {
      if(filt.func) {
        billsLocal = billsLocal.filter(bill => filt.func(bill, filt.arg));
      }
    });

    return billsLocal;
  }

}
