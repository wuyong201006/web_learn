/**
 * Created by PhpStorm.
 * User: testt
 * Date: 2015/1/30
 * Time: 10:14
 */
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<h1>我的第一张 PHP 页面</h1>

<?php
    require_once 'BaseSocket.php';
    require_once 'SqlConnect.php';

    echo "Hello Word!<br>";

    //server socket
//    $baseSocket = new BaseSocket('127.0.0.1', '8083');
//    $baseSocket->initSocket();
//    return;

    //connect sql

    $sqlConnect = new SqlConnect('127.0.0.1', 'root', '');
    $sqlConnect->initSql();
?>

</body>
</html>