var express = require('express');
var router = express.Router();
var axios = require('axios');
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { id: '123' });
});


function showDesc(id){
    return axios.get(`https://sample-api-78c77.firebaseio.com/tv-shows/SHOW${id}.json`);
}

function getEpisodes(id){
    return axios.get(`https://sample-api-78c77.firebaseio.com/episodes/SHOW${id}.json`);
}

router.get('/getshow', function(req, res) {

  var id = req.query.id;

  axios.all([showDesc(id), getEpisodes(id)])
  .then(axios.spread(function (acct, perms) {

    var data = [];
    data.push(acct.data, perms.data);

    res.json( JSON.stringify(data) );
  }));

});

module.exports = router;
