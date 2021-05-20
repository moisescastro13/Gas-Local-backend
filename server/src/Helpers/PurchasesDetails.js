module.exports = {
    FormatDataToBulk(purchasesDetails,id){
    let purchases = [];
    for (purchase of purchasesDetails){
        purchase.PurchaseId = id;
        purchases.push(purchase);
    }
    return purchases
  },
  AmountResult(purchasesDetails){
    let Total = 0;
    for (purchase of purchasesDetails){
      Total += purchase.Quantity * purchase.Cost;
    }
    return Total;
  }
}