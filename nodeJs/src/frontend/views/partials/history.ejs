<script>

  $(document).ready(function(){

    Api('/quote','GET', function(quotes) {
      const quoteData = JSON.parse(localStorage.getItem('quoteData'));

      for (const quote of quotes) {
        $('<tr>')
          .append( $('<th>', { text: quote.coin, class: "centered" }) )
          .append( $('<th>', { text: numberToCoin(quote.value, "R$") }) )
          .append( $('<th>', { text: quoteData.payMethods[quote.payMethod].name }) )
          .append( $('<th>', { text: `R$ 1 = ${numberToCoin(quote.conversionCoinValue, "$")}` }) )
          .append( $('<th>', { text: numberToCoin(quote.coinValue, "$") }) )
          .append( $('<th>', { text: numberToCoin(quote.payMethodRateValue, "R$") }) )
          .append( $('<th>', { text: numberToCoin(quote.conversionRateValue, "R$") }) )
          .append( $('<th>', { text: numberToCoin(quote.netValue, "R$") }) )
          .appendTo('tbody');
      }
    });

  });

  function numberToCoin(coinValue, prefix = null) {
    return `${(prefix == null) ? "" : `${prefix} `}${(Math.round(coinValue) == coinValue) ? coinValue : coinValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, useGrouping:false})}`;
  }
   
</script>