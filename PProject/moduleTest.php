header(“Content-Type: text/html; charset=utf-8")
<?php
/**
 * Created by PhpStorm.
 * User: testt
 * Date: 2015/2/5
 * Time: 17:50
 * 模块测试
 */
require_once 'BaseSocket.php';
require_once 'SqlConnect.php';

echo "running...<br>";

$baseSocket = new BaseSocket("127.0.0.1", "8083");
$baseSocket->initSocket();
?>