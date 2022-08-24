<?php

namespace Api;

require '../Model/Db.php';

use Model\Db;

class Api
{
    public function getMeetFiles($meet)
    {
        return $this->getConnection()
            ->query(
                sprintf(
                    "select * from message where meet = '%s' and (content like '%s.png' or content like '%s.jpeg' or content like '%s.PNG' or content like '%s.JPEG' or content like '%s.webp') order by id DESC",
                    $meet, '%', '%', '%', '%', '%s'
                )
            )
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function getMeetMessages($searchString, $page)
    {
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

    public function createUser($nickname, $color= '', $email = '')
    {
        $this->getConnection()
            ->query(sprintf(
                "INSERT INTO user (nickname, color, email) VALUES ('%s', '%s', '%s')",
                $nickname,
                $color ?: $this->getRandomColor(),
                $email
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