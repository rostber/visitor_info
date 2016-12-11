var http = require('http');
var https = require('https');

module.exports.picasaweb = {
  getVisitorsInfo: function(emails, callback) {
    var self = this;
    var visitorsInfo = {};
    var i = 0;
    var check = function() {
      if (i >= emails.length - 1) callback(visitorsInfo);
      else i++;
    }
    emails.map(function(email) {
      var url = self.url(email);
      self.request(url)
        .then(function(visitorInfo) {
          visitorsInfo[email] = {
            statusCode: 200,
            visitorInfo: visitorInfo
          };
          check();
        })
        .catch(function(res) {
          visitorsInfo[email] = {
            statusCode: res.statusCode,
            visitorInfo: null
          };
          check();
        });
    });
  },
  request: function(url) {
    var self = this;
    return new Promise(function(resolve, reject) {
      http.get(url, function(res) {
        if (res.statusCode != 200) return reject(res);
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function(d){
          var response = JSON.parse(body);
          var visitorInfo = self.convertData(response);
          return self.checkAvatar(resolve, visitorInfo);
        });
      }).on('error', function(res) {
        return reject(res);
      });
    });
  },
  // загружаем аватар, проверяем доступность адреса, проверяем, что это не картинка-заглушка
  checkAvatar: function(resolve, visitorInfo) {
    https.get(visitorInfo.avatar, function(res) {
      // если ссылка не работает, то удалить аватар
      if (res.statusCode != 200) {
        delete visitorInfo.avatar;
        return resolve(visitorInfo);
      }
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function(d) {
        if (body.length == 903) delete visitorInfo.avatar;
        return resolve(visitorInfo);
      });
    }).on('error', function(res) {
      return resolve(visitorInfo);
    });
  },
  url: function(email) {
    return "http://picasaweb.google.com/data/entry/api/user/"+encodeURI(email)+"?alt=json";
  },
  convertData: function(response) {
    visitorInfo = {};
    var info = response.entry;
    if (typeof info['gphoto$nickname']['$t'] != '') visitorInfo.first_name = info['gphoto$nickname']['$t'];
    if (typeof info['gphoto$thumbnail']['$t'] != '') visitorInfo.avatar = info['gphoto$thumbnail']['$t'];
    return visitorInfo;
  }
};
