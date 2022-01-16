
const vscode = require("vscode");

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('phoneview.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'phoneview',
        'Phone View',
        vscode.ViewColumn.One,
        { enableScripts: true },
      )

      let iteration = 0
      const updateWebview = () => {
        panel.title = 'Phone View'
        panel.webview.html = getWebviewContent()
      }

      // Set initial content
      updateWebview()
    }),
  )
}

function getWebviewContent() {
  return `
  <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      /* The device with borders */
      .smartphone {
        position: relative;
        width: 360px;
        height: 640px;
        margin: auto;
        border: 16px black solid;
        border-top-width: 60px;
        border-bottom-width: 60px;
        border-radius: 36px;
      }

      /* The horizontal line on the top of the device */
      .smartphone:before {
        content: '';
        display: block;
        width: 60px;
        height: 5px;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #333;
        border-radius: 10px;
      }

      /* The circle on the bottom of the device */
      .smartphone:after {
        content: '';
        display: block;
        width: 35px;
        height: 35px;
        position: absolute;
        left: 50%;
        bottom: -65px;
        transform: translate(-50%, -50%);
        background: #333;
        border-radius: 50%;
      }

      /* The screen (or content) of the device */
      .smartphone .content {
        width: 360px;
        height: 640px;
        background: white;
      }
    </style>
  </head>
  <body>
    <center>
      <input
        type="text"
        style="padding: 7px; margin: 7px; width: 270px;"
        id="url"
        placeholder="Paste url here..."
      />

      <script>
        function set() {

          document.getElementById('webview').src = document.getElementById(
            'url',
          ).value

          screenset(document.getElementById('width').value,document.getElementById('height').value)
        }

        function screenset(width, height) {
          document.getElementsByClassName('smartphone')[0].style.width =
            width + 'px'
          document.getElementById('width').value = width
          document.getElementById('height').value = height
          document.getElementsByClassName('content')[0].style.width =
            width + 'px'

          document.getElementsByClassName('content')[0].style.height =
            height + 'px'

          document.getElementsByClassName('smartphone')[0].style.height =
            height + 'px'
        }

        function reset() {
          document.getElementById('screensize').value = "0"
          screenset(360,640)
        }

        function changeScreenSize() {
          var x = document.getElementById('screensize').value
          switch (x) {
            case '0':
              screenset(360, 640)
              break
            case '1':
              screenset(411, 731)
              break
            case '2':
              screenset(411, 823)
              break
            case '3':
              screenset(320,568)
              break
            case '4':
              screenset(375, 667)
              break
            case '5':
              screenset(414,736)
              break
            case '6':
              screenset(375,812)
              break
            case '7':
              screenset(280,653)
              break
            case '8':
              screenset(540,720)
              break
          }
        }
      </script>

      <select
        id="screensize"
        name="screensize"
        style="padding: 7px; margin: 7px;"
        onchange="changeScreenSize()"
      >
        <option value="0">Moto G4/Galaxy S5</option>
        <option value="1">Pixel 2</option>
        <option value="2">Pixel 2 XL</option>
        <option value="3">Iphone 5/SE</option>
        <option value="4">Iphone 6/7/8</option>
        <option value="5">Iphone 6/7/8 +</option>
        <option value="6">Iphone X</option>
        <option value="7">Galaxy Fold</option>
        <option value="8">Surface Duo</option>
      </select>
      <br />
      <input
        type="text"
        style="padding: 7px; margin: 7px; width: 50px;"
        id="width"
        value="360"
        placeholder="width"
      />

      <input
        type="text"
        style="padding: 7px; margin: 7px; width: 50px;"
        id="height"
        value="640"
        placeholder="height"
      />

      <button
        style="
          padding: 7px;
          margin: 7px;
          background-color: green;
          color: white;
        "
        onclick="set()"
      >
        Set
      </button>

      <button
        style="padding: 7px; margin: 7px; background-color: red; color: white;"
        onclick="reset()"
      >
        Reset
      </button>

      <div class="smartphone">
        <div class="content">
          <iframe
            src="https://www.example.com"
            id="webview"
            style="width: 100%; border: none; height: 100%;"
          />
        </div>
      </div>
    </center>
  </body>
</html>

  
  `
}


module.exports = {
	activate
}
