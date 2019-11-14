<?php

namespace App\Repositories;

use Carbon\Carbon;
use RecursiveArrayIterator;
use RecursiveIteratorIterator;
use App\Repositories\FileReaderRepository;


class ChartPlotterRepository
{
    /**
     * @var $fileReaderRepository
     */
    protected $fileReaderRepository;

    /**
     * @var $onboardingrecords
     */
    protected $onboardingrecords;

    public function __construct(FileReaderRepository $fileReaderRepository)
    {
        $this->fileReaderRepository = $fileReaderRepository;
    }

    /**
     * This method returns file data
     *
     * @return array
     */
    public function getOnBoardingRecords()
    {
        return $this->fileReaderRepository->getData();
    }

    /**
     * This method creates a 2D array of key, value pairs using the header to map the column of the file
     *
     * @return array $onboardingRecords
     */
    public function mapHeadersToColumns(): array
    {
        $fileheaders = [];
        $associativeOnboardingData = [];
        $onboardingRecords = $this->getOnBoardingRecords();

        foreach ($onboardingRecords  as $key => $onboardingRecord) {
            if (0 === $key) {
                $fileheaders = array_values($onboardingRecord);
                if (array_sum($onboardingRecord) > 0) {
                    return $onboardingRecords;
                }
            } else {
                $eachRow = array_values($onboardingRecord);
                array_push($associativeOnboardingData, array_combine($fileheaders, $eachRow));
            }
        }
        return $associativeOnboardingData;
    }

    /**
     * This method groups the mapped onboardingrecords by the number of users in that
     * percentage
     *
     * @return array $groupedOnboardingRecords
     */
    public function groupOnboardingAccountByCreationAtDate(): array
    {
        $groupedOnboardingRecords = [];

        $onBoardingPercentages = ['0', '20', '40', '50', '70', '90', '99', '100'];

        foreach ($this->mapHeadersToColumns() as $mappedOnboardingRecord) {
            $onboardingCreatedDate = empty($mappedOnboardingRecord['created_at']) ? 0 : $mappedOnboardingRecord['created_at'];

            $onBoardingPercentage = $mappedOnboardingRecord['onboarding_perentage'];

            if (in_array($onBoardingPercentage, $onBoardingPercentages)) {
                if (!array_key_exists($onboardingCreatedDate, $groupedOnboardingRecords)) {
                    $groupedOnboardingRecords[$onboardingCreatedDate][] = $onBoardingPercentage;
                } else {
                    $groupedOnboardingRecords[$onboardingCreatedDate][] = $onBoardingPercentage;
                }
            }
        }
        return $groupedOnboardingRecords;
    }

    /**
     * This method group onboarding records by Weeks
     *
     * @return array $recordsByWeek
     */
    public function groupOnBoardRecordsByWeek()
    {
        $firstDayOfTheWeek = array_keys($this->groupOnboardingAccountByCreationAtDate())[0];

        $recordsByWeek[$firstDayOfTheWeek] = [];

        foreach ($this->groupOnboardingAccountByCreationAtDate() as $createdAt => $onboardingRecord) {
            $beginningofTheWeek = new Carbon($firstDayOfTheWeek);
            $endOfTheWeek = Carbon::parse($createdAt);
            $diff = $endOfTheWeek->diffInDays($beginningofTheWeek);

            if ($diff === 7) {
                $firstDayOfTheWeek = $createdAt;
                $recordsByWeek[$firstDayOfTheWeek][] = $onboardingRecord;
            }

            if ($diff < 7) {
                $recordsByWeek[$firstDayOfTheWeek][] = $onboardingRecord;
            }
        }

        return $recordsByWeek;
    }

    /**
     * This method gets the weekly completed steps percentage
     *
     * @return array
     */
    public function getWeeklyOnBoardingPercentages()
    {
        $weeklyOnBoardingPercentages = [];
        $percentages = ['0' => 0, '20' => 0, '40' => 0, '50' => 0, '70' => 0, '90' => 0, '99' => 0, '100' => 0];

        foreach ($this->groupOnBoardRecordsByWeek() as $startDateofTheWeek => $onBoardingPercentages) {
            $flattenedWeeklyPercentage = $this->mergeWeeklyPercentages($onBoardingPercentages);
            $onBoardingPercentagesCounter = \array_count_values($flattenedWeeklyPercentage);
            $percentage = 0.0;
            $copyOfPercentages = $percentages;

            $totalSumOfOnBoardingStages = (int) array_sum(array_values($onBoardingPercentagesCounter));

            foreach ($onBoardingPercentagesCounter as $weeklyPercentage => $numOfOccurence) {
                $percentage = round(((int) $numOfOccurence / (int) $totalSumOfOnBoardingStages) * 100, 2);
                $copyOfPercentages[$weeklyPercentage] = $percentage;
            }

            $weeklyOnBoardingPercentages[$startDateofTheWeek] = $copyOfPercentages;
        }

        return $weeklyOnBoardingPercentages;
    }

    /**
     * This method flattens the weekly percentages
     *
     * @param array $onBoardingPercentages
     * @return array
     */
    public function mergeWeeklyPercentages($onBoardingPercentages)
    {
        $mergedOnBoardingPercentages = new RecursiveIteratorIterator(new RecursiveArrayIterator($onBoardingPercentages));

        return iterator_to_array($mergedOnBoardingPercentages, false);
    }

    /**
     * This method get the chart series
     *
     * @return array chartSeries
     */
    public function getChartSeries()
    {
        $chartSeries = [];

        foreach ($this->getWeeklyOnBoardingPercentages() as $week => $perscentages) {
            $chartSeries[] =  [
                'name' => $week,
                'data' => array_values($perscentages),
            ];
        }

        return $chartSeries;
    }
}
