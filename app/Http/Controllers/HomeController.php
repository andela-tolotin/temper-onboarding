<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Contract\DataSourceInterface;
use App\Repositories\ChartPlotterRepository;

class HomeController extends Controller
{
    /**
     * @var $dataReader
     */
    private $dataReader;

    /**
     * @var $file
     */
    private $file;

    public function __construct(DataSourceInterface $dataReader)
    {
        $this->dataReader = $dataReader;
    }

    public function index()
    {
        return view("home");
    }

    /**
     * This method gets the chart series data
     *
     * @return response
     */
    public function fetchChartData()
    {
        $file = resource_path() . '/assets/documents/temper.csv';
        $this->dataReader->readFile($file);
        $this->chartPlotterRepository = new ChartPlotterRepository($this->dataReader);

        return response()->json($this->getChartSeries());
    }

    /**
     * This method get the chart series
     *
     * @return array chartSeries
     */
    protected function getChartSeries()
    {
        $chartSeries = [];

        foreach ($this->chartPlotterRepository->getWeeklyOnBoardingPercentages() as $week => $perscentages) {
            $chartSeries[] =  [
                'name' => $week,
                'data' => array_values($perscentages),
            ];
        }

        return $chartSeries;
    }
}
