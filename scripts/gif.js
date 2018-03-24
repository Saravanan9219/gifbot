function getGifUrl(name){
  let url = 'https://api.gfycat.com/v1test/gfycats/search?search_text=' + name + '&cou=5';
  return url;
}

function randomChoice(choices){
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

module.exports = function(robot){
  robot.hear(/gif (.*)/i, (resp) => {
    let gifName = escape(resp.match[1]);
    let urlName = getGifUrl(gifName);
    robot.http(urlName).get()((err, res, body) => {
      let gifs = [];
      for(let gif of JSON.parse(body).gfycats){
        gifs.push(gif.max2mbGif);
      }
      resp.send(randomChoice(gifs));
    });
  });
};

