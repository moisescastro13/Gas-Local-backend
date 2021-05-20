module.exports = {
    FormatDataToBulk(DataJson,id){
    data = [];
    for (element of DataJson){
        element.CustomerId = id;
        data.push(element);
    }
    return data
  }
}