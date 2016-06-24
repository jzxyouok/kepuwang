<?php
namespace Home\Controller;

use Think\Controller;

class IndexController extends Controller
{
    public function index()
    {
        $user = session("user");

        if ($user == "") {
            redirect('/admin.php?c=login', 0, '页面跳转中...');

        } else {
            $this->display();
        }

    }

}
