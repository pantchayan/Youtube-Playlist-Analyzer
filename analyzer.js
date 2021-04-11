let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos
// views
// watch time -> get
// list of videos -> [name, duration]
// initial page data get
// handle -> loader

console.log("Before");
// let arr=document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let playlistArr=[]
// playlistArr.push(arr[0].innerText,arr[1].innerText)

// let watchTimeArr = document.querySelectorAll(".style-scope ytd-thumbnail-overlay-time-status-renderer");
// let videosNameArr = document.querySelectorAll("#video-title");

(async function () {
  try {
    let browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    let newPage = await browserInstance.newPage();
    await newPage.goto(
      "https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph"
    );

    // evaluate
    let playlistSelector =
      "#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer";
    let watchtimeSelector =
      ".style-scope ytd-thumbnail-overlay-time-status-renderer";
    let nameSelector = "#video-title";

    await newPage.waitForSelector(playlistSelector);
    await newPage.waitForSelector(watchtimeSelector);
    await newPage.waitForSelector(nameSelector);

    let videosList = await newPage.evaluate(getStats, watchtimeSelector, nameSelector);
    let playlistArr = await newPage.evaluate(consoleFn, playlistSelector);
    console.table(playlistArr[0]);
    console.table(playlistArr[1]);
    console.table(videosList);

  } catch (err) {
    console.log(err);
  }
})();

let getStats = ( watchtimeSelector, nameSelector) => {
      
    let watchTimeArr = document.querySelectorAll(watchtimeSelector);
    let videosNameArr = document.querySelectorAll(nameSelector);

    let videosList = [];
    for(let i=0;i<watchTimeArr.length;i++){
      let watchTime = watchTimeArr[i].innerText;
      let videoName = videosNameArr[i].innerText;

      videosList.push({
          videoName, watchTime
      })
    }
    return videosList;
  };

  let consoleFn = (playlistSelector) =>{ 
      let arr = document.querySelectorAll(playlistSelector);
      let playlistArr = [];
      playlistArr.push(arr[0].innerText, arr[1].innerText);
      return playlistArr;
  }
