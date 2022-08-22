function UnityProgress(gameInstance, progress) {
    if (!gameInstance.Module)
        return;

    if (!gameInstance.loadingBox) {
        gameInstance.loadingBox = document.createElement('div');
        gameInstance.loadingBox.id = "loadingBox";
        gameInstance.container.appendChild(gameInstance.loadingBox);
    }

    if (!gameInstance.logo) {
        gameInstance.logo = document.createElement("div");
        gameInstance.logo.id = "logo";
        gameInstance.loadingBox.appendChild(gameInstance.logo);
    }

    if (!gameInstance.logoInner) {
        gameInstance.logoInner = document.createElement("div");
        gameInstance.logoInner.id = "logoInner";
        gameInstance.logo.appendChild(gameInstance.logoInner);
    }

    if (!gameInstance.bgBar) {
        gameInstance.bgBar = document.createElement("div");
        gameInstance.bgBar.id = "bgBar";
        gameInstance.loadingBox.appendChild(gameInstance.bgBar);
    }

    if (!gameInstance.progressBar) {
        gameInstance.progressBar = document.createElement("div");
        gameInstance.progressBar.id = "progressBar";
        gameInstance.bgBar.appendChild(gameInstance.progressBar);
    }

    if (!gameInstance.loadingInfo) {
        gameInstance.loadingInfo = document.createElement("p");
        gameInstance.loadingInfo.id = "loadingInfo";
        gameInstance.loadingInfo.textContent = "Downloading...";
        gameInstance.bgBar.appendChild(gameInstance.loadingInfo);
    }

    if (!gameInstance.spinner) {
        gameInstance.spinner = document.createElement("img");
        gameInstance.spinner.id = "spinner";
        gameInstance.spinner.src = 'TemplateData/spinner.gif';
        gameInstance.spinner.style = "display: none; margin: 0px auto";
        gameInstance.spinner.style.width = "100px";
        gameInstance.spinner.style.height = "100px";
        gameInstance.loadingBox.appendChild(gameInstance.spinner);
    }

    var length = Math.min(progress, 1) * 100;
    gameInstance.progressBar.style.width = length + "%";
    gameInstance.loadingInfo.textContent = "Downloading... " + Math.round(progress * 100) + "%";
    // if (progress == 1) {
    //   gameInstance.loadingBox.style.display = "none";
    // }

    if (progress >= 0.9) {
        progress = 1;
        gameInstance.progressBar.style.width = "100%";
        gameInstance.loadingInfo.textContent = "Download complete";

        document.getElementById("spinner").style.display = "inherit";
    }
}