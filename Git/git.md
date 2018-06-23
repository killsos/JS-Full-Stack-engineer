## Git

#### 介绍

[Git参考](http://www.zhufengpeixun.cn/docs/html/Git/git%E5%85%A5%E9%97%A8.html)


1.0 安装

    brew install git

1.1 分布式

1.2 原理

    工作区

    暂存区/过渡区

    历史区/版本库

1.3 配置git用户和邮箱

    $ git config --global user.name "你的github用户名"    
    $ git config --global user.email "你的github邮箱"

不配置用户名和邮箱的话无法提交,因为git不知道你是谁

1.4 查看配置

    $ git config --global user.name 
    $ git config --global user.email

1.5 查看所有配置

        $ git config --list