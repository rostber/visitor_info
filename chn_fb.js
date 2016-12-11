var FB = require('fb');
// https://graph.facebook.com/search?q=svb-tver@mail.ru&type=user
var appId = '344076839280078';
var appSecret = '0b9054a746aeefb9dcf123ce0446ce31';
var accessToken = '344076839280078|THpaF5yZrmgewIyIMRI5JkfE3W0';

module.exports.fb = {
  getVisitorsInfo: function(emails, callback) {
    this.setToken();

FB.api('/search', { q: 'svb-tver@mail.ru', type: 'user' }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log(res.id);
  console.log(res.name);
});


/*    this.getToken()
      .then(function(accessToken) {
        console.log('access', accessToken);
      })
      .catch(function(res) {
        console.log('error', res);
      });*/

return ;


    var self = this;
    var visitorsInfo = {};
    var i = 0;
    var check = function() {
      if (i >= emails.length - 1) callback(visitorsInfo);
      else i++;
    }
    emails.map(function(email) {
      self.request(email)
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
  setToken: function() {
    FB.setAccessToken(accessToken);
  },
  getToken: function() {
    return new Promise(function(resolve, reject) {
      FB.api('oauth/access_token', {
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'client_credentials'
      }, function (res) {
        if (!res || res.error) {
          return reject(res.error);
        }
        var accessToken = res.access_token;
        return resolve(accessToken);
      });
    });
  },
  request: function(email) {
    self = this;
    return new Promise(function(resolve, reject)
    {
      return self.resolve(email);
      return reject(res);
    });
  },
}