---
title: 04. ffmpeg 基本入门教程
icon: logos:ffmpeg-icon
description: ffmpeg 相关命令的使用 -> wasm
tag:
  - React
  - ffmpeg
  - video
  - 前端
---

基于React项目使用

# **安装ffmpeg.wasm**

```Shell
$ npm install @ffmpeg/ffmpeg
# or
$ yarn add @ffmpeg/ffmpeg
```




要在 node 环境中使用 ffmpeg.wasm，还需要安装

```Shell
$ npm install @ffmpeg/core
# or
$ yarn add @ffmpeg/core
```


或者您可以使用 CDN

# **How to Use** 

## **createFFmpeg（）**

```Plain Text
createFFmpeg 是一个创建 ffmpeg 实例的工厂函数。
//参数
options自定义选项的对象
    corePathffmpeg-core.js 脚本的路径
    log打开所有日志的布尔值，默认为false
    logger一个获取日志消息的函数，一个简单的例子是({ message }) => console.log(message)
    progress跟踪进度的功能，一个简单的例子是p => console.log(p)
```


### **sample**

```JavaScript
const { createFFmpeg } = FFmpeg;
const ffmpeg = createFFmpeg({
  corePath: "./node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
  log: true,
});
```


## **ffmpeg.load()**

---

依赖 Emscripten 提供的 FS 方法。*https://emscripten.org/docs/api_reference/Filesystem-API.html*

在使用其他的方法之前必须要调用的API：

l 从远程服务器下载 ffmpeg-core.js（大约 25MB）

l 实例化 ffmpeg.wasm wasm 代码

## **文件系统（FS）**

将文件写入 MEMFS 作为 ffmpeg.wasm 的输入

```Plain Text
1.ffmpeg.FS('writeFile', 'filename', data)
```


从 MEMFS 读取文件作为 ffmpeg.wasm 的输出

```Plain Text
2. ffmpeg.FS('readFile', 'filename')
```


删除 MEMFS 中的文件

```Plain Text
3. ffmpeg.FS('unlink', 'filename')
```


列出特定路径内的文件

### **解释：**

```Plain Text
MEMFS就像是一块硬盘。可以里面存储数据，并取出数据
```


## **SharedArrayBuffer**

SharedArrayBuffer 是 JavaScript 中一种相当新的数据类型，由于安全问题，目前大多数浏览器仍然缺乏完全支持。但是在 ffmpeg.wasm 中，要启用 pthread / 多线程支持以加快速度，它是需要使用的数据类型。 

-  SharedArrayBuffer 介绍：*https ://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer*

## **ffmpeg.run(...args)**

这是 ffmpeg.wasm 中的主要功能，你可以把它想象成 ffmpeg 原生的 cli，你需要传递的也是一样的。

args 字符串参数，就像 cli 工具一样。

### **前置知识-video**

```Plain Text
格式：准确的来说是视频文件的一种的封装格式或者也叫做容器格式里面包含视频流，音频流，字幕、章节和一些其他的元数据
编码：解决的是如何将每一帧的画面存储成二进制的数据保存在硬盘上或者网路传输
```


### **参数详解**

|||
|-|-|
|首先读取文件|ffmpeg.FS("writeFile", "test.avi", await fetchFile("/flame.avi"));此时MEMFS内存中存在一个名字为test.avi的文件|
|-i|用于输入文件|
|-r|指定文件的帧率|
|-b|指定文件的比特率 例如：-b:v 64k 文件的视频比特率设置为 64 kbit/s|
|-c|设置编码格式 -c:v 设置视频的编码格式 -c:a 设置音频的编码格式 ffmpeg -i video.avi -i hello.srt -c:v h264 video.mkv ，将一个视频文件avi和一个字幕文件合并为一个mkv文件 ffmpeg -i a.mov -c copy a.mp4 快速拷贝输入文件的视频和音频格式|
|ffmpeg -codecs|查看所有所支持的编码方式 D解码E编码V视频A音频S字幕I表示支持帧内编码L表示该编码格式属于有损压缩格式S表示支持无损压缩的方式|
| |如果两个格式支持相同的视频编码可以加快转换的速度 ffmpeg -i a.mov -c copy a.mp4 避免了视频的重新解码和编码的操作|
| |需要注意的是如果两个转换的结果所支持的视频或者音频的编码方式不同则需要经过解封装，解码，编码，再封装「解码和编码会占用大量的时间」|
|-movflags faststart|加快视频在网络上的加载和播放的速度|
|-encoders|查看所支持的所有编码器列表|
|-decoders|查看所支持的所有解码器列表|
|ffmpeg -h encoder=libx264|查看某个编码器可以使用的编码参数|
|ffmpeg -h|查看常用的命令|
|-s|视频的分辨率 -s 1920*1080|
|-vb|设置视频的输出码率 -vb 5000k|
|-ab|设置音频码率 -ab 320k|
|拆分音视频|ffmpeg -i hello.avi -c:v h264 video.mp4 -c:a aac audio.acc|
|一个输入多个输出|ffmpeg -i video4k.avi -c:v h264 -s 1280*720 720.mp4 -c:v h264 -s 1920*1080 1080p.mp4|
|查看文件后缀的信息|ffmpeg -h muxer=mp4 不同的疯转格式所支持的视频编码格式不同|
|-preset 预设|ultrafast superfast verfast fast medium slow slower verslow,编码速度越快产生的文件体积越大|
|-crf 控制视频的质量|0-51|
|-ss 片段的起始位置|-ss 00:00:03 如果音视频的格式不统一vcodec libx264-acodec aac强制统一|
|-t 片段的时长|-t 00:00:05|
|-to 指定片段终止的位置|-to 00:00:08|
|concat 合并拼接|ffmpeg -f concat -i mylist.txt -c copy output.mp4|
|-an|删除音轨|
|-vn|删除视频轨道|
|-sn|删除字幕|
|-dn|删除数据流|

