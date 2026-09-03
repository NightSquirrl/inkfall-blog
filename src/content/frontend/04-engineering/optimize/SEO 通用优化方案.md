---
title: SEO 通用优化方案
tags: ["优化", "SEO", "前端"]
draft: false
description: SEO 通用优化方案
category: optimize
publishedAt: "2026-08-15"
---

# **内容方面优化**

## 1.**增加 Mate Descripition**

每个页面

```javascript
<meta name="description" content="xxxxxxxx">
```

填写页面的介绍，160单词~170单词，可参考竞品

## 2.**纯文本 A Link 文案可读性**

A Link 跳转的文本具有可读性，比如“More”按钮可以将其改成“More Apps”更直观

## 3.**图片增加 Alt 属性**

给页面中每张图片增加有意义的alt属性，可以是对图片的描述，图片表示的功能。

## 4.**设置网站title**

每个页面

```javascript
<title>XXXXXX</title>
```

填写页面的标题，50单词~100单词，可参考竞品

## 5.**设置网站Icon**

每个页面设置的lcon都应该相同，只对域名的首页起作用。

```javascript
<link rel="icon" href="xxxx">
```

## 6.**结构化数据，不同产品结构化数据内容不同**

# **通用结构化数据**

## 1.**设置网站Logo**

只需要在首页上设置

网页header增加JSON-LD，参考https://developers.google.com/search/docs/appearance/structured-data/logo?hl=zh-cn#example

Logo Icon要求：

大小至少112x112

格式的图片： BMP、GIF、JPEG、PNG、WebP 和 SVG

示例

```javascript
<script type="application/ld+json"></script>
```

## 2.**设置网站名称**

只需要在首页上设置

网页header增加JSON-LD，参考https://developers.google.com/search/docs/appearance/site-names?hl=zh-cn#how-to-add-structured-data

名称描述尽可能50个字符以上，但不能太长。可参考竞品重新组织语言。

示例

```javascript
<script type="application/ld+json"></script>
```

## 3.**设置网站更新时间**

可对有定期更新内容的关键页面进行设置

网页header增加JSON-LD，参考https://developers.google.com/search/docs/appearance/publication-dates?hl=zh-cn，建议添加[CreativeWork](https://schema.org/CreativeWork)的子类型（例如[Article](https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-cn)、[BlogPosting](https://schema.org/BlogPosting)或[VideoObject](https://developers.google.com/search/docs/appearance/structured-data/video?hl=zh-cn)），并指定datePublished和/或dateModified字段

示例

```javascript
<script type="application/ld+json">{ "@context": "https://schema.org",</script>
```

## 4.**设置面包屑路径**

针对页面跳转路径进行设置

网页header增加JSON-LD，参考https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=zh-cn#json-ld

参考

```javascript
<script type="application/ld+json"></script>
```

# **其他结构化数据**

https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=zh-cn

## **Link 路径命名规范化**

用有意义的名称，不要使用数字，单词之间用“-”

可以采用url channle 方式的技术实现路径的变化，并保持原有路径能访问

## **Url 归一化**

## **控制台没有异常**

## **性能方面优化**

## **CLS优化**

## **TBT优化**

## **LCP优化**
