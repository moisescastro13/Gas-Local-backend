module.exports = {
    TotalSale(salesDetails){
        let total = 0;
        for(detail of salesDetails){
            total += (detail.UnitCost * detail.Quantity);
            if(detail.Discount){
                total -= detail.Discount;
            }
        }
        return total;
    },
    salesDetailsBulk(salesDetails,id){
        let sales = [];
    for (detail of salesDetails){
        detail.SaleId = id;
        sales.push(detail);
    }
    return sales;
    }
}