### **举例-视频**

|||
|-|-|
|h264| |
| |ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4 进行普通转换|
| |查看x264支持的编码 ffmpeg -h encoder=libx264|
| |-crf 恒定模式下的画质级别，数字越小画质越好转码的速度也就越慢，一般选择16-23|
| |ffmpeg -i input.avi -c:v libx264 -crf 18 -c:a aac -ab 320k output.mp4|
|ProRes转码|属于苹果开发的一款视频编码格式 辅助查看规则 ffmpeg -h encoder=prores_ks|
| |ffmpeg input.mp4 -c:v prores -profile 1 -c:a aac -ab 320k output.mov|
|DNXHD|ffmpeg input.mp4 -c:v dnxhd -profile dnxhr_lb「子编码」 -pix_fmt yuv422p「指定像素格式」 -c:a aac -ab 320k output.mfx|
|cineForm|ffmpeg -i input.mp4 -c:v cfhd -quality「画质控制选项」 high -c:a aac -ab 320k output.|
|生成缩略图|ffmpeg -i test.mp4 -vf "fps=1/10,scale=-2:720" thumbnil-$03d.jpg 每十秒输出一张画面|
|添加水印|ffmpeg -i test -i cat.jpg -filter_complex "overlay=100：100“ output.mp4overlay将水印叠加到原始视频的上方|
|转换为gif|ffmpeg -i test.avi -ss 0 -t 3 -filter_complex [0:v]fps=15,scale=-1:256,split[a][b];[apalettegen[p];[b][p]plaletteuse output.gif|

## **举例-音频**

常见的格式 mp3 aac wav flac

编码器 采样率 声道 码率

ffmpeg -i input -c:a ENCODER -ar SAMPLE -ac CHANNEL -ab BITRATE outpuy

SAMPLE :音频采样率 音频采样精度 HZ 一般情况下，数字越大质量越好 主流44.1KHZ 48KHZ

CHANNEL：音频声道数量

BITRATE：音频码率

|||
|-|-|
|wav转mp3|ffmpeg -i Image.wav -c:a libmp3lame -ar 44100 -ac 2 -ab 320k Image.mp3|
|wav转aac|ffmpeg -i Image.wav -c:a aac -ar 44100 -ac 2 -ab 320k Imae.acc|
|flac转MP3|ffmpeg -i Image.flac -c:a libmp3lame -ar 44100 -ac 2 -ab 320k Image.mp3|

### 滤镜

```Plain Text
**修改视频的尺寸、旋转、滤镜 -vf
前一个过滤器的输入将直接作为下一个过滤器的输入
$ 将一个视频缩放为原本的0.5倍速并旋转90deg
transpose:「旋转的方向 0： 逆时针旋转90度，然后垂直翻转，1：顺时针旋转90deg 2：逆时针旋转90deg 3：顺时针旋转90度，然后垂直翻转」
scale:缩放，也就是输出的视频的比例长宽
crop：裁剪 w:h:x:y  代表区域的宽度和高度，以及左上角的x，y坐标
   ffmpeg -i text.avi -c:v libx264 -vf "scale=1025:567「或者第二个参数可以是-1让ffmpeg根据第一个参数进行推算」,transpose=2,crop=400:400:100:100"
   
**修改音频的参数 -af
ffmpeg -i test.mp4 -af "volume=1.5,loudnorm=I=-5:LRA=1「统一视频的音量」”
equlizer=f=1000:widt_type=h:width=200:g=-10,高通低通滤波器，甚至是均衡器

```


## **ffmpeg.exit()**

杀死程序的执行，同时删除 MEMFS 以释放内存

### **example**

```JavaScript
const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load(...);
setTimeout(() => {
  ffmpeg.exit(); // ffmpeg.exit() is callable only after load() stage.
}, 1000);
await ffmpeg.run(...);
```


## **ffmpeg.setLogging(true)**

```Plain Text
logging在控制台中关闭/关闭日志消息的布尔值
ffmpeg.setLogging(true);
```


## **fmpeg.setLogger()**

```Plain Text
logger 处理消息的函数
ffmpeg.setLogger(({ type, message }) => {
  console.log(type, message);
  /*
   * type can be one of following:
   *
   * info: internal workflow debug messages
   * fferr: ffmpeg native stderr output
   * ffout: ffmpeg native stdout output
   */
});
```


## **ffmpeg.setProgress（）**

进度处理程序，用于获取 ffmpeg 命令的当前进度。

```Plain Text
ffmpeg.setProgress(({ ratio }) => {
  console.log(ratio);
  /*
   * ratio is a float number between 0 to 1.
   */
});
```


## **fetchFile()**

用于从各种资源中获取文件的辅助函数。

有时，您要处理的视频/音频文件可能位于远程 URL 和本地文件系统中的某个位置。

这个帮助函数帮助你获取文件并返回一个 Uint8Array 变量供 ffmpeg.wasm 使用。

media ： URL 字符串、base64 字符串或 File、Blob、Buffer 对象

```Plain Text
(async () => {
  const data = await fetchFile('https://github.com/ffmpegwasm/testdata/raw/master/video-3s.avi');
  /*
   * data will be in Uint8Array format
   */
})();
```


# **常用命令整理**

## **文字水印**

```Plain Text
ffmpeg -i input.mp4 -vf "drawtext=fontsize=100:text='hello world':x=20:y=20:fontcolor=green"

使用当前的时间作为水印
ffmpeg -re -i inout.mp4 -vf "drawtext=fontsize=60:text='%{localtime\"%Y\-%m\-%d %h-%M-%S}':fontcolor=green:box=1:boxcolor=tellow" out.mp4

定时显示水印--每三秒
ffmpeg -re -i inout.mp4 -vf "drawtext=fontsize=60:text='%{localtime\"%Y\-%m\-%d %h-%M-%S}':fontcolor=green:box=1:boxcolor=tellow:enable=lt(mod(t\,3)\,1)" out.mp4

```


||||
|-|-|-|
|参数|类型|说明|
|text|string|文字|
|textfile|string|文字的文件|
|box|bool|文字区域的背景色（缺省false) box=1|
|boxcolor|色彩|展示区块的颜色|
|font|string|字体名称|
|fontsize|int|显示的字体大小|
|x|string|缺省为0|
|y|string|缺省为0|
|alpha|float|透明度（默认为1）0~1|

