---
title:  5-页面路由
tag:
  - harmony
star: true
---

# 页面路由

页面栈的最大容量是 32 个页面使用 router.clear()方法可以清空页面栈 释放内存

Router 两种页面跳转的方式:

- router.pushUrl():入栈页面router.back()返回页面
- router.replaceUrl():替换当前的页面 无法返回

Router 两种页面实例模式:

- Standard:标准模式每次跳转页面新建页面入栈
- Single:单例模式 如果目标的页面已存在页面中 将其移动到栈顶

## 页面路由

1. 导入模块

2. ```ts
   import router from "@ohos.router";
   ```

3. 使用 router 实现页面的跳转

4. ```ts
   router.pushUrl(
     {
       url:'pages/xxx',
       params:{id:1}
     },
     router.RouterMode.Single,
     err=>{
       if(err){
         console.log('跳转失败')
       }
     }
   )
   ```

5. 错误码

6. ```tex
   100001:内部错误,可能是页面渲染失败
   100002:路由地址错误
   100003:栈页面超过 32
   ```

7. 获取参数

8. ```ts
   router.getParams()
   ```

9. 返回上一页

10. ```ts
    // 上一页
    router.back()
    
    // 指定页面
    router.back(
     {
        url:'pages/xxx',
        params:{id:1}
      }
    )
    ```

11. main_pages.json 页面配置