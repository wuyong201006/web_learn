/**
 * Created by testt on 2015/6/24.
 */
var fs = require('fs');
fs.readFile('file/assest/content.txt', 'utf-8', function(err, data){
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log(data);
    }
})