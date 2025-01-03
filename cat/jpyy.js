rule = {
  headers: {
    Referer: 'https://www.cfkj86.com/',
  },
  proxyHeader: {'Referer': 'https://www.cfkj86.com/'},
  host: 'https://www.cfkj86.com',
  class_name: '电影&电视剧&综艺&动漫',
  class_url: '1&2&3&4',
  //homeVod: '.card-box div a;.title&&Text;&&href;img&&src;.bottom div:eq(0)&&Text',
  homeVodJS: `
    let t = Math.floor(new Date().getTime()).toString();
    let url = HOST + '/api/mw-movie/anonymous/home/hotSearch';
    let sign = sha1(md5('key=cb808529bae6b6be45ecfab29a4889bc&t=' + t));
    let headers = {
      'User-Agent': PC_UA,
      Referer: HOST,
      Sign: sign,
      T: t,
      Deviceid: '7462eef7-eeda-4727-8064-543a0a2f1503',
    };
    request(url, '', headers);|||
    let json = [];
    if(typeof(html) === 'string') json = JSON.parse(html).data;
    else json = html.data;
    json.forEach(function(item){
      videos.push({
        vod_id: item.vodId,
        vod_name: item.vodName,
        vod_pic: item.vodPic + '?x-image-process=image/resize,w_356,h_498/quality,q_65/format,webp',
        vod_remarks: item.vodVersion + ' ' + item.vodRemarks,
        vod_year: item.vodYear || item.vodDoubanScore,
      });
    });
  `,
  url: '/vod/show/id/fyclass/page/fypage',
  //categoryVod: '.movie-ul > div > a;.title&&Text;&&href;img&&src;.bottom div:eq(0)&&Text',
  categoryVodJS: `
    let $ = load(html);
    let data = $('script:contains(videoList)').text().split(',null,')[1].split(']\\\\n')[0].replace(/\\\\\\\\\\\\\"/g, '').replace(/\\\\/g, '');
    let json = JSON.parse(data);
    pagecount = json.videoList.data.totalPage;
    json.videoList.data.list.forEach(function(item){
      videos.push({
        vod_id: item.vodId,
        vod_name: item.vodName,
        vod_pic: item.vodPic + '?x-image-process=image/resize,w_356,h_498/quality,q_65/format,webp',
        vod_remarks: item.vodVersion + ' ' + item.vodRemarks,
        vod_year: item.vodYear || item.vodDoubanScore,
      });
    });
  `,
  detailUrl: '/detail/fyid',
  detailVod: {
    content: '.wrapper_more_text&&Text',
    director: '.director:eq(0) a&&Text',
    actor: '.director:eq(1) a&&Text',
    playFrom: '.player_name&&Text',
    playUrl: "div[type];a;&&Text;&&href"
  },// /vod/play/103842/sid/1
  lazy:`
    let vid = input.split('/')[3];
    let sid = input.split('/')[5];
    let t = Math.floor(new Date().getTime()).toString();
    let url = HOST + '/api/mw-movie/anonymous/v1/video/episode/url?id='+vid+'&nid='+sid;
    let signStr = 'id='+vid+'&nid='+sid+'&key=cb808529bae6b6be45ecfab29a4889bc&t=' + t;
    let sign = sha1(md5(signStr));
    let headers = {
      'User-Agent': PC_UA,
      Referer: HOST,
      Sign: sign,
      T: t,
      Deviceid: '7462eef7-eeda-4727-8064-543a0a2f1503',
    };
    request(url, '', headers);|||
    if (typeof(html) === 'Object') playUrl = html.data.playUrl;
    else if(typeof(html) === 'string') playUrl = JSON.parse(html).data.playUrl;
  `,
  searchUrl: '/api/mw-movie/anonymous/video/searchByWord?keyword=**&pageNum=1&pageSize=12',
  searchVodJS: `
    videos = [];
    let t = Math.floor(new Date().getTime()).toString();
    let signStr = searchUrl.split('?')[1] + '&key=cb808529bae6b6be45ecfab29a4889bc&t=' + t;
    let sign = sha1(md5(signStr));
    let headers = {
      'User-Agent': PC_UA,
      Referer: HOST,
      Sign: sign,
      T: t,
      Deviceid: '7462eef7-eeda-4727-8064-543a0a2f1503',
    };
    request(searchUrl, '', headers);|||
    let json = [];
    if (typeof(html) === 'string') json = JSON.parse(html).data.result.list;
    else json = html.data.result.list;
    json.forEach(function(item){
      videos.push({
        vod_id: item.vodId,
        vod_name: item.vodName,
        vod_pic: item.vodPic + '?x-image-process=image/resize,w_356,h_498/quality,q_65/format,webp',
        vod_remarks: item.vodVersion + ' ' + item.vodRemarks,
        vod_year: item.vodYear || item.vodDoubanScore,
      });
    });
  `,
}
