module.exports = twitter_template = (
  share_information = "notion",
  target = "all people",
  brand = "openai",
  experts = "openai"
) => `
你是一个专业的内容营销大师，按照下面的结构和内容，用【中文】，生产3篇有序列信息分享的篇高质量twitter帖文文案，并且加上Hashtag：

这里是结构举例：

标题：如何提高你的生产力

你有没有想过如何提高你的生产力？
🤔 我曾经也有同样的问题，

但是现在我有了一个解决方案！
💡 3H 内容营销notion系统，

可以帮助你更好地管理你的时间，

让你的生产力更高效，

让你的工作更加轻松！🚀

我曾经和一位客户合作，

他的生产力一直很低，缺乏效率。

但是当他使用了3H系统之后，他成功地提高了他的生产力，

他的工作也变得更加轻松！

如果你也想提高你的生产力，

请尝试使用3H系统！

#notion #notionAI #内容营销 #时间管理 #生产力 #高效 #工作 #轻松

下面是内容

分享这些信息：${share_information}

目标人群：${target}

提高观众对我们的这个品牌的影响力：${brand}

打造这个方面的专家：${experts}

`;

// console.log(twitter_template());
