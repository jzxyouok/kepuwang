<?php
namespace Home\Controller;

use Think\Controller;

class LoginController extends Controller
{
    public function index()
    {

        $this->display();

    }
    public function auth()
    {
        $name     = I("post.username");
        $password = I("post.password");

        $db    = M("admin");
        $admin = $db->where("username='" . $name . "'")->find();
        if (md5($password) == $admin["password"]) {

            session('user', $name);
            $this->success('登陆成功', '/admin.php');
        } else {
            $this->error('用户名或密码错误！');
        }
    }
    public function changePd()
    {
        $user = session('user');
        $user = "admin2";
        if ($user == "") {
            $this->error('未登录！！', '/admin.php');
        } else {
            $password    = I("post.newPwd");
            $currentUser = M("admin")->where("username='" . $user . "'")->find();
            M("admin")->where("id=" . $currentUser["id"])->save(array(password => md5($password)));
        }

    }
    public function signout()
    {
        session('user', null);
        redirect('/admin.php?c=login', 0, '页面跳转中...');

    }
}
