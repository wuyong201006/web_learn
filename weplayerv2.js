$ (function ()
{
	//EmbedWePlayer--
	//(swfUrl, id, width, height, version, expressInstallSwfurl, flashvars, params, attributes, callbackFn)
	swfobject.embedSWF ("weplayer/swf/M3U8Player.swf", "weplayer", '100%', '100%', '9.0', null, {
		creditPerSec: 600,// 600 credits / per
		openId: activeBy_get () || null,
		crediturl: location.protocol + '//' + location.host + '/suntv/credits/add',
		barrageurl: './weplayer/swf/Barrage.swf'
	}, {
		wmode: 'opaque',
		allowscriptaccess: true,
		allowfullscreen: true,
		bgcolor: '#000'
	});
	//LoadChannel
	loadChannels ();

    registerIO ();

    $ ('.fullScreen').click (function ()
    {
        launchFullscreen (document.documentElement); // the whole page
    });

    if (binder_get ()) updateBinder (binder_get ());
    else
    {
        $ ('.binder').fadeOut ();
        //$(".mask").hide();
    }
    eventListener();

    initQRCode();
});

function initQRCode(){

    $.get (qrurl + openId_get () + '&aid=' + ($.url.setUrl(window.location.href).param ('aid') || ''), function (mpImg)
    {
        codeImg = mpImg;
        $ ('.imgqrcode').attr ('src', mpImg);
        setTimeout (function ()
        {
            $ ('.imgqrcode').removeClass ('imgloading');
        }, 100);
    });
}

function eventListener(){
    $(".showQr").on("click",function(){
        $(".guide_page").hide();
        $("#qrcodeContainer").show();
        $(".mask").show();

    });
    $("#play_on").on("click",function(){
        $(".guide_page").hide();
        $("#qrcodeContainer").show();
        $(".mask").show();
    });

    $("#qc_close").on("click",function(){
        $("#qrcodeContainer").hide();
        $(".mask").hide();
    });
    $(".show_play_raiders").on("click",function(){
        $("#qrcodeContainer").hide();
        $(".guide_page").show();
        $(".mask").show();

    })
}

// Find the right method, call on correct element
function launchFullscreen (element)
{
    if (element.requestFullscreen)
    {
        element.requestFullscreen ();
    } else if (element.mozRequestFullScreen)
    {
        element.mozRequestFullScreen ();
    } else if (element.webkitRequestFullscreen)
    {
        element.webkitRequestFullscreen ();
    } else if (element.msRequestFullscreen)
    {
        element.msRequestFullscreen ();
    }
}
// Whack fullscreen
function exitFullscreen ()
{
    if (document.exitFullscreen)
    {
        document.exitFullscreen ();
    } else if (document.mozCancelFullScreen)
    {
        document.mozCancelFullScreen ();
    } else if (document.webkitExitFullscreen)
    {
        document.webkitExitFullscreen ();
    }
}



//webDeviceSc
var sc_sp = "../deviceActive";
var u_sp = "../user/info";
function webDeviceBy (by)
{
    $.getJSON (sc_sp + "?by=" + by, function (data)
    {
        console.log ('ActiveBy-----', data);

        //激活初始化播放器
        if ($ ('#weplayer').length && $ ('#weplayer')[0].initCredit)
        {
            $ ('#weplayer')[0].initCredit({
                creditPerSec : 1,// 600 credits / per
                openId : activeBy_get() || null,
                crediturl : location.protocol + '//' + location.host + '/suntv/credits/add'
            });
        }
    });

    updateBinder (by);
}

function updateBinder (openId)
{
    //upatebinder
    $.getJSON (u_sp + "?openId=" + openId, function (data)
    {
        var $b = $ ('.binder');
        $b.fadeIn ();
        $b.find ('.head').attr ('src', data.headimgurl);
        $b.find ('.nickname').text (data.nickname + '  欢迎您');
    });
}

//RegisterSocketIO
function registerIO ()
{
    connectSingle (function (msg)
    {
        console.log ("MESSAGE---", msg);

        switch (msg.code)
        {
            case 'bind':

                hideRqcode ();

                //Active
                webDeviceBy (msg.from);

                break;
            default:
                rejectPlay (msg);
        }
    });
}

