<?php

namespace App\Contract;

interface DataSourceInterface
{
    /**
     * This method should read data from a datasource e.g file system or a database
     *
     * @return array
     */
    public function getData();
}
