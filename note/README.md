+++
title = "SNSの通知をメールやSlackで受けとる"
date = "2021-03-26"
tags = ["SNS", "Slack"]
+++

![img](/img/2021/03/cdksns-slack-mail.png)

あまりメールは見なくなってきた昨今、通知はSlackで受け取りたい、ということはよくある。
といいつつ、Slackだとスルーの可能性も高いし、Gmailにも投げ込んでおいて後から見れると良いだろう。

ということでその仕組みをCDKにしておいた。

[Githubのリポジトリ](https://github.com/suzukiken/cdksns-slack-mail)

Slackの管理画面でIncomming Webhook URLを発行してそれを設定する必要がある。

SNSのtopicは汎用的に使うことを考えて、CDKの中でSystems ManagerのParameter Storeに入れている。
