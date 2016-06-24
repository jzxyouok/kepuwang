<?php
/**
 * [getPic description]
 * 获取文本中首张图片地址
 * @param  [type] $content [description]
 * @return [type]          [description]
 */
function getPic($content)
{
    if (preg_match_all("/(src)=([\"|']?)([^ \"'>]+\.(gif|jpg|jpeg|bmp|png))\\2/i", $content, $matches)) {
        $str = $matches[3][0];
        if (preg_match('/\/Uploads\/image/', $str)) {
            return $str1 = substr($str, 7);
        }
    }
}
function getVideo($content)
{
    if (preg_match_all("/(src)=([\"|']?)([^ \"'>]+\.(swf|flv|mp4|rmvb|avi|mpeg|ra|ram|mov|wmv)((\?[^ \"'>]+)?))\\2/i", $content, $matches)) {
        $str = $matches[3][0];
        if (preg_match('/\/Uploads\/image/', $str)) {
            return $str1 = substr($str, 7);
        }
    }
}
function getDb($type)
{
    switch ($type) {
        case '1':
            $db = M("article");
            break;
        case '2':
            $db = M("pic");
            break;
        case '4':
            $db = M("video");
            break;case '5':
            $db = M("documentary");
            break;
        case '6':
            $db = M("sets");

            break;

        default:
            $db = M("article");
            break;

    }
    return $db;
}
