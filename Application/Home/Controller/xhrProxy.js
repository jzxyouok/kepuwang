/**
 * 保持请求发起时间点，分布均匀，杜绝同一时间点多个请求一起发送
可以限制请求频率，如最多 一秒5个请求
可以限制最大连接数，如同时在线请求最多为 10个
保证请求与回调按照顺序执行，如，一秒内做了请求  A,B,C,D,E，那么其callback执行也需按照A,B,C,D,E的顺序执行，以保证依赖
兼容移动端
 * 解决思路：
 * 1、所有的请求放在一个队列里面
 * 2、监听第一个元素的callback，如果数组第一个元素完成callback，将其移出队列，重复此步骤直至数组为空
 * 3、请求发出
 * 
 */
! function() {

    function init(maxPerSecond, max) {
        //请求队列
        this.xhrQueue = xhrQueue || [];
        //最大请求发出速度
        this.maxPercond = maxPerSecond;
        //最大并发数
        this.max = max;
        //当前并发数
        this.concurrency = 0;
        // 每有新请求，先添加至队列中等候处理
        this.addXHR = function(method, url, data, callback) {
            var newXHR = {
                method: method,
                url: url,
                data: data,
                callback: callback,
                returnData: null,
                startTime: new Date(),
            };

            xhrQueue.push(newXHR);

            //如果加入时，请求队列为空，手动发出第一个请求
            if (xhrQueue.length === 1) {
                this.handleRequest();
                this.handleCallback();
            }
        };
        // 处理请求得到回应后的回调函数
        this.handleCallback = function(callback, data) {
            // 将实时并发量减一
            this.concurrency--;
            callback(data);
            //回调完成后，删除队列首元素
            xhrQueue.unshift();
            // 如果此时队首元素已得到请求回应，执行回调函数
            if (xhrQueue.length > 0) {
                if (xhrQueue[0].returnData !== null) {
                    handleCallback(xhrQueue[0].callback, xhrQueue[0].returnData);
                } else {
                    setTimeout(this.handleCallback(), 1000); //如果队列首元素请求还未得到回应， 1S后再尝试执行回调
                }
            }
        };
        this.handleRequest = function() {
            while (this.concurrency <= xhrQueue.length) //当还有请求没发出时
            // 如果当前并发数未达上限  并且 速度小于最大速度限制
                if (this.max !== this.concurrency &&
                this.concurrency / (new Date() - xhrQueue[0].startTime) < this.maxPercend) {
                // 当前并发数加一
                // 发送请求
                this.concurrency++;
                sendXhr(xhrQueue[this.concurrency]);
            } else {
                //如果当前有请求未发出，但不满足发出请求条件；200ms后再次尝试
                setTimeout(function() {}, 200);
            }
        };
    }
}
var xhrHandler = init(3, 10);
for (var i = 0; i < 100; i++)
    xhrHandler.addXHR("get", "localhost:8080", "", console.log);
// 异步请求发出函数
function handleXhr(queueItem) {
    var xhr;
    var ids = [
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
    ];

    if (XMLHttpRequest) {
        xhr = new XNLHttpRequest();
    } else {
        for (var i = 0; i < ids.length; i++) {
            try {
                xhr = new ActiveXObject(ids[i]);
            } catch (e) {}
        }

    }
    xhr.onreadystatechange = function() {
        if (myxhr.readyState === 4 && myxhr.status === 200) {
            console.log("");
        }

        xhr.open(queueItem["method"], queueItem["url"], true);
        xhr.send(queueItem["data"]);
    }


}
