<?php
namespace Home\Controller;

use Think\Controller;

class DocumentaryController extends Controller
{
    public function newdocumentary()
    {
        $id     = I("post.id");
        $sets   = I("post.sets");
        $newDoc = array(
            title       => I("post.title"),
            maincontent => I("post.mainContent"),
            thumbnail   => I("post.thumbnail_url"),
            "abstract"  => I("post.abstract"),

        );

        // documentary表中添加纪录片基本信息
        if (I("post.id") != "") {
            M("documentary")->where("id=" . $id)->save($newDoc);
        } else {
            $id = M("documentary")->add($newDoc);
        }
// sets表中添加纪录片每集信息

        $sets = htmlspecialchars_decode(html_entity_decode($sets));

        $sets = json_decode($sets, true);

        $db = M("sets");
        // 插入每集信息时  先删除
        $db->where("articleType=4 and documentaryId=" . $id)->delete();

        foreach ($sets as $set) {
            $item = array(
                documentaryId => $id,
                titile        => $set["title"],
                code          => $set["code"],
            );
            $db->add($item);

        }

        echo $id;
    }
    public function documentaryDetail()
    {
        $id                    = I("get.id");
        $result                = M("documentary")->where("id=" . $id)->find();
        $result['sets']        = htmlspecialchars_decode(html_entity_decode($result['sets']));
        $result['maincontent'] = htmlspecialchars_decode(html_entity_decode($result['maincontent']));
        $result['content']     = htmlspecialchars_decode(html_entity_decode($result['content']));

        echo json_encode($result);

    }
    public function setDetail()
    {
        $id     = I("get.id");
        $db     = M("sets");
        $result = $db->where("documentaryId=" . $id)->select();
        for ($i = 0; $i < count($result); $i++) {
            $result[$i]["content"] = htmlspecialchars_decode(html_entity_decode($result[$i]["content"]));
        }
        echo json_encode($result);
    }

}
