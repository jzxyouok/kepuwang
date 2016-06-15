<?php
namespace Home\Controller;

use Think\Controller;

class VideoController extends Controller
{
    public function newVideo()
    {
        $newVideo = array(
            title      => I("post.title"),
            thumbnail  => I("post.thumbnail_url"),
            type       => I("post.type"),
            "abstract" => I("post.abstract"),
            videoCode  => I("post.videoCode"),
            mainType   => I("post.mainType"),
            // publishTime => time(),
        );

        $db = M("video");
        $id = I("post.id");
        if ($id != "") {
            $db->where("id=" . $id)->save($newVideo);
        } else {
            $id = $db->add($newVideo);
        }
        // 处理附件
        $attachment = I("post.attachment");
        if ($attachment != "") {
            $attachDB   = M("attachment");
            $attachment = htmlspecialchars_decode(html_entity_decode($attachment));

            $attachment = json_decode($attachment, true);
            $attachDB->where("articleType=4 and  articleId=" . $id)->delete();

            foreach ($attachment as $attach) {

                $item = array(
                    articleId   => $id,
                    articleType => 4,
                    name        => $attach["name"],
                    url         => $attach["url"],
                );
                if ($item["name"] != "" && $item["url"] != "") {
                    $attachDB->add($item);
                }

            }

        }
        echo $id;

    }

    public function allVideo()
    {
        $page = I("get.page") || 1;

        $condition = array();
        if (I("get.type") != "") {
            $condition["type"] = I("get.type");
        }
        if (I("get.status") != "") {
            $condition["status"] = I("get.status");
        }
        $result["pageNum"]    = M("video")->where($condition)->count();
        $result["allArticle"] = M("video")->where($condition)->order("publishTime DESC")->limit(($page - 1) * 19, $page * 19)->select();
        // echo (M("article")->getLastSql());
        echo json_encode($result);
    }
    public function videoDetail()
    {

        $id = I("get.id");

        $db                     = M("video");
        $picDetail              = $db->where("id = " . $id)->getField("id,mainType,thumbnail,title,abstract,type,videoCode", true);
        $picDetail["videoCode"] = htmlspecialchars_decode(html_entity_decode($picDetail["videoCode"]));
        $result                 = $picDetail[$id];
        $result["attachment"]   = M("attachment")->where("articleType=4 and articleId=" . $id)->select();
        echo json_encode($result);

    }

}
