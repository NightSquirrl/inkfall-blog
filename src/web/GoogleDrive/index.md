---
title: 05. Google Drive 使用快速入门
icon: devicon:google
tag:
  - Google Drive
  - 前端
---

# Google Drive

## 目录

*   [开始的五个步骤](#开始的五个步骤)

[通过API调用](#通过api调用)

[初始化](#初始化)\
[删除网盘文件](#删除网盘文件)\
[文件上传](#文件上传)\
[文件下载](#文件下载)

[使用库图形化界面操作](#使用库图形化界面操作)

[React-google-drive-picker](#react-google-drive-picker)

[依赖安装](#依赖安装)\
[配置案例](#配置案例)\
[其他参数](#其他参数)\
[后续工作](#后续工作)

## 开始的五个步骤

1. 为您的 Google Workspace 应用、扩展程序或集成[创建一个 Google Cloud 项目。](https://developers.google.com/workspace/guides/create-project "创建一个 Google Cloud 项目。")

    1. 打开[谷歌云控制台](https://console.cloud.google.com/ "谷歌云控制台")。

    2. 点击左上角的菜单menu > IAM 和管理员 > 创建项目 。

    3. 在**项目名称**字段中，输入项目的描述性名称。

       可选：要编辑**项目 ID ，请单击**编辑 。项目ID在项目创建后无法更改，因此请选择在项目生命周期内满足您需求的ID。

    4. 在**位置**字段中，单击**浏览**以显示项目的潜在位置。然后，单击选择 。

2. [启用要](https://developers.google.com/workspace/guides/enable-apis "启用要") 在 Google Cloud 项目中使用的 API。

    1.  打开[谷歌云控制台](https://console.cloud.google.com/ "谷歌云控制台")。

    2.  点击左上角的菜单menu > API 和服务 > 库 。

    3.  在搜索字段中，输入要启用的 API 的名称，然后按Enter 。「google drive」

    4.  在搜索结果列表中，单击要启用的 API。

    5.  单击启用 。

    6.  要启用更多 API，请重复步骤 2-5。

3. [了解](https://developers.google.com/workspace/guides/auth-overview "了解") 在为 Google Workspace 进行开发时身份验证和授权的工作原理。

4. [ *配置 OAuth 同意* ](https://developers.google.com/workspace/guides/configure-oauth-consent "配置 OAuth 同意") *以确保用户可以了解和批准您的应用对其数据的访问权限。*&#x20;

    1. 打开 [谷歌云控制台](https://console.cloud.google.com/ "谷歌云控制台")。

    2. 点击左上角的菜单menu > API 和服务 > OAuth 同意屏幕 。

    3. 选择外部，点击**创建**

    4. 填写应用注册表单，然后点击保存并继续 *。*

       应用说明

       应用名称：即呈现在同意屏幕的名称

       ![image](https://cdn.jsdelivr.net/gh/NightSquirrl/picX@master/image.4sqidld0aie0.webp "image")

       用户支持的电子邮件：用户与你联系的电子邮件

       徽标：显示在同意屏幕的logo

       应用网域 -可选参数

       应用首页→要使用Api服务的首页

       应用隐私权政策链接

       应用服务条款链接

       已授权的网域

       添加已获授权的网域后，您可以使用其任意子网域或页面。

       开发者联系信息-必填选项

    5. 如果您要创建在 Google Workspace 组织之外使用的应用，请点击**添加或删除范围 。添加并验证您的应用所需的授权范围，然后单击**Save and Continue 。

       注意：某些范围需要 Google 进行额外审核。对于仅供您的 Google Workspace 组织内部使用的应用，范围不会列在同意屏幕上，并且使用受限或敏感范围不需要 Google 进一步审核。有关更多详细信息，请参阅 下面[的如何为您的应用选择范围](https://developers.google.com/workspace/guides/configure-oauth-consent#choose-scopes "的如何为您的应用选择范围")。

    6. 在“测试用户”下，点击**添加用户 。输入您的电子邮件地址和任何其他授权测试用户，然后单击**保存并继续 。

       > 当发布状态设置为“测试”时，仅测试用户可以访问应用。在应用验证之前，允许的用户数上限为 100，并且会计入应用的整个生命周期。

    7. 查看您的应用注册摘要。单击**编辑**进行更改，或单击返回仪表板 。

5. [创建访问凭据](https://developers.google.com/workspace/guides/create-credentials "创建访问凭据")以验证您应用的最终用户或服务帐户。

   所需的凭据取决于应用程序的数据类型、平台和访问方法。以下是可用的凭据类型：

[ *API 密钥* ](https://developers.google.com/workspace/guides/create-credentials#api-key "API 密钥")– 使用此凭据在您的应用程序中匿名访问公开可用的数据。

[ *OAuth 客户端 ID* ](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id "OAuth 客户端 ID") – 使用此凭据作为最终用户进行身份验证并访问他们的数据。要求您的应用请求并获得用户的同意。

    创建 API 密钥：* *
    
    1.  打开[谷歌云控制台](https://console.cloud.google.com/ "谷歌云控制台")。
    
    2.  点击左上角的菜单menu >** API 和服务** >** 凭证* *。
    
    3.  单击**创建凭据** >** API 密钥* *。
    
    4.  将显示您的新 API 密钥。*        

点击复制content\_copy 复制您的 API 密钥以在您的应用程序代码中使用。API 密钥也可以在项目凭证的“API 密钥”部分中找到。

        *   单击**限制密钥**以更新高级设置并限制 API 密钥的使用。可以给密钥授权，比如只允许google drive api使用该秘钥。**
    
    OAuth 客户端 ID 凭据**
    
    1.  打开[谷歌云控制台](https://console.cloud.google.com/ "谷歌云控制台")。
    
    2.  点击左上角的菜单menu >** API 和服务** >** 凭证* *。
    
    3.  单击**创建凭据** >** OAuth 客户端 ID* *。
    
    4.  单击**应用程序类型** >** Web 应用程序* *。
    
    5.  在“名称”字段中，输入凭证的名称。此名称仅显示在 Google Cloud 控制台中。
    
    6.  添加与您的应用相关的授权 URI：***        

客户端应用程序 (JavaScript) – 在 Authorized JavaScript origins 下，单击Add URI 。然后，输入用于浏览器请求的 URI。这标识了您的应用程序可以将 API 请求发送到 OAuth 2.0 服务器的域。

        > 必须添加，表明那些网站可以使用你的OAuth客户端ID，如果不填写对应的URL，则就会显示无权限。***        

服务器端应用程序（Java、Python、.NET 等） – 在“授权的重定向 URI”下，单击添加 URI 。然后，输入 OAuth 2.0 服务器可以向其发送响应的端点 URI。

        > 当用户授权完毕之后将会跳转至哪个页面。
    
    7.  单击**创建* *。出现 OAuth 客户端创建屏幕，显示您的新客户端 ID 和客户端密码。
    
    8.  记下客户端 ID。客户端机密不用于 Web 应用程序。
    
    9.  单击**确定* *。新创建的凭据显示在“OAuth 2.0 客户端 ID”下。

## 通过API调用

### 初始化

```javascript
    <script type="text/javascript">
     // TODO(developer): Set to client ID and API key from the Developer Console
     const CLIENT_ID = '715665857361-pfugekver5uc7dl3pu10v676ktis7jro.apps.
     googleusercontent.com';
     const API_KEY = 'AIzaSyAkt5M4CAeME_Bq4VWvQW8RStUYN2Q9U2U';
     // Discovery doc URL for APIs used by the quickstart
     const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
     // Authorization scopes required by the API; multiple scopes can be
     // included, separated by spaces.
     const SCOPES = 'https://www.googleapis.com/auth/drive 
     https://www.googleapis.com/auth/drive.appdata 
     https://www.googleapis.com/auth/drive.file';

      let tokenClient;
      let gapiInited = false;
      let gisInited = false;
      //控制登录和退出按钮
      document.getElementById('authorize_button').style.visibility = 'hidden';
      document.getElementById('signout_button').style.visibility = 'hidden';
        
        /***         
 当api.js加载完之后调用*         
/
        function gapiLoaded() {
            gapi.load('client', intializeGapiClient);
        }

        /***         
 初始化api*         
/
        async function intializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        /***         
 身份认证之后调用*         
/
        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        /***         
 当认证完成之后显示按钮*         
 根据密钥和客户端id控制按钮*         
/
        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                document.getElementById('authorize_button').style.visibility = 'visible';
            }
        }

        /**
         *  当用户登陆之后显示出退出按钮*         
/
        function handleAuthClick() {
            tokenClient.callback = async (resp) => {
                console.log(resp);
                if (resp.error !== undefined) {
                    throw (resp);
                }
                document.getElementById('signout_button').style.visibility = 'visible';
                document.getElementById('authorize_button').innerText = 'Refresh';
                await listFiles();
            };

            if (gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({ prompt: '' });
            }
        }

        /***         
  用户退出之后*         
/
        function handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                document.getElementById('content').innerText = '';
                document.getElementById('authorize_button').innerText = 'Authorize';
                document.getElementById('signout_button').style.visibility = 'hidden';
            }
        }

        /**
         * 将drive中前十个文件渲染到页面*         
/
        async function listFiles() {
            let response;
            try {
              response = await gapi.client.drive.files.list({
                'pageSize': 10,
                'fields': 'files(id, name)',
              });
            } catch (err) {
              document.getElementById('content').innerText = err.message;
              return;
            }
            const files = response.result.files;
            if (!files || files.length == 0) {
              document.getElementById('content').innerText = 'No files found.';
              return;
            }
            // Flatten to string to display
            const output = files.reduce(
                (str, file) => `${str}${file.name} (${file.id}\n`,
                'Files:\n');
            document.getElementById('content').innerText = output;
          }
     </script>
<script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()">
</script>
<script async defer src="https://accounts.google.com/gsi/client" 
onload="gisLoaded()"></script>
```

### 删除网盘文件

```javascript
      // 删除网盘的文件
        function deleteFile(fileId) {
            console.log(gapi.client);
            console.log(gapi.client.drive);
            var request = gapi.client.drive.files.delete({
                'fileId': "1_6U4FxitDGbPmbb3cPTx7-Xb6vjjM8qI",
            });
            console.log(request);
            request.execute(function (resp) {
                console.log(resp);
                console.log('Title: ' + resp.title);
                console.log('Description: ' + resp.description);
                console.log('MIME type: ' + resp.mimeType);
            });
        }
```

### 文件上传

```javascript
    function createFile(event) {
            const files = event.target.files;
            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            var reader = new FileReader();
            reader.readAsBinaryString(files[0]);
            reader.onload = function (e) {
                console.log(files)
                var contentType = files[0].type || 'application/octet-stream';
                var metadata = {
                    'title': files[0].name,
                    'mimeType': contentType
                };

                var base64Data = btoa(reader.result);
                var multipartRequestBody =
                    delimiter +
                    'Content-Type: application/json\r\n\r\n' +
                    JSON.stringify(metadata) +
                    delimiter +
                    'Content-Type: ' + contentType + '\r\n' +
                    'Content-Transfer-Encoding: base64\r\n' +
                    '\r\n' +
                    base64Data +
                    close_delim;

                var request = gapi.client.request({
                    'path': '/upload/drive/v2/files',
                    'method': 'POST',
                    'params': { 'uploadType': 'multipart', },
                    'headers': {
                        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                    },
                    'body': multipartRequestBody,

                });

                request.execute(function (resp) {
                    console.log(resp);
                    console.log('Title: ' + resp.title);
                    console.log('Description: ' + resp.description);
                    console.log('MIME type: ' + resp.mimeType);
                });
            }

        }
```

### 文件下载

```javascript
       // 获取下载路径
        function printFile(fileId) {
            var request = gapi.client.drive.files.get({
                'fileId': fileId,
                'fields': "webContentLink,name,id"
            });
            console.log(request)
            request.execute(function (resp) {
                console.log(resp)
                console.log('Title: ' + resp.title);
                console.log('Description: ' + resp.description);
                console.log('MIME type: ' + resp.mimeType);
            });
        }
        function downloadFile(file) {

            window.location.assign("https://drive.google.com/uc?id=1WBU
            fd0RXNqDb8pjqCCsMtc3F_Ig0D9Zc&export=download")


        }
```

## 使用库图形化界面操作

### React-google-drive-picker

> 通过库的使用，可以将文件形成图形界面，其次可以进行文件的选择，选中的文件会在后台打印出对应的地址。也可以进行文件的上传但是文件只能上传本地文件，无法上传内存中的文件。

#### 依赖安装

```javascript
npm i react-google-drive-picker
```

#### 配置案例

> 同样需要开始五个步骤的谷歌控制台的配置生成客户端ID以及API密钥

```javascript
//页面引入库文件
import useDrivePicker from "react-google-drive-picker/dist";


function App() {
  const [openPicker, data, ] = useDrivePicker()
    const handleOpenPicker = () => {
    openPicker({
      clientId: "your id",
      developerKey: "you api key",
      //可进行预览的文件类型，DOCS为Google Drive 全文件格式
      viewId: "DOCS",
      //是否开始上传功能
      showUploadView: true,
      //是否可以上传文件夹
      showUploadFolders: true,
      //是否可以进行分享
      supportDrives: true,
      //是否可以多选
      multiselect: true,
      //选择触发的回调函数，当选择一个文件之后就会将选中的文件的信息打印出来
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }
  
  return (
  <div>
  //案例触发按钮，
    <button onClick={handleOpenPicker}>Open Picker</button>
  </div>
  )

}
```

> 功能描述
> 点击按钮之后，会触发账号登录机制，期间会询问权限是否同意，登录完成即可打开一个可视化的google drive文件的选择界面，当双击或者选中文件之后点击左下角的select按钮之后就会执行callbackFunction回调函数，将文件的信息在后台打印出来。还包含一个本地文件的上传功能，可以选择文件存放的文件位置，但是无法新建文件夹。

#### 其他参数

| params                 | value   | description                             |
| ---------------------- | ------- | --------------------------------------- |
| token                  | string  | 将用户的access\_token传入会跳过认证阶段 |
| setIncludeFolders      | boolean | 是否显示文件夹                          |
| setSelectFolderEnabled | booleam | 是否允许选择文件夹                      |
| customScopes           | string  | 授权的范围                              |

#### 后续工作

若要实现内存中文件的上传需要修改引用库的源代码。
