<?php
namespace Home\Controller;

use Think\Controller;

class ArticleController extends Controller
{
    //1天文文理2地理地质3人文生态4其他
    public function newArticle()
    {
        $newArticle = array(
            title      => I("post.title"),
            thumbnail  => I("post.thumbnail_url"),
            mainType   => I("post.mainType"),
            type       => I("post.type"),
            author     => I("post.author"),
            "abstract" => I("post.abstract"),
            // publishTime => time(),
        );

        $db = M("article");

        $id = $db->add($newArticle);
        echo $id;

    }

    public function allArticle()
    {
        $page = I("get.page");
        if ($page == "") {
            $page = 1;
        }

        if (I("get.status") != "9") {
            $condition = array(
                status => I("get.status"),
            );
        }

        if (I("get.name") != "") {
            $condition["title"] = array("like", "%" . I("get.name") . "%");
        }
        // if (I("get.type") != "0") {
        //     $condition["type"] = I("get.type");
        // }

        $result["pageNum"]    = M("article")->where($condition)->count();
        $result["allArticle"] = M("article")->where($condition)->order("position asc,publishTime desc")->limit(($page - 1) * 10, 10)->select();
        //echo M("article")->getLastSql();
        echo json_encode($result);
    }
    public function newContent()
    {
        $articleId   = I("get.id");
        $articleType = I("get.articleType");
        $condition   = array(
            id => $articleId,
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
            case '6':
                $db = M("sets");

                break;

            default:
                $db = M("article");
                break;
        }

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
            case '5':
                $db = M("documentary");
                break;
            case '6':
                $db = M("sets");
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
        $articleDetail = $db->where("id = " . $id)->getField("id,mainType,thumbnail,title,abstract,type,author", true);
        echo json_encode($articleDetail);
    }
    public function relativeArticle()
    {
        $id       = I("get.id");
        $articles = M("relation")->where("articleType=1 and aid=" . $id)->select();
        $result   = array();
        foreach ($articles as $article) {

            $articleDetail = M("article")->where("id=" . $article["aid"])->find();
            $result[]      = array(
                id    => $articleDetail["id"],
                title => $articleDetail["title"]);
        }
        echo $result;
    }
    public function changeStatus()
    {
        $id          = I("get.id");
        $articleType = I("get.articleType");
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
            case '5':
                $db = M("documentary");
                break;
            default:
                # code...
                break;
        }
        $db->where("id=" . $id)->save($update);
        echo "1";
        // echo M("article")->getLastSql();
    }
    public function changeArticleMainType()
    {
        $id          = I("get.id");
        $articleType = I("get.articleType");
        $update      = array(
            mainType => I("get.mainType"),
            id       => $id,
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
        $db->save($update);
        echo $db->getLastSql();
        echo "1";
    }
    public function publish()
    {
        $id      = I("get.id");
        $article = I("get.articleType");
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
            case '5':
                $db = M("documentary");
                break;
            default:
                $db = M("article");
                # code...
                break;
        }
        $update = array(
            status => "1",
        );
        $db->where("id=" . $id)->save($update);
        echo "1";

    }
    public function sortByMainType()
    {
        $mainType = I("get.mainType");
        $article  = I("get.articleType");
        $page     = I("get.page");
        if ($page == "") {
            $page = 1;
        }

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
                $db = M("article");
                # code...
                break;
        }
        $condition = array(
            status   => "1",
            mainType => $mainType,
        );
        $result = $db->where($condition)->order("position asc,publishTime desc")->limit(($page - 1) * 10, 10)->select();

        echo json_encode($result);

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
            "author"   => I("post.author"),

            // publishTime => time(),
        );
        $db = M("article");
        $db->where("id=" . $id)->save($Article);
        echo $id;
    }

    // public function articleList()
    // {
    //     $result = array(
    //         allArticle => array(),
    //         relative   => array(),
    //     );
    //     //所有文章
    //     $result["allArticle"] = M("article")->where("status=1")->select();
    //     // 相关文章
    //     $id       = I("get.id");
    //     $articles = M("relation")->where("articleType=1 and aid=" . $id)->select();

    //     foreach ($articles as $article) {

    //         $articleDetail        = M("article")->where("id=" . $article["aid"])->find();
    //         $result["relative"][] = array(
    //             id    => $articleDetail["id"],
    //             title => $articleDetail["title"]);
    //     }
    //     echo json_encode($result);

    // }
    public function changePosition()
    {
        $position = I("get.position");
        $article  = I("get.articleType");
        $id       = I("get.id");

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
            case '5':
                $db = M("documentary");
                break;
            default:
                $db = M("article");
                # code...
                break;
        }
        $update = array(
            position => "1",
        );
        // 将已有位置重置为99
        $old = $db->where("position=" . $position)->select();
        echo $db->getLastSql();
        echo "old:" . json_encode($old);
        foreach ($old as $o) {
            $db->where("id=" . $o["id"])->save(array(position => 99));
            echo $db->getLastSql();
            # code...
        }

        $db->where("id=" . $id)->save(array(position => $position));

        // 此ID修改

    }

}
