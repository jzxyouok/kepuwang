article type : 1 文章 2 图片 3 贴吧 4 视频 5纪录片
maintype:1天文文理 2地理地质 3人文生态 4其他
type:1轮播2首页3普通4:推荐
status: 1可用 0被撤销  2：草稿箱
文章预览的实现： #article/:id  与 #article/:id/1

// echo $db->getLastSql();

## 图片
	#/allPic">所有图片
	#/allPic?type=2">首页图片
	#/allPic?type=3">普通图片
	#/allPic?status=2">草稿箱
	#/allPic?status=0">被撤图片
## 视频
	type=2">首页视频
	type=3">普通视频
	status=2">草稿箱
	status=0">被撤视频