(async () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('key');

  let db = {};

  try {
    const response = await fetch(`https://raw.githubusercontent.com/oshanavishkapiries/watchON/refs/heads/main/db/${key}.json`);
    db = await response.json();
  } catch (error) {
    console.error(error);
  }

  const sources = db.video.map((video) => ({
    file: video.url,
    label: video.label,
    type: video.type,
    res: video.res
  }));

  const subtitles = db.subtitle.map((subtitle, index) => ({
    file: subtitle.url,
    label: subtitle.label,
    type: subtitle.type,
    kind: "captions",
    default: index === 0,
    srclang: subtitle.srclang
  }));

  var jwp = jwplayer('player');
  jwp.setup({
    title: db.title,
    description: db.description,
    skin: {
      name: "netflix"
    },
    width: "100%",
    height: "100%",
    autostart: "false",
    displaytitle: "true",
    displaydescription: "true",
    key: "cLGMn8T20tGvW+0eXPhq4NNmLB57TrscPjd1IyJF84o=",
    sources: sources,
    tracks: subtitles,
    image: db.backdrop,
    abouttext: "WatchON",
    aboutlink: "https://github.com/oshanavishkapiries/watchON",
    abouttarget: "_blank",
    primary: "html5"
  });

})();




// (async () => {
//   const params = new URLSearchParams(window.location.search);
//   const key = params.get('key');

//   let db = {};

//   try {
//     const response = await fetch(`https://raw.githubusercontent.com/oshanavishkapiries/watchON/refs/heads/main/db/${key}.json`);
//     db = await response.json();
//   } catch (error) {
//     console.error(error);
//   }

//   const sources = db.video.map((video) => ({
//     file: video.url,
//     label: video.label,
//     type: video.type,
//     res: video.res
//   }));

//   const subtitles = db.subtitle.map((subtitle , index) => ({
//     file: subtitle.url,
//     label: subtitle.label,
//     kind: "captions",
//     default: index === 0,
//     srclang: subtitle.srclang
//   }));

//   const playerInstance = jwplayer("player").setup({
//     controls: true,
//     sharing: false,
//     displaytitle: true,
//     displaydescription: true,
//     abouttext: "",
//     aboutlink: "",
//     skin: { name: "netflix" },
//     logo: { file: "", link: "" },
//     captions: {
//       color: "#FFF",
//       fontSize: 14,
//       backgroundOpacity: 0,
//       edgeStyle: "raised"
//     },
//     playlist: [
//       {
//         title: db.name,
//         description: db.description,
//         image: db.backdrop,
//         sources: sources,
//         captions: subtitles,
//         tracks: []
//       }
//     ],
//     advertising: { client: "vast", schedule: [] }
//   });

//   // playerInstance.on("ready", function () {
//   //   const buttonId = "download-video-button";
//   //   const iconPath =
//   //     "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTMgMTloMTh2Mkgzdi0yem0xMC01LjgyOEwxOS4wNzEgNy4xbDEuNDE0IDEuNDE0TDEyIDE3IDMuNTE1IDguNTE1IDQuOTI5IDcuMSAxMSAxMy4xN1YyaDJ2MTEuMTcyeiIgZmlsbD0icmdiYSgyNDcsMjQ3LDI0NywxKSIvPjwvc3ZnPg==";
//   //   const tooltipText = "Download Video";

//   //   playerInstance.addButton(iconPath, tooltipText, buttonClickAction, buttonId);

//   //   function buttonClickAction() {
//   //     const playlistItem = playerInstance.getPlaylistItem();
//   //     const anchor = document.createElement("a");
//   //     anchor.setAttribute("href", playlistItem.file);
//   //     anchor.setAttribute("download", playlistItem.file.split("/").pop());
//   //     anchor.style.display = "none";
//   //     document.body.appendChild(anchor);
//   //     anchor.click();
//   //     document.body.removeChild(anchor);
//   //   }

//   //   const playerContainer = playerInstance.getContainer();
//   //   const buttonContainer = playerContainer.querySelector(".jw-button-container");
//   //   const spacer = buttonContainer.querySelector(".jw-spacer");
//   //   const timeSlider = playerContainer.querySelector(".jw-slider-time");
//   //   buttonContainer.replaceChild(timeSlider, spacer);

//   //   playerInstance.on("adBlock", () => {
//   //     const modal = document.querySelector("div.modal");
//   //     modal.style.display = "flex";
//   //     document.getElementById("close").addEventListener("click", () => location.reload());
//   //   });

//   //   const rewindContainer = playerContainer.querySelector(".jw-display-icon-rewind");
//   //   const forwardContainer = rewindContainer.cloneNode(true);
//   //   const forwardDisplayButton = forwardContainer.querySelector(".jw-icon-rewind");
//   //   forwardDisplayButton.style.transform = "scaleX(-1)";
//   //   forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
//   //   const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
//   //   nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);

//   //   playerContainer.querySelector(".jw-display-icon-next").style.display = "none";
//   //   const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
//   //   const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
//   //   forwardControlBarButton.style.transform = "scaleX(-1)";
//   //   forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
//   //   rewindControlBarButton.parentNode.insertBefore(
//   //     forwardControlBarButton,
//   //     rewindControlBarButton.nextElementSibling
//   //   );

//   //   [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
//   //     button.onclick = () => {
//   //       playerInstance.seek(playerInstance.getPosition() + 10);
//   //     };
//   //   });
//   // });
// })();