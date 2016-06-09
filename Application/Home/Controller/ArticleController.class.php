<?php
namespace Home\Controller;

use Think\Controller;

class ArticleController extends Controller
{
    //1天文文理2地理地质3人文生态4其他
    public function newArticle()
    {
        $newArticle = array(
            title       => I("post.title"),
            thumbnail   => I("post.thumbnail_url"),
            mainType    => I("post.mainType"),
            type        => I("post.type"),
            "abstract"  => I("post.abstract"),
            publishTime => time(),
        );
        // $info = getPic($newArticle["content"]); //使用函数 返回匹配地址 如果不为空则声称缩略图
        // $info = $newArticle["thumbnail"];
        // echo $info . "INFO";
        // if (!$info == null) {
        //     echo "ssssss";
        //     $thumb = $info . 'thumb.png';
        //     $image = new \Think\Image(); //实例化图像处理，缩略图功能
        //     $image->open($info); // 生成一个居中裁剪为240*160的缩略图
        //     $unlink                  = $image->thumb(240, 160, \Think\Image::IMAGE_THUMB_CENTER)->save($thumb);
        //     $newArticle["thumbnail"] = $thumb;
        // } else {
        //     $thumb = '';
        // }

        $db = M("article");

        $id = $db->add($newArticle);
        echo $id;

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
        $page = I("get.page") || 1;

        $condition = array(
            // type   => I("get.type"),
            status => I("get.status"),
        );
        if (I("get.type") != "0") {
            $condition["type"] = I("get.type");
        }
        $result["pageNum"]    = M("article")->where($condition)->count();
        $result["allArticle"] = M("article")->where($condition)->order("publishTime desc")->limit(($page - 1) * 10, $page * 10)->select();

        echo json_encode($result);
    }
    public function newContent()
    {
        $articleId   = I("get.id");
        $articletype = I("get.articletype");
        switch ($articletype) {
            case '1':
                $db = M("article");
                break;
            case '2':
                $db = M("pic");
                break;
            case '4':
                $db = M("video");
                break;

            default:
                # code...
                break;
        }

        $condition = array(
            id => $articleId,
        );
        $title             = $db->where($condition)->getField("id,title,content");
        $result            = $title[$articleId];
        $result['content'] = htmlspecialchars_decode(html_entity_decode($result['content']));
        echo json_encode($result);
        // echo $db->getLastSql();
    }
    public function saveContent()
    {
        $articleType = I("post.articleType");
        $data        = array(
            id      => I("post.id"),
            content => I("post.content"),
        );

        switch (I("post.articleType")) {
            case '1':
                $db = M("article");
                break;
            case '2':
                $db = M("pic");
                break;
            case '4':
                $db = M("video");
                break;
            default:
                $db = M("article");
                break;
        }
        $db->save($data);
    }
    public function editArticle()
    {
        $articleType = I("get.articleType");
        $id          = I("get.id");
        switch ($articleType) {
            case '1':
                $db = M("article");
                break;
            case '2':
                $db = M("pic");
                break;

            default:
                $db = M("article");
                break;
        }

        $articleDetail = $db->where("id = " . $id)->getField("id,mainType,thumbnail,title,abstract,type", true);
        echo json_encode($articleDetail);
    }
    public function changeStatus()
    {
        $id          = I("get.id");
        $articleType = I("get.articletype");
        $update      = array(
            status => I("get.status") == "0" ? "1" : "0",
        );
        switch ($articleType) {
            case '1':
                $db = M("article");
                break;
            case '2':
                $db = M("pic");
                break;
            case '4':
                $db = M("video");
                break;
            default:
                # code...
                break;
        }
        $db->where("id=" . $id)->save($update);
        echo "1";
        // echo M("article")->getLastSql();
    }
    public function publish()
    {
        $id      = I("get.id");
        $article = I("get.articletype");
        switch ($article) {
            case '1':
                $db = M("article");
                break;
            case '2':
                $db = M("pic");
                break;
            case '4':
                $db = M("video");
                break;

            default:
                # code...
                break;
        }
        $update = array(
            status => "1",
        );
        $db->where("id=" . $id)->save($update);
        echo "1";

    }
    public function update()
    {
        $id = I("post.id");

        $Article = array(
            title      => I("post.title"),
            thumbnail  => I("post.thumbnail"),
            mainType   => I("post.mainType"),
            type       => I("post.type"),
            "abstract" => I("post.abstract"),
            // publishTime => time(),
        );
        $db = M("article");
        $db->where("id=" . $id)->save($Article);
        echo $id;
    }

}