var channel_sp = '../channel/default';

function loadChannels ()
{
    $.getJSON (channel_sp, function (channels)
    {
        channelList = channels;

        //默认activeChannels
        activeChannels = channelList.slice (0);

        allComplete ();
    });
}


var codeImg = "";
var qrurl = '../qrcode?sc=';
function showRqcode ()
{
    if (codeImg == "")
    {
        $("#qc_close").on("click",function(){
            $("#qrcodeContainer").hide();
            $(".mask").hide();
        });

        $ ('.imgqrcode').attr ('src', './weplayer/images/listplay_loading.gif');
        $.get (qrurl + openId_get () + '&aid=' + ($.url.setUrl(window.location.href).param ('aid') || ''), function (mpImg)
        {
            $ ('.imgqrcode').attr ('src', mpImg);
            setTimeout (function ()
            {
                $ ('.imgqrcode').removeClass ('imgloading');
            }, 100);
        });
    }

    $ ('#qrcodeContainer,.mask').show ();
}

function tip(){
    $("#tip,#fullScreenBtn").delay(1000).show(400).delay(8000).fadeOut(800);
    $(document).mousemove(function(){
        $("#fullScreenBtn").hide();
    });
}
function hideRqcode ()
{
    $ ('#qrcodeContainer,.mask').hide ();
    tip();
}


function getTokenLiveURL (cn, cb)
{
    $.getJSON ('../tokenLiveURL?cn=' + cn, function (data)
    {
        if (data.state == 'ok')
        {
            cb (null, data.url);
        } else
        {
            cb (null);
        }
    });
}

function allComplete ()
{
    cn = $.url.param ('autoplay') || 'CCTV4';
    if (cn)
    {
        var channelExistArr = [];
        for (var i = 0; i < activeChannels.length;)
        {
            if (activeChannels[i].english_name == cn)
            {
                channelExistArr.push (activeChannels[i]);
            }
            ;
            i += 1;
        }
        ;

        if (channelExistArr.length)
        {
            crtchannelchanged (channelExistArr[0]);

            getTokenLiveURL (cn, function (err, data)
            {
                if (!err)
                {
                    load (crtchannel.live_url + (data.replace('TOKEN',token_get())),$.url.setUrl (data).param ('access_token'),$.url.setUrl (data).param ('type'));
                }
            });

            updatePlayState ();
        }
    }
}

function crtchannelchanged (cn)
{
    crtchannel = cn;

}
//播放器初始化延迟----------------
var _weplayerdelayurl = '';
function load (l, t,type)
{
    if (l)
    {
        if (l.indexOf ("suffix=m3u8") == -1)
        {
            l += "&suffix=m3u8";
        }

        var cnchanel = "";
        for (var i = 0; i < channelList.length; i++)
        {
            if (channelList[i].english_name == cn)
            {
                cnchanel = channelList[i];
                break;
            }
        }

        if ($ ('#weplayer').length && $ ('#weplayer')[0].command)
        {
            $ ('#weplayer')[0].command ({code: 'play', data: {url: l, title: '', extras: {
                "view_code": type,
                "end_time": 0,
                "start_time": 0,
                "channel_name": cn,
                "token": token_get(),
                "baseVod": cnchanel.vod_url,
                "baseLive": cnchanel.live_url
            }}});

        } else
        {
            _weplayerdelayurl = l;
            _weplayertoken = t;
            _weplayertype = type;
        }
    }
}

function updatePlayState ()
{
    if (typeof crtchannel != 'undefined')
    {
        var title = crtchannel.chinese_name;

        if (crtchannel.program) title += '-' + crtchannel.program;

        updateTip ('正在直播>' + title);
    }
}

function updateTip (cnt)
{
    //播放指示
    $ ('.playtitle').html (cnt);
}


//RejectPlay
function rejectPlay (msg)
{
    if (msg.code == 'play')
    {
        updateTip ('正在播放>' + msg.data.title);
    }

    if ($ ('#weplayer').length && $ ('#weplayer')[0].command)
        $ ('#weplayer')[0].command (msg);
}
function playerReady () {
    if (_weplayerdelayurl && _weplayertoken) load (_weplayerdelayurl,_weplayertoken,_weplayertype);
}