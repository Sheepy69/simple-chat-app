<?php

namespace Api;

require '../Model/Db.php';

use Model\Db;

class Api
{
    public function getMessages()
    {
        return $this->getConnection()
            ->query('select * from message order by id DESC limit 40')
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function sendMessage($content, $user = '0')
    {
        $this->getConnection()
            ->query(
                sprintf("INSERT INTO message (content, user, created_at) VALUES ('%s', '%s', '%s')",
                    $content,
                    $user,
                    (new \DateTime())->format('Y-m-d H:i:s')
                )
            );
    }

    public function getUsers()
    {
        return $this->getConnection()
            ->query('select * from user')
            ->fetch_all(MYSQLI_ASSOC);
    }


    protected function getConnection()
    {
        $db = new Db();
        return $db->getConnection();
    }
}