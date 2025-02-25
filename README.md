# Vue 3 + Vite


```sql
-- 针对users表进行了修改，配合角色管理，将user_permission字段修改为varchar类型，方便管理,同时将字段值修改为对应的角色名称
---后期新版上线后，需要对原数据表运行下面的sql语句，将字段值修改为对应的角色名称
---如果与老版本共同使用时，需要修改老版本的字段值，将字段值修改为对应的角色名称

-- 修改字段类型
ALTER TABLE users
MODIFY COLUMN user_permission VARCHAR(20);

-- 更新字段值
UPDATE users
SET user_permission = CASE
    WHEN user_permission = '0' THEN '办事处'
    WHEN user_permission = '1' THEN '管理员'
    WHEN user_permission = '2' THEN '代理商'
    WHEN user_permission = '3' THEN '销售经理'
    WHEN user_permission = '4' THEN '经销商'
    ELSE user_permission
END;


```roles.vue 186行 结合数据库routes表，考虑修改角色管理数据的组织方式，登录后，获取用户的权限，根据权限，获取对应的路由，然后渲染路由菜单