## **从视频中截取一张图片**

```Plain Text
ffmpeg -i test.mp4 -y -f image2 -ss 00:00:02 -vframes 1 -s 640*360 test.jpg

-i 输入
-y 覆盖已经存在的输出
-f 格式
image2 图片的一种格式
-ss 起始
-vframe 帧 如果大于1 输出假%03的text%03d.jpg

每15帧为一张图片
ffmpeg -i test.mp4 -t 5 -s 640x360 -r 15 frame%03d.jpg
```


## **图片转为视频**

```Plain Text
ffmpeg -f image2  -i frame%03d.png -r 40 video.mp4 
单张10s
ffmpeg -r 25 -loop 1 -i 1.jpg -pix_fmt yuv420p -vcodec libx264 -b:v 600k -r:v 25 -preset medium -crf 30 -vframes 250 -r 25 -t 10 1.mp4
```


## **Video转GIF**

```Plain Text
ffmpeg -i test.mp4 -t 5 -r 1 image1.gif
ffmpeg -i test.mp4 -t 5 -r 25 -s 640x360 image2.gif
```


## **GIF转Video**

```Plain Text
ffmpeg -f gif -i image2.gif image2.mp4
```


## **拼接视频**

```Plain Text
建议将其他格式的视频先转换成TS格式，然后在进行拼接，否则会出现错误
转TS
ffmpeg -i 1.mp4 -c copy -vbsf h264_mp4toannexb 1.ts
ffmpeg -i "concat:1.mp4|2.mp4" -c copy out.mp4
```


 



