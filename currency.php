<?php
$country_in = htmlspecialchars($_GET['country_in']);
$country_out = htmlspecialchars($_GET['country_out']);
$valid_countries = array('GBP', 'CNY', 'HKD', 'SGD', 'MYR', 'THB', 'EUR', 'UPC', 'USD', 'TWD');

if ( !in_array($country_in, $valid_countries) || !in_array($country_out, $valid_countries) ) {
    $country_in = 'USD';
    $country_out = 'USD';
}
if ($country_in == 'UPC') { $country_in = 'USD'; }
if ($country_out == 'UPC') { $country_out = 'USD'; }

$content  = file_get_contents('https://tw.rter.info/capi.php');
$currency = json_decode($content, true);

if (array_key_exists("USD".$country_in, $currency) && array_key_exists("USD".$country_out, $currency)) {
  echo json_encode(array($currency["USD".$country_in]['Exrate'], $currency["USD".$country_out]['Exrate'], round($currency["USD".$country_out]['Exrate'] / $currency["USD".$country_in]['Exrate'], 5)));
} else {
  echo 'ERROR';
}