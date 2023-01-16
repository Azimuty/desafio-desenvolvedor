<script>

  $(document).ready(function(){

    Api('/quote-data','GET', function(data) {
      localStorage.setItem('quoteData',JSON.stringify(data));

      let coinHtml = "";
      for (const coin of Object.keys(data.coins))
        coinHtml += `<option value="${coin}">${coin} (${data.coins[coin]})</option>`;
      $('#moedaDestino').html(coinHtml);

      let payMethodHtml = "";
      for (const payMethod of Object.keys(data.payMethods))
        payMethodHtml += `<option value="${payMethod}">${data.payMethods[payMethod].name}</option>`;
      $('#formaPagamento').html(payMethodHtml);
    });

    $('#postQuote').submit(function(e) {
      const body = {
        coin: $('#moedaDestino').val(),
        value: Number($('#valorConversao').val()),
        payMethod: $('#formaPagamento').val()
      };
      Api('/quote', 'POST', function(data) {
        quoteData = JSON.parse(localStorage.getItem('quoteData'));

        $('#coin').html(`${data.coin} (${quoteData.coins[data.coin]})`);
        $('#value').html(numberToCoin(data.value, "R$"));
        $('#payMethod').html(quoteData.payMethods[data.payMethod].name);
        $('#conversionCoinValue').html(`$ 1 = ${numberToCoin(data.conversionCoinValue, "R$")}`);
        $('#coinValue').html(numberToCoin(data.coinValue, "$"));
        $('#payMethodRateValue').html(numberToCoin(data.payMethodRateValue, "R$"));
        $('#conversionRateValue').html(numberToCoin(data.conversionRateValue, "R$"));
        $('#netValue').html(numberToCoin(data.netValue, "R$"));

        $('#novaCotacao').hide();
        $('#resultadoCotacao').show();
      }, body);
      pd(e);
    });

    $('#btnNovaCotacao').click(function() {
      $('#postQuote').trigger("reset");
      $('#novaCotacao').show();
      $('#resultadoCotacao').hide();
    });

  });

  function numberToCoin(coinValue, prefix = null) {
    return `${(prefix == null) ? "" : `${prefix} `}${(Math.round(coinValue) == coinValue) ? coinValue : coinValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, useGrouping:false})}`;
  }
   
</script>