function indexData(){
  var indexData = JSON.parse(readLog("LoggerMailer.txt"))
  return indexData
}

function etfIndexData(){
  var etfIndexData = JSON.parse(readLog("ETFIndex.txt"))
  return etfIndexData
}

function selectedIndexData(){
  var indexData = JSON.parse(readLog("LoggerStockInfo.txt"))
  var selectedItem = {'NewHight':{}, 'NiceFinancialReport':{}, 'BeatEst':{}, 'FailEst':{}, 'NicePEG':{}, 'Supporting':{}, 'HighVolume':{}, 'DCF':{}, 'Graham':{}, 'Lynch':{}, 'ROIC-WACC':{}}
  for(var catName in indexData){
    for(var no in indexData[catName]){
      var data = indexData[catName][no]
      
      // Selectors
      var newHigh = (data['52weekHigh'] - data.price)/data['52weekHigh'] <= 0.03
      var dividend = parseFloat(data.yield) + data.buyback_yield > 5
      var score = data.mscore <= 0 && data.fscore >= 5 && data.zscore >= 1.81
      var strictScore = data.mscore <= -2.22 && data.fscore >= 7 && data.zscore >= 2.99
      var PEG = data.TTM > 0 && data.nextEPS > 0 && data.thisEPS > 0 && data.TTM/data.nextEPS < 3 && data.TTM/data.thisEPS < 3
      var peBetter = data.forwardPe > data.TTM
      var roe15 = data.roeNow > 15
      var supporting = data.ma60support == '↘️🛡'
      var news = data.news == "🗞"
      var beatEst = data.beatAnalyst == "😎"
      var failEst = data.beatAnalyst == "😨"
      var highVolume = data.volumeRatio > 200
      var DCF = data.price < data.iv_dcf && data.price < data.iv_dcf_share
      var Graham = data.price < data.grahamnumber
      var Lynch = data.price < data.lynchvalue
      var roicWaccDiff = data.roic - data.wacc > 0.05
      // Setting Indicators
      if(newHigh && peBetter && roe15) selectedItem.NewHight[data.symbol] = data
      if(strictScore && dividend) selectedItem.NiceFinancialReport[data.symbol] = data
      if(news && beatEst) selectedItem.BeatEst[data.symbol] = data
      if(news && failEst) selectedItem.FailEst[data.symbol] = data
      if(PEG && peBetter) selectedItem.NicePEG[data.symbol] = data
      if(supporting && peBetter) selectedItem.Supporting[data.symbol] = data
      if(highVolume) selectedItem.HighVolume[data.symbol] = data
      if(DCF) selectedItem.DCF[data.symbol] = data
      if(Graham) selectedItem.Graham[data.symbol] = data
      if(Lynch) selectedItem.Lynch[data.symbol] = data
      if(roicWaccDiff) selectedItem['ROIC-WACC'][data.symbol] = data
    }
  }
  return selectedItem
}
