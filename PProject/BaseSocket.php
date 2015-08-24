header(“Content-Type: text/html; charset=utf-8")
<?php
/**
 * Created by PhpStorm.
 * User: testt
 * Date: 2015/2/2
 * Time: 14:09
 */
class BaseSocket
{
    var $address;
    var $port;
    var $sock;

    var $serverPort;
    var $IsPolicy;
    function BaseSocket($add, $po)
    {
        $this->address = $add;
        $this->port = $po;

        $this->serverPort = 843;
        $this->IsPolicy = false;
    }

    function initSocket()
    {
        set_time_limit(0);
        ob_implicit_flush();

        $this->sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if($this->sock < 0)
        {
            echo "socket_create() failed:reason:" . socket_strerror($this->sock)."\n";
        }
        else
        {
            if($this->policyHandler())return;
            echo "第二部";
//            if(!$this->address && !$this->port)
//            {
                    if($ret = (socket_bind($this->sock, $this->address, $this->port)) < 0)
                    {
                        echo "socket_bind() failed:reason:" .socket_strerror($ret)."\n";
                        return;
                    }

                    if(($ret = socket_listen($this->sock, 5)) < 0)
                    {
                        echo "socket_listen() failed:reason:" . socket_strerror($ret)."\n";
                        return;
                    }

                    echo "socket start accept...";
                    echo "<br/>";
                    $this->listenHandler();
//            }
        }
    }


    function policyHandler()
    {
        if($ret = (socket_bind($this->sock, $this->address, $this->serverPort)) < 0){
            return;
        }
        else{
            echo "policy socket_bind() success";
            echo "<br/>";
        }


        if(!($ret = socket_listen($this->sock, 5))){
            return;
        }
        else{
            echo "policy socket_listen() success";
            echo "<br/>";
        }

        do{
            if(!($posock = @socket_accept($this->sock))){
                echo "policy socket_accept() failed:reason:";
                echo "<br/>";
                break;
            }
            else{
                try{
                    if($buf = @socket_read($posock, 22)){
                        $ppos = strpos("$buf", "policy-file-request");
                        if($ppos){
                            $msg = "<cross-domain-policy><site-control permitted-cross-domain-policies='all'/><allow-access-from domain='*' to-ports='*'/></cross-domain-policy>";
                            $sent = socket_write($posock, $msg."\0", strlen($msg."\0"));
                            if(!$sent){
                                echo "sent state false";
                                echo "<br/>";
                            }
                            else{
                                echo "sent state true";
                                echo "<br/>";
                                $this->IsPolicy = true;
                            }
                        }
                    }
                    break;
                }
                catch(Exception $e){
                    echo 'Read Policy Message'.$e->getMessage();
                    break;
                }
            }
        }
        while(true);

        return $this->IsPolicy;
    }
    /**
     *    接受数据
     */
    function listenHandler()
    {
        do{
            try{
                if(!($msgsock = @socket_accept($this->sock))){
                    echo "socket_accept() failed:reason:" . socket_strerror($msgsock)."\n";
                }
                else{
                    try{
                        if($buf = @socket_read($msgsock, 22)){
                            //带有<>需要强转加"";
                            $ppos = strpos("$buf", "policy-file-request");
                            if ($ppos){
                                echo "accept policy-file-request...";
                                echo "<br/>";
                                $msg = "<cross-domain-policy> <site-control permitted-cross-domain-policies='all'/><allow-access-from domain='*' to-ports='*'/></cross-domain-policy>";
                                $sent = socket_write($msgsock, $msg."\0", strlen($msg."\0"));
                                if(!$sent)
                                {
                                    echo "sent state: false";
                                    echo "<br/>";
                                }
                                else
                                {
                                    echo "sent state: true";
                                    echo "<br/>";
                                }

//                                echo htmlspecialchars($msg);

//                                $talkback = "PHP:You said '$buf'.\n";
//                                socket_write($msgsock, $talkback, strlen($talkback));
                            }
                            else {
                                $talkback = "PHP:You said error.\n";
                                socket_write($msgsock, $talkback, strlen($talkback));
                            }
                        }
                    }
                    catch(Exception $e) {
                        echo 'Read Message'.$e->getMessage();
                        break;
                    }
                };

//                socket_close($msgsock);
                break;
            }
            catch(Exception $e){
                echo 'Message:'.$e->getMessage();
                break;
            }
        }while(true);
    }
}
?>