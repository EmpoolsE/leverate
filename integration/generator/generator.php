<?php 
include(dirname(__FILE__) . '/../config.php');

require('SoapProxy.php');
require('SoapProxyGenerator.php');

$proxyGenerator = new SoapProxyGenerator($config['wsdl'], array('trace' => true));
$proxyGenerator->serviceAlias = 'LeverateCrm';
$proxyGenerator->outputFile = dirname(__FILE__) . '/../LeverateCrm.php';

$proxyGenerator->generateCode();
