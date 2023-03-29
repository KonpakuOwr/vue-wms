export default {
    state: {
        receiptStockPageData:{
            records:[],
            total: 0
        },
    },
    mutations:{
        addStock(state, form){
            state.receiptStockPageData.records.push(form);
            state.receiptStockPageData.total += 1;
        },
        deleteStock(state, rowList){
            // 删除对应表格想
            for (let row of rowList) {
                state.receiptStockPageData.records = state.receiptStockPageData.records.filter(
                    function (item){
                        return row.skuId !== item.skuId;
                    }
                )
                state.receiptStockPageData.total -= 1;
            }
        },
        // 给
        addReceiptId(state, receiptId){
            for (let stock of state.receiptStockPageData.records){
                stock.receiptId = receiptId;
            }
        }
    }
}
