<?php

namespace Model;

use mysqli;

class Db
{

    /**
     * @var mysqli
     */
    protected $conn;

    public function install()
    {
        $this->conn = new mysqli('localhost', 'root', '');
        $this->conn->query('CREATE DATABASE IF NOT EXISTS chat');

        $this->conn = new mysqli('localhost', 'root', '', 'chat');
        $this->conn->query('CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT, nickname VARCHAR(255), color VARCHAR(255), PRIMARY KEY (id))');

        $haveUser = count($this->conn->query(   'select * from user')->fetch_all(MYSQLI_ASSOC)) > 0;

        if (!$haveUser) {
            $this->conn->query("INSERT INTO user (nickname, color) VALUES ('anonymous', 'black')");
        }

        $this->conn->query('CREATE TABLE IF NOT EXISTS message (id int NOT NULL AUTO_INCREMENT, content VARCHAR(255), created_at VARCHAR(255), user VARCHAR(255), PRIMARY KEY (id))');
    }

    public function getConnection()
    {
        if (!$this->conn) {
            $this->install();
        }

        return $this->conn;
    }
}