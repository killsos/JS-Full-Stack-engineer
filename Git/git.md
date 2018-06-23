## Git

#### 介绍

[Git参考](http://www.zhufengpeixun.cn/docs/html/Git/git%E5%85%A5%E9%97%A8.html)


1.0 安装

    brew install git

1.1 分布式

1.2 原理

    工作区        当前编码区

        通过命令 git add 将代码提交到暂存区

    暂存区/过渡区

        通过命令 git commit 将代码提交到历史区

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

1.6 初始化git
    
    先创建一个空目录 ，然后进入此目录

    点击右键选择Git-Bash打开命令行

    输入git init命令把这个目录变成Git可以管理的仓库

    $ git init

    通过ls -al命令查看所有文件

1.7 git中的三个区

    工作区

        通过git add 添加到暂存区

        $ git add '文件名'

    暂存区

    特点:过渡的作用，避免误操作，保护工作区和历史区，分支处理;

        通过git commit 添加到历史区

        $ git commit -m"注释内容"

    历史区

    查看历史状态

        $ git log
        
        修改时通过git status查看当前状态