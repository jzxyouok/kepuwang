<?php
namespace Main\Controller;

use Think\Controller;

class SearchController extends Controller
{
    public function search()
    {
        $key       = I("get.search");
        $condition = array(
            title  => array("like", "%" . $key . "%"),
            status => 1,
        );

        $db1 = M("article");
        $db2 = M("pic");
        $db3 = M("video");
        $db4 = M("documentary");
        // 1 查找标题  图片文章视频  时间排序
        $result  = array();
        $result1 = $db1->where($condition)->select();
        $result2 = $db2->where($condition)->select();

        $result3 = $db3->where($condition)->select();
        $result4 = $db4->where($condition)->select();

        foreach ($result1 as $re) {
            $result[] = array(
                publishTime => $re["publishtime"],
                title       => $re["title"],
                url         => "#/articleDetail/" . $re["id"],
                thumbnail   => $re["thumbnail"],
                "abstract"  => $re["abstract"],
                type        => "文章",

            );
        }
        foreach ($result2 as $re) {
            $result[] = array(
                publishTime => $re["publishtime"],
                title       => $re["title"],
                url         => "#/imageDetail/" . $re["id"],
                thumbnail   => $re["thumbnail"],
                "abstract"  => $re["abstract"],
                type        => "图片",

            );
        }
        foreach ($result3 as $re) {
            $result[] = array(
                publishTime => $re["publishtime"],
                title       => $re["title"],
                url         => "#videoDetail/" . $re["id"],
                thumbnail   => $re["thumbnail"],
                "abstract"  => $re["abstract"],
                type        => "视频",

            );
        }
        // foreach ($result4 as $re) {
        //     $result[] = array(
        //         title      => $re["title"],
        //         url         => "".$re["id"],
        //         thumbnail  => $re["thumbnail"],
        //         "abstract" => $re["abstract"],
        //         type       => "纪录片",
        //     );
        // }
        array_multisort($result, SORT_DESC);
        echo json_encode($result);
    }
}
