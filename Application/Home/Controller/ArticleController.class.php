<?php
namespace Home\Controller;

use Think\Controller;

class ArticleController extends Controller
{
    public function newArticle()
    {
        $newArticle = array(
            title       => I("post.title"),
            content     => I("post.content"),
            mainType    => I("post.mainType"),
            publishTime => time(),
        );
        $info = getPic($newArticle["content"]); //使用函数 返回匹配地址 如果不为空则声称缩略图
        echo $info . "INFO";
        if (!$info == null) {
            echo "ssssss";
            $thumb = $info . 'thumb.png';
            $image = new \Think\Image(); //实例化图像处理，缩略图功能
            $image->open($info); // 生成一个居中裁剪为240*160的缩略图
            $unlink                  = $image->thumb(240, 160, \Think\Image::IMAGE_THUMB_CENTER)->save($thumb);
            $newArticle["thumbnail"] = $thumb;
        } else {
            $thumb = '';
        }

        switch (I("post.mainType")) {
            case '1':
                $db = M("article");

                break;
            case '2':
                $db                    = M("pic");
                $newArticle["img_src"] = $info;
                break;
            case '3':
                $db                    = M("video");
                $newArticle["img_src"] = $info;
                break;

            default:
                $db = M("article");
                break;
        }
        $newArticle["publishTime"] = time();

        $db->add($newArticle);
        echo json_encode($newArticle);

    }

    // public function indexArticle()
    // {
    //     $indexArticleCondition = array(
    //         type     => 1,
    //         status   => 1,
    //         mainType => 1,
    //     );
    //     $indexArticle = M("article")->where($indexArticleCondition)->order("publishTime DESC")->limit(0, 6);
    //     echo json_encode($indexArticle);
    // }
    public function allArticle()
    {
        $page      = I("get.page") || 1;
        $condition = array(
            type   => I("get.type"),
            status => I("get.status"),
        );

        $result["pageNum"]    = M("article")->where($condition)->count();
        $result["allArticle"] = M("article")->where($condition)->order("publishTime DESC")->limit(($page - 1) * 10, $page * 10)->select();
        // echo (M("article")->getLastSql());
        echo json_encode($result);
    }

}
