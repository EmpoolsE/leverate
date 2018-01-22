<?php
include_once('config.php');
include_once('SoapProxy.php');
include_once('LeverateCrm.php');

function getCrm($config) {
    return new LeverateCrm($config['wsdl'], array(
        'login' => $config['username'],
        'password' => $config['password'],
        'location' => $config['apiLocation'],
        'encoding'=>'UTF-8',
        'cache_wsdl' => $config['wsdlCache'],
        'trace' => false,
        //'proxy_host' => '127.0.0.1',
        //'proxy_port' => 8888,
    ));
}
