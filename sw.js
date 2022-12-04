/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2019/04/18/learn_hexo/index.html","2772970b5728df5fed62834dbe2a0254"],["/2019/08/07/GFW/index.html","a56985fc96cbf7d7f028ca8feb938924"],["/2019/09/02/h5upup/index.html","1ae282694688b63b730f0cf09de37394"],["/2019/09/19/agreeable/index.html","c976f7b914b944da38d89a981dccef71"],["/2019/10/21/cssisgood/index.html","c3fab60c51a35b5f8d18f7ea51f853be"],["/2019/12/08/lyric-ms/index.html","67afd0dc7bcf0e9ce0ca845cefb3244c"],["/2019/12/28/optional-chaining/index.html","031ec196b974dc6b621e57dbdf25a1f6"],["/2020/01/04/back-to-reality/index.html","e4dec1cf808358af32e0e5ae0e2bcf19"],["/2020/04/06/es6-map/index.html","51a034d1df87bbe076b18ca89d9cb213"],["/2020/05/11/git-commit-am/index.html","f6ccb2d7b2471f2e1ed9efdca9649dbf"],["/2020/06/07/webpack+react/index.html","edaa399ec793ebc226888ab179f50f0c"],["/2020/06/13/wallpagerShare2006/index.html","03a3058bb42376c1d1425d736bdc0a1a"],["/2020/11/04/add-two-numbers/index.html","ba13152f5a7f23422fd6628332073eca"],["/2020/11/09/longest-palindromic-substring/index.html","9fa264e5a76fbe0b3456b8fd85feb35a"],["/2020/12/31/CyberPunk2077/index.html","05246f4a65ed814a67b405c750c16578"],["/2021/01/07/interview-2020/index.html","a6a3f1623efb34a05b9d3818685269df"],["/2021/07/12/algorithm-sumthreenum/index.html","87d2129b1386d0c76ea8cee9dafc59da"],["/2021/07/13/algorithm-covertz/index.html","ede4bb42d018b93b3a0a2258eb11ee1e"],["/2021/07/14/algorithm-reomveNodeFromEnd/index.html","49e2c32395f4e9a152c24e588d20ee3f"],["/2021/07/15/algorithm-mergeTwoLists/index.html","ef56ccb8369edf89fef4c61140b7cbee"],["/2021/07/15/algorithm-shootScore/index.html","a82a87ff1f2b269d533ac53969398e95"],["/2021/07/16/algorithm-cycleLink/index.html","d7b917fdf9fbfccd1c51198c81fe084d"],["/2021/07/16/algorithm-linkMiddleNode/index.html","defcb46a4eb49c78d7ce0b4292c15ee3"],["/2021/07/19/algorithm-getMinEqualItem/index.html","e7b9faba68e21e3d1f9a930ad6c4dfde"],["/2021/07/20/algorithm-sumTwoLink/index.html","9299eed35eea401d2c1afae3f10cd3f6"],["/2021/08/04/algorithm-printDomTree/index.html","050212695f3a4c6eb1795b3aac84a4b4"],["/2021/08/04/algorithm-profit/index.html","d2a0d28fb6ecd6527d5d11cefb8dbaeb"],["/2021/08/12/algorithm-climbStairs/index.html","68329a81dbbda97c80c0516c174719b6"],["/2021/09/05/first-in-ctrip/index.html","c9894b22d87e0ac452571061a4369a56"],["/2021/10/24/team-git/index.html","b9acbafa41e6fa4375ae465db0209191"],["/about/index.html","81f9e5d9391a60befd7d7b03bd82dbec"],["/archives/2019/04/index.html","8f20783a48f72e44c16ac3a771a0ea4b"],["/archives/2019/08/index.html","1ba4cd9353723c792098b801d507cf46"],["/archives/2019/09/index.html","b0ae536498c6ae2e5378556765bac750"],["/archives/2019/10/index.html","cbcfcd63f3efd66e26e23533bcff2b97"],["/archives/2019/12/index.html","6db27b550b34c66d9290a1d681b0c134"],["/archives/2019/index.html","9a1d19c488e5d74e54c49e789a6867b8"],["/archives/2020/01/index.html","c375ea11f5c52a9fc8d8ffce7dca7657"],["/archives/2020/04/index.html","af897e166c0e8446f6847bd1d3056d66"],["/archives/2020/05/index.html","4f28b41e283d69a4e5aafa617e3403b9"],["/archives/2020/06/index.html","c018447942e5b5fedfbfd3afa431d4c1"],["/archives/2020/11/index.html","48c0a57d7f604b54bdb7b1c16c827dbe"],["/archives/2020/12/index.html","b80141915d0c1843945517c306d4ff32"],["/archives/2020/index.html","a8901fb082367742d133dab904a69784"],["/archives/2021/01/index.html","e9d2afd1ec481a2365cddfba5c47a4c5"],["/archives/2021/07/index.html","3f60d77183838a1b0ab88cf73942c3cd"],["/archives/2021/08/index.html","d7efab6385cc95dbd2460d7663152d04"],["/archives/2021/09/index.html","8324364db3d71527714cfd3fee4e53a3"],["/archives/2021/10/index.html","a3c4fda4ff03237838e4570eb2c83402"],["/archives/2021/index.html","eacb8bcf1955cee42cb13911cc803f96"],["/archives/index.html","086c594a49ac78bf5e48dd355d828268"],["/categories/index.html","8b0f2bd5f42f5b1dd0079a39f7fb021a"],["/categories/一分钟教程/index.html","5ce15e92c6567384a5b611c93a7f6efc"],["/categories/基础/index.html","8291063c0be386e1addc69619941477f"],["/categories/夜晚/index.html","2e1ecf30ef1a6e9a9e5a5d1acc76d091"],["/categories/摇滚/index.html","3b851e62bfcc5dde41cbeb534626ee93"],["/categories/都是皮毛/index.html","2b271ec332db23b7b50e2e96bf9a4431"],["/css/style.css","7997f03c291d373b6b26512c02821191"],["/images/favicon.png","00d917ba332001e66c111fe6967e44a0"],["/images/image-error.jpg","1e8084c18fc1006cd056641d56e8a2a5"],["/images/wave-light.png","1f3d76a4cc121db5b023610470075f24"],["/index.html","636b46171a68c95c76c714f86628836b"],["/js/script.js","ddcb41552b529aa78b27cd6f4cab618a"],["/lib/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/lib/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/lib/DPlayer.min.css","de06eca94369a009bead8b78ce4c14c4"],["/lib/DPlayer.min.js","b4cdac968229e21259e0b5c0c02d1851"],["/lib/waterfall.min.js","017922b358f0e5cac87d067af9593ed3"],["/lib/zoom.min.js","ae9eb16ebcf167af58ba79e046988fab"],["/page/2/index.html","488f9ca37efdead92d6b76e191180e09"],["/page/3/index.html","c0f8923193674dfd9041b51015d4b63e"],["/page/4/index.html","6a41aba96a35ff7cffefc4fc84c4ff8d"],["/page/5/index.html","ab576b1fe6417844eccada3bc9538d2f"],["/sw-register.js","f7a1bf19677c6f0310bd6b6da3fdde0a"],["/tags/git/index.html","300fe5a4cddc0c02150928954a20e9a5"],["/tags/leetcode/index.html","9a2c1a4246b45e73c97555c45a8405c7"],["/tags/share/index.html","d88ddfa18941c543fa35a46af2c50966"],["/tags/一分钟教程/index.html","82ca6791e352d06b73303cdda10d15c0"],["/tags/杂谈/index.html","e0c65cff5a4e274fd16aacfdca8ed0dd"],["/tags/游戏/index.html","c12ab3c11d0635be40f89fe6ffb71dd8"],["/tags/算法/index.html","ce5fa8b25d034b7ff5d1b4a9f262a41e"],["/tags/算法/page/2/index.html","8d4ed7bf0fc00772c7ab280d04dd9485"],["/tags/都是皮毛/index.html","8ca7517582006aab44a30f1eb225ddeb"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
