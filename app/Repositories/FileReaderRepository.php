<?php

namespace App\Repositories;

use App\Contract\DataSourceInterface;
use Symfony\Component\HttpFoundation\File\File;

class FileReaderRepository implements DataSourceInterface
{
    /**
     * @var array $csvConfig
     */
    protected $csvConfig = array(
        'lineSeparator' => '\n',
        'delimiter' => ';',
        'enclosure' => '"',
        'ignoreLines' => 0,
    );

    /**
     * @var array $onboardingrecords
     */
    protected $onboardingrecords = [];

    /**
     * This method reads data from the file
     *
     * @param string $filePath
     * @return array
     */
    public function getData(): array
    {
        return $this->onboardingrecords;
    }

    /**
     * This method reads all the rows of the CSV file
     *
     * @param string $filePath
     * @return void
     */
    public function readFile(string $file): array
    {
        $file = new File($file);

        if ('text/plain' !== $file->getMimeType()) {
            return false;
        }

        $ignore = $this->csvConfig['ignoreLines'];

        if (false !== ($handle = fopen($file, 'r'))) {
            $filesize = filesize($file);
            $i = 0;
            while (false !== ($row = fgetcsv($handle, $filesize, $this->csvConfig['delimiter'], $this->csvConfig['enclosure']))) {
                ++$i;
                if ($ignore && $i <= $ignore) {
                    continue;
                }
                $this->onboardingrecords[] = $row;
            }
            fclose($handle);
        }
        return $this->onboardingrecords;
    }
}
