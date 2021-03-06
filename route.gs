function doGet(e){
  Logger.log(e.queryString)
  if(e.queryString !==''){  
    switch(e.parameter.mode){
      case 'historyData': 
        return e.parameter.symbol? historyChartController(e.parameter.symbol.toLowerCase()) : messageController("Chart Not Found!!")
      case 'historyETFData': 
        return e.parameter.symbol? historyETFChartController(e.parameter.symbol.toLowerCase()) : messageController("Chart Not Found!!")
      case 'compareData': 
        return e.parameter.symbols? historyCompareController(e.parameter.symbols.toLowerCase()) : messageController("Chart Not Found!!")
      case 'corrLab': 
        return e.parameter.symbols? corrLabController(e.parameter.symbols.toLowerCase()) : messageController("Chart Not Found!!")
      case 'unsubscribe': 
        return (e.parameter.email && e.parameter.id) ? unsubscribeController(e.parameter.email, e.parameter.id) : messageController("No Such Email or ID")
      case 'etf': 
        return indexController("etf")
      case 'macro': 
        return indexController("macro")
      case 'compare': 
        return indexController("compare")
      case 'stock': 
        return indexController("stock")
      case 'selector': 
        return indexController("selector")
      case 'superInvestor': 
        return indexController("superInvestor")
      case 'test': 
        return indexController("test")
      case 'missionControl': 
        return e.parameter.task? remoteMission(e.parameter.task) : messageController("Task Not Found!!")
      default:
        return indexController("stock")
    }
  }else{
    return indexController("stock")
  }
}

function doPost(e) {
  var msg = JSON.parse(e);
  messageController(msg)
}