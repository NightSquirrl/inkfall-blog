---
title:  9-数据持久化
tag:
  - harmony
star: true
---

# 数据持久化

## 首选项

[官网地址](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-data-preferences-0000001427745052-V3#ZH-CN_TOPIC_0000001573928817__delete)

### 导入模块

```ts
import dataPreferences from '@ohos.data.preferences';
```

### 获取首选项实例

```ts
dataPreferences.deletePreferences(this.context, 'mystore')
.then(preference => {
  
})
.catch(reason => {
  
})
```

### 数据操作

#### get

```ts
let promise = preferences.get('startup', 'default');
    promise.then((data) => {
        console.info("Succeeded in getting value of 'startup'. Data: " + data);
    }).catch((err) => {
        console.error("Failed to get value of 'startup'. code =" + err.code + ", message =" + err.message);
    })
```

> 如果 get 'startup' 没有数据 则返回后面的默认值

#### put

```ts
try {
    let promise = preferences.put('startup', 'auto');
    promise.then(() => {
        console.info("Succeeded in putting value of 'startup'.");
    }).catch((err) => {
        console.error("Failed to put value of 'startup'. code =" + err.code +", message =" + err.message);
    })
} catch(err) {
    console.error("Failed to put value of 'startup'. code =" + err.code +", message =" + err.message);
}
```

#### delete

```ts
try {
    let promise = preferences.delete('startup');
    promise.then(() => {
        console.info("Succeeded in deleting the key 'startup'.");
    }).catch((err) => {
        console.error("Failed to delete the key 'startup'. code =" + err.code +", message =" + err.message);
    })
} catch(err) {
    console.error("Failed to delete the key 'startup'. code =" + err.code +", message =" + err.message);
}
```



## 关系型数据库

[官网地址](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/js-apis-data-relationalstore-0000001493744128-V3#section797314581314)

基于 SQLite组件提供的本地数据库,用于管理结构化数据

### 导入模块

```ts
import relationalStore from '@ohos.data.relationalStore'
```

### 初始化数据库表

```ts
const STORE_CONFIG = {
      name: "RdbTest.db",
      securityLevel: relationalStore.SecurityLevel.S1
};

const createSQL = 'CREATE TABLE IF NOT EXISTS TABLENAME (
ID integer primary key,
Name TEXT NOT NULL,
FINISHED BIT,

)'

relationalStore.getRdbStore(this.context, STORE_CONFIG, function (err, rdbStore) {
	rdbStore.executeSql(createSQL)
  })
```

### 插入数据

```ts
const valueBucket = {
  "NAME": "Lisa",
  "AGE": 18,
  "SALARY": 100.5,
  "CODES": new Uint8Array([1, 2, 3, 4, 5]),
};
store.insert("EMPLOYEE", valueBucket, function (err, rowId) {
  if (err) {
    console.error(`Insert is failed, code is ${err.code},message is ${err.message}`);
    return;
  }
  console.info(`Insert is successful, rowId = ${rowId}`);
})
```

### 更新数据

```ts
const valueBucket = {
  "NAME": "Rose",
  "AGE": 22,
  "SALARY": 200.5,
  "CODES": new Uint8Array([1, 2, 3, 4, 5]),
};
// 设置查询的条件
let predicates = new relationalStore.RdbPredicates("EMPLOYEE");
// 判断 id 是否相等
predicates.equalTo("NAME", "Lisa");
// 相等进行修改
store.update(valueBucket, predicates, function (err, rows) {
  if (err) {
    console.error(`Updated failed, code is ${err.code},message is ${err.message}`);
    return;
  }
  console.info(`Updated row count: ${rows}`);
})
```

### 删除数据

```ts
let predicates = new relationalStore.RdbPredicates("EMPLOYEE");
predicates.equalTo("NAME", "Lisa");
store.delete(predicates, function (err, rows) {
  if (err) {
    console.error(`Delete failed, code is ${err.code},message is ${err.message}`);
    return;
  }
  console.info(`Delete rows: ${rows}`);
})
```

