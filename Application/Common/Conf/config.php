<?php
$public_system_db_host = 'localhost';
$public_system_db_name = 'kepu';
$public_system_db_user = 'root';
$public_system_db_pwd  = 'root';

return array(
	'LOG_RECORD' => false,
	'SITE_INFO'  => array(
	),
	'TOKEN'         => array(
		'false_static' => 2,
	),
	'WEB_ROOT'  => '',
	'DB_HOST'   => $public_system_db_host,
	'DB_NAME'   => $public_system_db_name,
	'DB_USER'   => $public_system_db_user,
	'DB_PWD'    => $public_system_db_pwd,
	'DB_PORT'   => '3306',
	'DB_PREFIX' => '',
	'webPath'   => '/',
);
?>