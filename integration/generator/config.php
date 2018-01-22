<?php
$config = array(
    'wsdl' => 'http://lfs.tradingcrm.com:8085/mex',
    'apiLocation' => 'https://lfs.tradingcrm.com:8086/CrmServiceBasic',
    'organization' => 'BWMExchange',
    'businessUnitName' => 'BWM Exchange',
    'ownerUserId' => '21f6a98f-24b3-e711-80ce-005056b12a8f',
    'username' => 'LF.BWMExchange.owner@tradingcrm.com',
    'password' => 'jb2h286A',
    'tradingPlatforms' => array(
        'DEMO' => array(
            'name' => 'MTDemo',
            'id' => 'ee613a40-6da3-e711-80ce-005056b12a8f'),
        'REAL' => array(
            'name' => 'MTReal',
            'id' => '07b1570f-6da3-e711-80ce-005056b12a8f',
        ),
    ),
    'wsdlCache' => WSDL_CACHE_MEMORY
);