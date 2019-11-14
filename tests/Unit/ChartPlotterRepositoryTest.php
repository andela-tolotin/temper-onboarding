<?php

namespace Tests\Unit;

use Mockery;
use Tests\TestCase;
use Tests\Stubs\DataTrait;
use Illuminate\Http\UploadedFile;
use App\Repositories\FileReaderRepository;
use App\Repositories\ChartPlotterRepository;

class ChartPlotterRepositoryTest extends TestCase
{
    use DataTrait;

    public function setUp()
    {
        parent::setup();

        $this->mockedDataReader = Mockery::mock(FileReaderRepository::class);
        $this->mockedChartPlotterRepository = new ChartPlotterRepository($this->mockedDataReader);

        app()->instance(
            FileReaderRepository::class,
            $this->mockedDataReader
        );
    }

    public function testThatTheChartSeriesDataMatches()
    {
        $this->getOnBoardingRecords();

        $this->assertEquals(json_decode($this->getWeeklyOnBoardingPercentages(), true), $this->mockedChartPlotterRepository->getChartSeries());
    }


    public function testThatMappingDataHeaderToColumnMatches()
    {
        $this->getOnBoardingRecords();

        $this->assertEquals(json_decode($this->mapHeadersToColumns(), true), $this->mockedChartPlotterRepository->mapHeadersToColumns());
    }


    public function testThatGroupOnBoardRecordsByWeekMatches()
    {
        $this->getOnBoardingRecords();

        $this->assertEquals(json_decode($this->groupOnBoardRecordsByWeek(), true), $this->mockedChartPlotterRepository->groupOnBoardRecordsByWeek());
    }


    public function testThatGroupOnboardingAccountByCreationAtDateMatches()
    {
        $this->getOnBoardingRecords();

        $this->assertEquals(json_decode($this->groupOnboardingAccountByCreationAtDate(), true), $this->mockedChartPlotterRepository->groupOnboardingAccountByCreationAtDate());
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
