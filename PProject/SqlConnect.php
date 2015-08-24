<?php
/**
 * Created by PhpStorm.
 * User: testt
 * Date: 2015/2/5
 * Time: 11:40
 */

class SqlConnect
{
    var $address;
    var $userName;
    var $password;

    var $con;
    function SqlConnect($add, $un, $pa)
    {
        $this->address = $add;
        $this->userName = $un;
        $this->password = $pa;
    }

    function initSql()
    {
        if(!$this->address && !$this->userName && !$this->password)
        {
            $this->con = mysql_connect($this->address, $this->userName, $this->password);
            if(!$this->con)
            {
                die("Could not connect:" . mysql_error());
            }
        }
    }

    function closeSql()
    {
        if($this->con)
            mysql_close($this->con);
    }

    //创建数据库
    function createDatabase($sqlName)
    {
        if($this->con)
        {
            if(mysql_query("CREATE DATABASE".$sqlName, $this->$con))
            {
                echo "Database created";
            }
            else
            {
                echo "Error creating database:".mysql_error();
            }
        }
    }

    //创建表
    function createTable($sqlName, $tableName)
    {
        if($this->con)
        {
            $sql = "CREATE TABLE.'$tableName'.
            (
                FirstName VARCHAR (15),
                LastName VARCHAR (15),
                Age INT
            )";

            mysql_query($sql, $this->con);
        }
    }

    //插入数据
    function insertInfo($tableName)
    {
        mysql_query("INSERT INTO '$tableName' (FirstName, LastName, Age) VALUES ('Glenn', 'Quagmire', '33')");
    }
}