<?php

namespace Tests\Unit;

use Mockery;
use Tests\TestCase;
use Tests\Stubs\DataTrait;
use Illuminate\Http\UploadedFile;
use App\Repositories\FileReaderRepository;

class FileReaderRepositoryTest extends TestCase
{
    use DataTrait;

    public function setUp()
    {
        parent::setup();

        $this->mockedDataReader = Mockery::mock(FileReaderRepository::class);

        app()->instance(
            FileReaderRepository::class,
            $this->mockedDataReader
        );
    }

    public function testThatGetDataMatchesFileContent()
    {
        $this->getOnBoardingRecords();

        $this->assertEquals(json_decode($this->getFileData(), true), $this->mockedDataReader->getData());
    }

    public function getOnBoardingRecords()
    {
        $file = resource_path() . '/assets/documents/temper.csv';

        $sizeInKilobytes = 1024;
        $uploadedFile = UploadedFile::fake()->create($file, $sizeInKilobytes);

        $results = json_decode($this->getFileData(), true);

        $this->mockedDataReader
            ->shouldReceive('readFile')
            ->with($uploadedFile)
            ->andReturn($results);

        $this->mockedDataReader
            ->shouldReceive('getData')
            ->andReturn($results);
    }


    public function tearDown()
    {
        Mockery::close();
    }
}
