## Git

#### 介绍

[Git参考](http://www.zhufengpeixun.cn/docs/html/Git/git%E5%85%A5%E9%97%A8.html)


#### 1.0 安装

    brew install git

#### 1.1 分布式

#### 1.2 原理

    工作区        当前编码区

        通过命令 git add 将代码提交到暂存区

    暂存区/过渡区

        通过命令 git commit 将代码提交到历史区

    历史区/版本库

#### 1.3 配置git用户和邮箱

    $ git config --global user.name "你的github用户名"    
    $ git config --global user.email "你的github邮箱"

不配置用户名和邮箱的话无法提交,因为git不知道你是谁

#### 1.4 查看配置

    $ git config --global user.name 
    $ git config --global user.email

#### 1.5 查看所有配置

        $ git config --list

#### 1.6 初始化git
    
    先创建一个空目录 ，然后进入此目录

    点击右键选择Git-Bash打开命令行

    输入git init命令把这个目录变成Git可以管理的仓库

    $ git init

    每个git工程都有.git的文件夹
    这是一个隐藏文件

    通过ls -al命令查看所有文件

#### 1.7 git中的三个区

    工作区

        通过git add 添加到暂存区

        $ git add '文件名'

    暂存区

    特点:过渡的作用，避免误操作，保护工作区和历史区，分支处理;

        通过git commit 添加到历史区

        $ git commit -m"注释内容"

    历史区
    
    $ git commit -a -m "message"

    直接将修改一次提交历史区 但是主要 需要修改已经提交过到暂存区一次了

    查看历史状态

        $ git log
        
        修改时通过git status查看当前状态


#### 1.8 git diff

不同区的代码比较

工作区和暂存区 

    $ git diff 

暂存区和历史区

    $ git diff --cached
    $ git diff --staged

工作区和版本库

    $ git diff 分支名

#### 1.9 撤销

- 从暂存区中将工作区内容覆盖掉 

```
$ git checkout "文件名"
```
- 撤回文件 
先从缓存区撤销,缓存区无内容，从历史区域撤销 

有的时候我们希望提交时合并到上一次的提交 git commit --amend

- 撤销回git add的内容
就是暂存区回滚一次 (暂存区只能回滚一次)

    $ git reset Head "文件名"


#### 1.10 删除 

删除暂存区和工作区 

    删除暂存区中的内容,并且保证工作区中的内容已经不存在

    $ git rm "文件名"

若本地文件存在则不能删除，需要通过-f参数删除

仅删除缓存区 
    
    $ git rm --cached "文件名"

#### 1.11 恢复 

恢复某个版本文件 
就是从历史区的版本id恢复 

    $ git checkout commit_id filename 某个文件

- 回滚历史版本

    $ git reset --hard commit_id

    --hard 从历史区的从版本ID恢复过来 会彻底覆盖暂存区和工作区

    $ git reset --hard HEAD^

    HEAD^ 代表当前版本的上一次

- 查看所有版本ID 

    $ git reflog

快速版本回退 

    $ git reset --hard HEAD^

    $ git reset --hard HEAD~3

#### 1.12 同步远程仓库 

1 gitHub 
 注册账号 
 新建项目

2 添加远程仓库 

    $ git remote add origin "地址"

3 添加忽略文件 

    $ touch .gitignore
    $ echo .DS_Store
    $ echo node_modules
    $ echo .idea

4 推送代码 
    
    $ git push origin master

5 查看 
    $ git remote 查看名字
    $ git remote -v 查看地址

#### 1.13 代码的合并 

1 git fetch 拉取
    
    $ git fetch

拉取过来手动合并

    $ git diff master origin/master
     diff 本地master分支 与 远程master分支
     
    $ git merge origin/master
    本地master合并远程master

2 git pull 拉取并合并

    $ git pull  origin master
    拉取远程的master分支与当前所在本地分支合并

#### 1.14 分支
    git branch 查看所有分支  

    git branch branchName 创建分支 

    git checkout branchName  切换分支 

    git checkout -b branchName  先创建分支并切换到创建的分支 

    git branch -d a 删除分支
    
    git branch -D a 删除分支

    删除分支的时候 不能删除当前所在的分支

- 文件修改时候切换分支 
```
    $ git stash

    暂存文件修改

    分支有更改(这里不仅工作区的更改还包括暂存区中未commit的更改)不能直接切换 可以提交更改或者暂存更改
    这里暂存更改 stash 其实是使用暂存区覆盖工作区的内容
    很危险

    如果还想要之前的修改

    $ git stash pop

    还原之前用stash暂存的内容pop
```

- 合并分支 

```
    git merge 原理:
    先创建主干 在主干的基础上添加一个分支
    在分支上进行提交 切换到主干合并分支

    合并的所谓"冲突"---就是对一个文件的修改
    
    git branch --merged 合并了哪些分支
    
    git branch --no-merged 合并了哪些分支
```

#### 1.15 tag版本

    $ git tag v.10

#### 1.16 查看log图谱

    $ git log --graph 
    详版
    $ git log --graph --oneline
    简版

#### 1.17 关联远程仓库

    $ git remote add 仓库别名 仓库地址
    
    仓库别名习惯用 origin 

    $ git push -u orgin master

    push orgin仓库的master分支 这里也可以自己设定别的分支 不一定master分支

#### 1.18 设置gh-pages分支来发布静态页

- 在项目中创建一个gh-ages的分支
- 将分支提到线上仓库
- 在该仓库的settings 找到 Github Pages选项 进行设置

