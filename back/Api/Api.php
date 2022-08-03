<?php

namespace Api;

require '../Model/Db.php';

use Model\Db;

class Api
{
    public function getMeetMessages($searchString, $page){
        return $this->getConnection()
            ->query(sprintf("select * from message where content like '%s' order by id DESC limit 10", $searchString))
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function authMeet($meetToAuth, $passwd)
    {
        $meets = $this->getMeets();

        if (!count($meets)) {
            return false;
        }

        $meets = array_filter($meets, function ($meet) use ($meetToAuth, $passwd) {
            return (string)$meet['id'] === (string)$meetToAuth && password_verify($passwd, $meet['hash']);
        });

        return count($meets);
    }

    public function getMeets()
    {
        return $this->getConnection()
            ->query("select * from meet order by id DESC")
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function getMessagesFromMeet($meet)
    {
        return $this->getConnection()
            ->query(sprintf("select * from message where meet = '%s' order by id DESC limit 10", $meet))
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function sendMessage($content, $meet, $user = '0')
    {
        $this->getConnection()
            ->query(
                sprintf("INSERT INTO message (content, user, created_at, meet) VALUES ('%s', '%s', '%s', '%s')",
                    $content,
                    $user,
                    (new \DateTime())->format('Y-m-d H:i:s'),
                    $meet
                )
            );
    }

    public function createMeet($title, $hash = '')
    {
        $this->getConnection()
            ->query(
                sprintf("INSERT INTO meet (title, hash) VALUES ('%s', '%s')",
                    $title,
                    $hash ? password_hash($hash, PASSWORD_DEFAULT) : ''
                )
            );
    }

    public function getUsers()
    {
        return $this->getConnection()
            ->query('select * from user')
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function createUser($nickname)
    {
        $result = $this->getConnection()
            ->query(sprintf("select * from user where nickname = '%s'", $nickname))
            ->fetch_all(MYSQLI_ASSOC);

        if ($result) {
            return;
        }

        $users = $this->getUsers();
        $colorsUsed = array_column($users, 'color');

        $color = $this->getRandomColor();
        while (in_array($color, $colorsUsed)) {
            $color = $this->getRandomColor();
        }

        $this->getConnection()
            ->query(sprintf(
                "INSERT INTO user (nickname, color) VALUES ('%s', '%s')", $nickname, $color
            ));
    }


    protected function getRandomColorPart()
    {
        return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
    }

    protected function getRandomColor()
    {
        return $this->getRandomColorPart() . $this->getRandomColorPart() . $this->getRandomColorPart();
    }


    protected function getConnection()
    {
        $db = new Db();
        return $db->getConnection();
    }
}