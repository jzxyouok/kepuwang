/*
MySQL Backup
Source Server Version: 5.5.40
Source Database: kepu
Date: 2016/5/28 18:52:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `publishTime` varchar(12) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `thumbnail` varchar(100) DEFAULT NULL COMMENT '缩略图地址',
  `type` tinyint(1) DEFAULT '3' COMMENT '1轮播2首页3普通',
  `mainType` tinyint(1) DEFAULT NULL COMMENT '1天文文理2地理地质3人文生态4其他',
  `abstract` text COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `attachment`
-- ----------------------------
DROP TABLE IF EXISTS `attachment`;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL,
  `articleId` int(11) NOT NULL,
  `filePath` varchar(200) DEFAULT NULL,
  `filename` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `topid` int(11) NOT NULL DEFAULT '0',
  `type` int(2) NOT NULL,
  `fatherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `media`
-- ----------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `meta`
-- ----------------------------
DROP TABLE IF EXISTS `meta`;
CREATE TABLE `meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `pic`
-- ----------------------------
DROP TABLE IF EXISTS `pic`;
CREATE TABLE `pic` (
  `img_src` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `mainType` tinyint(1) DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `thumbnail` varchar(100) DEFAULT NULL COMMENT '缩略图地址',
  `type` tinyint(1) DEFAULT '3' COMMENT '1轮播2首页3普通',
  `publishTime` varchar(20) DEFAULT NULL,
  `priority` int(4) DEFAULT NULL,
  `abstract` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` char(32) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `loginIp` varchar(20) DEFAULT NULL,
  `registerTime` varchar(20) DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `email` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Table structure for `video`
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `publishTime` varchar(12) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `thumbnail` varchar(100) DEFAULT NULL COMMENT '缩略图地址',
  `type` tinyint(1) DEFAULT '3' COMMENT '1轮播2首页3普通',
  `video_src` varchar(100) DEFAULT NULL,
  `videoCode` text,
  `mainType` tinyint(4) DEFAULT NULL,
  `abstract` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=gbk;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `article` VALUES ('1',' I(\"post.title\")','I(\"post.content\")','0000-00-00 0','0',NULL,'1',NULL,NULL), ('2','轮播文章1','&lt;p&gt;内容 &amp;nbsp;&lt;strong&gt;爱的是法国&lt;/strong&gt;&lt;/p&gt;','0000-00-00 0','1',NULL,'1',NULL,NULL), ('3','轮播文章2','&lt;p&gt;内容 &amp;nbsp;&lt;strong&gt;爱的是法国&lt;/strong&gt;&lt;/p&gt;','1463121560','1',NULL,'1',NULL,NULL), ('4','','','1463128342','0',NULL,'1',NULL,NULL), ('5','','','1463128420','0',NULL,'2',NULL,NULL), ('6','普通文章1','','1463128590','0',NULL,'3',NULL,NULL), ('7','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463128856','0',NULL,'3',NULL,NULL), ('8','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129030','0',NULL,'3',NULL,NULL), ('9','zxzxvzcvx','&lt;p&gt;&amp;lt;p&amp;gt;zxvzxx&amp;lt;br/&amp;gt;&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;&amp;lt;img src=&amp;quot;/Uploads/image/20160513/1463128852178581.jpg&amp;quot; title=&amp;quot;1463128852178581.jpg&amp;quot; alt=&amp;quot;aron.jpg&amp;quot;/&amp;gt;&amp;lt;/p&amp;gt;&lt;/p&gt;&lt;p&gt;第三方&lt;/p&gt;','1463129057','1',NULL,'1',NULL,NULL), ('10','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129075','0',NULL,'3',NULL,'多舒服撒胜多负少胜多负少'), ('11','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129090','1','','1','0','问问定稿'), ('12','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129118','0',NULL,'3',NULL,NULL), ('13','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129165','1',NULL,'3',NULL,NULL), ('14','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129195','0',NULL,'3',NULL,NULL), ('15','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129219','0',NULL,'3',NULL,NULL), ('16','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129269','1',NULL,'3',NULL,NULL), ('17','首页文章1','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129307','1',NULL,'2',NULL,NULL), ('18','zxzxvzcvx','&lt;p&gt;zxvzxx&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160513/1463128852178581.jpg&quot; title=&quot;1463128852178581.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463129941','1','Uploads/image/20160513/1463128852178581.jpgthumb.png','3','2','啥都噶第三个'), ('19','测试图片','&lt;p&gt;的沙发放啥都噶第三个爱啥都噶第三个&lt;img src=&quot;/Uploads/image/20160513/1463130322299501.jpg&quot; title=&quot;1463130322299501.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463130325','0','Uploads/image/20160513/1463130322299501.jpgthumb.png','3',NULL,NULL), ('20','测试图片','&lt;p&gt;打算发大厦&lt;img src=&quot;/Uploads/image/20160513/1463130521336852.jpg&quot; title=&quot;1463130521336852.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463130524','0','Uploads/image/20160513/1463130521336852.jpgthumb.png','3',NULL,NULL), ('21','测试图片','&lt;p&gt;打算发大厦&lt;img src=&quot;/Uploads/image/20160513/1463130521336852.jpg&quot; title=&quot;1463130521336852.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463130593','0','Uploads/image/20160513/1463130521336852.jpgthumb.png','3',NULL,NULL), ('22','阿萨德','&lt;p&gt;爱的搜嘎&lt;img src=&quot;/Uploads/image/20160513/1463130860453813.jpg&quot; title=&quot;1463130860453813.jpg&quot; alt=&quot;aron.jpg&quot;/&gt;&lt;/p&gt;','1463130863','0','/Uploads/image/20160513/1463130860453813.jpgthumb.png','3',NULL,NULL), ('23','','&lt;p&gt;十大歌手&lt;/p&gt;','1463747627','0',NULL,'3',NULL,NULL), ('24','','&lt;p&gt;十大歌手&lt;/p&gt;','1463747674','0',NULL,'3',NULL,NULL), ('25','','&lt;p&gt;屌丝歌神&lt;/p&gt;','1463747694','0',NULL,'3',NULL,NULL), ('26','','&lt;p&gt;十大歌手&lt;/p&gt;&lt;p style=&quot;line-height: 16px;&quot;&gt;&lt;img style=&quot;vertical-align: middle; margin-right: 2px;&quot; src=&quot;/ueditor/dialogs/attachment/fileTypeImages/icon_jpg.gif&quot;/&gt;&lt;a style=&quot;font-size:12px; color:#0066cc;&quot; href=&quot;/attachment/file/20160520/1463747822376829.png&quot; title=&quot;QQ截图20160519015003.png&quot;&gt;QQ截图20160519015003.png&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;','1463747828','0',NULL,'3',NULL,NULL), ('27','','&lt;p style=&quot;line-height: 16px;&quot;&gt;&lt;img style=&quot;vertical-align: middle; margin-right: 2px;&quot; src=&quot;/ueditor/dialogs/attachment/fileTypeImages/icon_jpg.gif&quot;/&gt;&lt;a style=&quot;font-size:12px; color:#0066cc;&quot; href=&quot;/attachment/file/20160520/1463747890103452.png&quot; title=&quot;QQ截图20160519015003.png&quot;&gt;QQ截图20160519015003.png&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;','1463747895','0',NULL,'3',NULL,NULL), ('28','','&lt;p style=&quot;line-height: 16px;&quot;&gt;&lt;img style=&quot;vertical-align: middle; margin-right: 2px;&quot; src=&quot;/ueditor/dialogs/attachment/fileTypeImages/icon_jpg.gif&quot;/&gt;&lt;a style=&quot;font-size:12px; color:#0066cc;&quot; href=&quot;/attachment/file/20160520/1463748007122205.png&quot; title=&quot;QQ截图20160519015003.png&quot;&gt;QQ截图20160519015003.png&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;','1463748011','0',NULL,'3',NULL,NULL), ('29','','&lt;p&gt;&lt;embed type=&quot;application/x-shockwave-flash&quot; class=&quot;edui-faked-video&quot; pluginspage=&quot;http://www.macromedia.com/go/getflashplayer&quot; src=&quot;http://player.youku.com/player.php/sid/XMTUyNzM2MTY3Mg==/v.swf?from=s1.8-1-1.2&quot; width=&quot;420&quot; height=&quot;280&quot; wmode=&quot;transparent&quot; play=&quot;true&quot; loop=&quot;false&quot; menu=&quot;false&quot; allowscriptaccess=&quot;never&quot; allowfullscreen=&quot;true&quot;/&gt;&lt;/p&gt;','1463823873','0',NULL,'3',NULL,NULL), ('30','测试文章类型测试文章发表','&lt;p&gt;发表文章···发表了文章哈&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/Uploads/image/20160523/1463997186625897.png&quot; title=&quot;1463997186625897.png&quot; alt=&quot;1463997186625897.png&quot; width=&quot;452&quot; height=&quot;446&quot; border=&quot;0&quot; vspace=&quot;0&quot; style=&quot;width: 452px; height: 446px;&quot;/&gt;&lt;/p&gt;','1463997217','0','','3','0','添加简介添加简介'), ('31','测试文章标题','&lt;p&gt;测试文章内容文章内容测试文章内容文章内容测试文章内容文章内容测试文章内容文章内容&lt;/p&gt;&lt;p style=&quot;text-align: center;&quot;&gt;&lt;img src=&quot;/Uploads/image/20160523/1464001458120665.png&quot; title=&quot;1464001458120665.png&quot; alt=&quot;1464001458120665.png&quot; width=&quot;352&quot; height=&quot;346&quot; border=&quot;0&quot; vspace=&quot;0&quot; style=&quot;width: 352px; height: 346px;&quot;/&gt;&lt;/p&gt;','1464001483','1','/Uploads/image/20160528/1464410038109356.png','4','0','测试修改文章简介'), ('32','','','1464349668','0',NULL,'3',NULL,NULL), ('33','标题标题',NULL,'1464350222','0','/Uploads/image/20160527/1464350209429973.png','3',NULL,NULL), ('34','多舒服撒',NULL,'1464350521','0','/Uploads/image/20160527/1464350458941621.png','0','1',NULL), ('35','',NULL,'1464350585','0','','0','3',NULL), ('36','',NULL,'1464350627','0','','0','3',NULL), ('37','三国杀','&lt;p&gt;这里是视频内容···内容&lt;/p&gt;','1464350804','0','','0','2',NULL), ('38','订单',NULL,'1464350953','0','/Uploads/image/20160527/1464350949242225.png','2','2',NULL), ('39','sdf',NULL,'1464351920','0','/Uploads/image/20160527/1464351916280007.png','4','3',NULL), ('40','测试文章发布','&lt;p&gt;帅哥哥&lt;/p&gt;','1464354227','0','','4','0',NULL), ('41','测试文章标题','&lt;p&gt;修改测试文章内容·····&lt;/p&gt;&lt;p&gt;如同一条要让他一人一&lt;/p&gt;','1464400322','0','/Uploads/image/20160528/1464400317105785.png','1','0',NULL), ('42','发的啥风格',NULL,'1464420930','0','','3','0','双方各');
INSERT INTO `pic` VALUES (NULL,'44','图片标题','&lt;p&gt;图片图片胜多负少胜多负少&lt;/p&gt;','3','1','/Uploads/image/20160528/1464424298943256.png','1','1464424301',NULL,'图片简介简介简介');
INSERT INTO `user` VALUES ('1','admin','21232f297a57a5a743894a0e4a801fc3','1',NULL,NULL,'1',NULL), ('2','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('3','会开花的树','','0',NULL,'0000-00-00','1','2242009032@qq.com'), ('4','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('5','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('6','会开花的树','','0',NULL,'0000-00-00','1','2242009032@qq.com'), ('7','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('8','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('9','会开花的树','','1',NULL,'0000-00-00','1','2242009032@qq.com'), ('10','会开花的树','','1',NULL,'1462449960','1','2242009032@qq.com'), ('11','会开花的树','','1',NULL,'1462449972','1','2242009032@qq.com'), ('12','会开花的树','','1',NULL,'1462450175000','1','2242009032@qq.com'), ('13','会开花的树','','1',NULL,'1462450197000','1','2242009032@qq.com'), ('14','会开花的树','','1',NULL,'1462451980000','1','2242009032@qq.com'), ('15','eee的树','','1',NULL,'1462452009000','1','2242009032@qq.com');
INSERT INTO `video` VALUES ('31','','','1464004710','0',NULL,'3',NULL,NULL,NULL,NULL), ('32','vsgdgdsgfd','&lt;p&gt;sdgsggs&lt;/p&gt;&lt;p style=&quot;text-align: center;&quot;&gt;&lt;embed type=&quot;application/x-shockwave-flash&quot; class=&quot;edui-faked-video&quot; pluginspage=&quot;http://www.macromedia.com/go/getflashplayer&quot; src=&quot;http://player.youku.com/player.php/sid/XMTU4MDM0NTczMg==/v.swf&quot; width=&quot;420&quot; height=&quot;280&quot; wmode=&quot;transparent&quot; play=&quot;true&quot; loop=&quot;false&quot; menu=&quot;false&quot; allowscriptaccess=&quot;never&quot; allowfullscreen=&quot;true&quot;/&gt;&lt;/p&gt;','1464004725','0',NULL,'3',NULL,NULL,NULL,NULL), ('33','vsgdgdsgfd','&lt;p&gt;sdgsggs&lt;/p&gt;&lt;p style=&quot;text-align: center;&quot;&gt;&lt;embed type=&quot;application/x-shockwave-flash&quot; class=&quot;edui-faked-video&quot; pluginspage=&quot;http://www.macromedia.com/go/getflashplayer&quot; src=&quot;http://player.youku.com/player.php/sid/XMTU4MDM0NTczMg==/v.swf&quot; width=&quot;420&quot; height=&quot;280&quot; wmode=&quot;transparent&quot; play=&quot;true&quot; loop=&quot;false&quot; menu=&quot;false&quot; allowscriptaccess=&quot;never&quot; allowfullscreen=&quot;true&quot;/&gt;&lt;/p&gt;','1464004841','0',NULL,'3',NULL,NULL,NULL,NULL), ('34','','&lt;p&gt;sfssdfsf&lt;embed type=&quot;application/x-shockwave-flash&quot; class=&quot;edui-faked-video&quot; pluginspage=&quot;http://www.macromedia.com/go/getflashplayer&quot; src=&quot;http://player.youku.com/player.php/sid/XMTU4MDM0NTczMg==/v.swf&quot; width=&quot;420&quot; height=&quot;280&quot; wmode=&quot;transparent&quot; play=&quot;true&quot; loop=&quot;false&quot; menu=&quot;false&quot; allowscriptaccess=&quot;never&quot; allowfullscreen=&quot;true&quot;/&gt;&lt;/p&gt;','1464005026','0',NULL,'3',NULL,NULL,NULL,NULL), ('35','屌丝歌神','','1464420980','0',NULL,'3',NULL,NULL,NULL,NULL), ('36','惹他认为台湾人',NULL,'1464421774','0','','3',NULL,'热问题','2','return'), ('37','视频标题','&lt;p&gt;添加内容 &amp;nbsp;添加内容··添加美容··&lt;/p&gt;','1464421952','0','/ueditor/php/upload/image/20160513/1463104863955821.png','3',NULL,'&lt;iframe height=498 width=510 src=&quot;http://player.youku.com/embed/XMTU4Mjc0NTE2OA==&quot; frameborder=0 allowfullscreen&gt;&lt;/iframe&gt;','2','视频简介');
