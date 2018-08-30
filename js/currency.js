function transferCurrency(country_in, country_out, cash_in, fees, fees_up, transfer_fees, sroll_to_result) {
  $.get('currency.php?country_in=' + country_in + '&country_out=' + country_out, function (rates) {
    var rates = JSON.parse(rates);
    var UPC_IN_rate = rates[0]; // UPC對匯出國家的匯率   
    var UPC_OUT_rate = rates[1]; // UPC對入帳國家的匯率
    var rate = rates[2];
    var cash_up = parseFloat((cash_in - fees_up - transfer_fees) * rate).toFixed(2);
    $('.cash-up').html(cash_up);
    $('.cash-tradition').html(parseFloat((cash_in - fees - transfer_fees) * rate).toFixed(2));
    $('.upcoin-in').html("(" + parseFloat(cash_in / (UPC_IN_rate * 1.02)).toFixed(2) + " UPC)");
    $('.upcoin-out').html("(" +parseFloat(cash_up / UPC_OUT_rate).toFixed(2) + " UPC)");
    if (sroll_to_result) {
      $('.result-point').click();
    }
  });
}

function calFees(cash, fees_rate){
  return parseFloat((parseInt(cash) * fees_rate).toFixed(2));
}

function currencyHandler(sroll_to_result){
  var currency_in = $('#currencyIn').val();
  var currency_out = $('#currencyOut').val();
  var cash_in = parseInt($('#currencyValue').val());

  if (cash_in <= 0 || isNaN(cash_in)) {
    $('#alertMessage').find('.modal-body').text('请输入试算金额');
    $('#alertMessage').modal('show');
  } else if (cash_in > 99999999){
    $('#alertMessage').find('.modal-body').text('试算金额不可超过 99,999,999');
    $('#alertMessage').modal('show');
  } else {
    $('.currency_in_title').html($('#currencyIn option:selected').data('text'));
    $('.currency_out_title').html($('#currencyOut option:selected').data('text'));

    // 換國旗
    $('#currencyInFlag').attr('class', 'currency-flag currency-flag-' + $('#currencyIn option:selected').val());
    $('#currencyOutFlag').attr('class', 'currency-flag currency-flag-' + $('#currencyOut option:selected').val());

    $('.currency-in').html(' ' + currency_in);
    $('.currency-out').html(' ' + currency_out);
    $('.cash-in').html(cash_in);

    // 算手續費＆轉帳費
    var fees = calFees(cash_in, 0.04);
    var fees_up = calFees(cash_in, 0.02);
    var transfer_fees = calFees(cash_in, 0.01);
    $('.fees').html(fees);
    $('.transfer-fees').html(transfer_fees);
    $('.fees-up').html(fees_up);

    // 轉換匯率
    transferCurrency(currency_in, currency_out, cash_in, fees, fees_up, transfer_fees, sroll_to_result);
  }
}

$(function(){
  currencyHandler(false);

  $('#trans').click(function (e) {
    e.preventDefault();
    currencyHandler(true);
  });

});