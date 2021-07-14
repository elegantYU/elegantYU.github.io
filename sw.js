/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2019/04/18/learn_hexo/index.html","857b00cad09f2828b915362239d1fe96"],["/2019/08/07/GFW/index.html","1ee048d2a908a2a0984b17180588d76c"],["/2019/09/02/h5upup/index.html","92428cc9f32947eb528e88a93e022664"],["/2019/09/19/agreeable/index.html","7f86364a1ff90f9cafe055aba60556d4"],["/2019/10/21/cssisgood/index.html","a85e15a9dc71e4d08acd4da43ea60dbd"],["/2019/12/08/lyric-ms/index.html","2a9da54e38e1bd9d682d9da64c7e9f60"],["/2019/12/28/optional-chaining/index.html","e01edab2716f29fe86375d0d11a0ee8c"],["/2020/01/04/back-to-reality/index.html","8b210b5db1514151c22ac4ef10a40070"],["/2020/04/06/es6-map/index.html","53fdfcf579d44645c49de6c11cb28d3c"],["/2020/05/11/git-commit-am/index.html","ce7999b589ffad28b8a538faaee943a1"],["/2020/06/07/webpack+react/index.html","2f5551c86d30bfb88df5c344e693c750"],["/2020/06/13/wallpagerShare2006/index.html","bf3cf10f4712939fb50797673b6a5278"],["/2020/11/04/add-two-numbers/index.html","5ab4e71145ed555c15b1b9e6a00ea089"],["/2020/11/09/longest-palindromic-substring/index.html","28c962cacdbf0f11eaa16a30d24eae76"],["/2020/12/31/CyberPunk2077/index.html","2a495b0e84a466a4fa4c3219ffa2d169"],["/2021/01/07/interview-2020/index.html","9d530174dd3bdd2967272a9e89632cc2"],["/2021/07/12/algorithm-sumthreenum/index.html","a9d635e4c521401e202237d86e5f0547"],["/2021/07/13/algorithm-covertz/index.html","d768bf5dbc5cb1e3ee51237dc7cf168d"],["/2021/07/14/algorithm-reomveNodeFromEnd/index.html","0cda7f0db65d0f676a734c8679386e24"],["/about/index.html","f63f8154bc8b22d81b3258747d1089f3"],["/archives/2019/04/index.html","a0e3966762d0d5157d3bcf6912ccdb96"],["/archives/2019/08/index.html","23c6cc279414f960c7d0b31d5f2d60c4"],["/archives/2019/09/index.html","0ab0b0e1fdc8f79fecde35e511a871da"],["/archives/2019/10/index.html","3b83d3f516ac670780c293250428da65"],["/archives/2019/12/index.html","c9c8481721ed08025830f72846e030bf"],["/archives/2019/index.html","7b84fd2b99d1c6dc492eb7d1634e411d"],["/archives/2020/01/index.html","ce8194d179d4181b7e50be2cb575f981"],["/archives/2020/04/index.html","8a7b35d1baae0f89b140bf610a40ce44"],["/archives/2020/05/index.html","ee91ef027c3a74dd9ab5af844d5c4f2b"],["/archives/2020/06/index.html","f70efecf29682f9ed08e1b3615b801f8"],["/archives/2020/11/index.html","c7e8dfbf13d6a010b9ab41936d73409a"],["/archives/2020/12/index.html","fc983fb6953f553d44271c7556444fbf"],["/archives/2020/index.html","51ba140534139d552c3bdecaeb9d794b"],["/archives/2021/01/index.html","1545cd54aa0ce1721c50116eb1e533ec"],["/archives/2021/07/index.html","15b0f9eec5da10367a92bf71b89a7037"],["/archives/2021/index.html","13e4ba46932550edae6e8af64a8ac180"],["/archives/index.html","703bdde4fadd8a04c3f22b23cfc22ea9"],["/categories/index.html","b1217784aea0198c6f82172fad4fef87"],["/categories/一分钟教程/index.html","f1f6aba99e90d104ec4fa68fbf93327c"],["/categories/基础/index.html","2235795d235afd68335ea2a0d3f43ced"],["/categories/夜晚/index.html","a992124f013d9f4ec017e0f1196dac9e"],["/categories/摇滚/index.html","767aac75a2da7d90a16c4d4900b8e776"],["/categories/都是皮毛/index.html","b28914a085d21125714e453c3ee2786e"],["/css/style.css","7997f03c291d373b6b26512c02821191"],["/images/favicon.png","00d917ba332001e66c111fe6967e44a0"],["/images/image-error.jpg","1e8084c18fc1006cd056641d56e8a2a5"],["/images/wave-light.png","1f3d76a4cc121db5b023610470075f24"],["/index.html","a0e8167df3c2b6e2dcb3dbca08a2703d"],["/js/script.js","ddcb41552b529aa78b27cd6f4cab618a"],["/lib/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/lib/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/lib/DPlayer.min.css","de06eca94369a009bead8b78ce4c14c4"],["/lib/DPlayer.min.js","b4cdac968229e21259e0b5c0c02d1851"],["/lib/waterfall.min.js","017922b358f0e5cac87d067af9593ed3"],["/lib/zoom.min.js","ae9eb16ebcf167af58ba79e046988fab"],["/page/2/index.html","568608ead46d205476f9c84fbc979ac3"],["/page/3/index.html","f145cb43e5b2afc7f6b0cb2cc7301c1a"],["/page/4/index.html","2511bddc3065ce1b34a22b47a1bdf096"],["/sw-register.js","a3131f2cbf228275e2a55aecfa9e1a0b"],["/tags/git/index.html","6fe056ca7d450ee20e5356819674dbd7"],["/tags/leetcode/index.html","f1c4194eb5aa0425dbfbd33ccbf9a3e4"],["/tags/share/index.html","07d9eb3c3f7427cc9d2b39f739238d05"],["/tags/一分钟教程/index.html","9288beeaa1acaf39ebc9fa353e7e47f5"],["/tags/游戏/index.html","86bbe0c0169d9fb711eae5daae0d9963"],["/tags/算法/index.html","62d2ce16a57fdd7a5f72f1b8d9af67c8"],["/tags/都是皮毛/index.html","3532313f0b604ab9a1fcfc5f202cbbc7"]];
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
