var FB = require('fb');
var config = global.config.fb;

// https://graph.facebook.com/search?q=svb-tver@mail.ru&type=user

module.exports.fb = {
  getVisitorsInfo: function(emails, callback) {
    

    // TODO develop process

    //console.log( this.getToken() );

    this.setToken();

    FB.api('/search', { q: 'svb-tver@mail.ru', type: 'user', fields:'id,name,first_name,last_name,gender,picture,relationship_status,location' }, function (res) {
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

    return false;


    var self = this;
    var visitorsInfo = {};
    var i = 0;
    var check = function() {
      if (i >= emails.length - 1) callback(visitorsInfo);
      else i++;
    };
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
    FB.setAccessToken(config.accessToken);
  },
  getToken: function() {
    FB.options({scope: "public_profile, email, read_insights, user_birthday, user_religion_politics, user_relationships, user_relationship_details, user_hometown, user_location, user_website, user_photos, user_about_me, user_status"});
    return new Promise(function(resolve, reject) {
      FB.api('oauth/access_token', {
        client_id: config.appId,
        client_secret: config.appSecret,
        grant_type: 'client_credentials'
      }, function (res) {
        if (!res || res.error) {
          return reject(res.error);
        }
        var accessToken = res.access_token;
        console.log('accessToken: ', accessToken);
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